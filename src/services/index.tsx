// src/api/axios/interceptors.ts
import { notify } from '@/components/ui/ui-react-antd/NotificationCustom'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import ROUTER from '@/routes/ROUTER'
import axios from 'axios'
import { ENV_CONFIG } from '../../utils/env'
import {
    STORAGE,
    deleteAuthToken,
    deleteLocalStorage,
    deleteSessionStorage,
    getAuthToken,
    getLocalStorage,
    getRefreshToken,
    setAuthToken,
    setRefreshToken, // Add import
} from '../../utils/storage'
import identityService from '../IdentityService'

// ============ TOKEN REFRESH MANAGEMENT ============
// Tránh multiple refresh calls đồng thời
let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
    for (const prom of failedQueue) {
        if (error) {
            prom.reject(error)
        } else if (token) {
            prom.resolve(token)
        }
    }

    failedQueue = []
}

// Kiểm tra remember me để lưu token đúng nơi.
// HQC-258: nguồn truth duy nhất là nơi token thực sự được lưu (localStorage nếu
// user tích "Ghi nhớ", sessionStorage nếu không). Đọc STORAGE.REMEMBER_HOME là
// sai vì flag đó không bao giờ được ghi → isRememberMe() luôn false → refresh
// persist sai tầng so với lựa chọn lúc login.
const isRememberMe = (): boolean => {
    return getLocalStorage<string>(STORAGE.TOKEN) !== null
}

// Lưu tokens mới sau khi refresh
const saveTokens = (accessToken: string, refreshToken?: string): void => {
    const remember = isRememberMe()
    setAuthToken(accessToken, remember)
    if (refreshToken) {
        setRefreshToken(refreshToken, remember)
    }
}

// Xóa tất cả token khi logout
const clearAllTokens = (): void => {
    deleteAuthToken()
    deleteLocalStorage(STORAGE.REFRESH_TOKEN)
    deleteSessionStorage(STORAGE.REFRESH_TOKEN)
}

// Refresh token action - gọi API refresh
export const refreshTokenAction = async (): Promise<{
    success: boolean
    accessToken?: string
}> => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
        return { success: false }
    }

    try {
        // Gọi API refresh trực tiếp để tránh interceptor loop
        const response = await identityService.refreshToken(refreshToken)

        if (!response.isError && response.object?.token) {
            saveTokens(response.object.token, response.object.refreshToken)
            return { success: true, accessToken: response.object.token }
        }
        return { success: false }
    } catch {
        return { success: false }
    }
}

// Extract error message từ response envelope (object / errorMessage / message)
const extractErrorMessage = (data: any, fallbackMessage: string): string => {
    if (!data) return fallbackMessage
    if (typeof data === 'string') return data
    const msg =
        (typeof data.object === 'string' ? data.object : null) ??
        (typeof data.Object === 'string' ? data.Object : null) ??
        data.errorMessage ??
        data.ErrorMessage ??
        data.message ??
        data.Message
    return typeof msg === 'string' && msg.trim() ? msg : fallbackMessage
}

// ============ AXIOS INTERCEPTORS ============
export const setupInterceptors = (instance: AxiosInstance) => {
    // Request Interceptor - Gắn token vào header
    instance.interceptors.request.use(
        (config) => {
            if (config.data instanceof FormData) {
                config.headers['Content-Type'] = undefined
            }
            const token = getAuthToken()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error) => Promise.reject(error)
    )

    // Response Interceptor - Xử lý response và refresh token
    instance.interceptors.response.use(
        async (response) => {
            // Blob response trả về nguyên vẹn
            if (response.config.responseType === 'blob') {
                return response
            }

            // ponytail: BE trả envelope không nhất quán casing (camelCase hoặc PascalCase tuỳ endpoint)
            const isError = response.data.isError
            const _object = response.data.object ?? response.data.Object
            const statusCode = Number(response.data.statusCode ?? response.data.StatusCode)
            const originalRequest = response.config as InternalAxiosRequestConfig & {
                _retry?: boolean
            }

            // Xử lý HTTP 403 Forbidden (business-level, trong envelope)
            if (statusCode === 403) {
                notify.error('Bạn không có quyền thực hiện thao tác này.')
                return Promise.reject({
                    errorCode: 403,
                    errorMessage: 'Forbidden',
                    config: response.config,
                })
            }

            // Xử lý HTTP 401 Unauthorized
            if (statusCode === 401 && !originalRequest._retry && !originalRequest.url?.includes('ChangePassword')) {
                // Nếu đang refresh rồi thì queue request lại
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject })
                    })
                        .then((token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`
                            return instance(originalRequest)
                        })
                        .catch((err) => Promise.reject(err))
                }

                originalRequest._retry = true
                isRefreshing = true

                try {
                    const refreshResult = await refreshTokenAction()

                    if (refreshResult.success && refreshResult.accessToken) {
                        // Refresh thành công - cập nhật token và retry tất cả queued requests
                        processQueue(null, refreshResult.accessToken)
                        originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`
                        return instance(originalRequest)
                    }

                    // Refresh thất bại
                    processQueue(new Error('Refresh token failed'), null)
                    clearAllTokens()
                    notify.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
                    window.location.href = ROUTER.HOME
                    return Promise.reject('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
                } catch (refreshError) {
                    processQueue(refreshError, null)
                    clearAllTokens()
                    window.location.href = ROUTER.HOME
                    return Promise.reject(refreshError)
                } finally {
                    isRefreshing = false
                }
            }
            // Xử lý lỗi từ API (không phải HTTP error)
            if (isError && statusCode !== 200) {
                const errorText = extractErrorMessage(response.data, 'Lỗi từ server')
                if (statusCode !== 401) {
                    notify.error(errorText)
                }
                return Promise.reject({
                    errorCode: statusCode,
                    errorMessage: errorText,
                    message: errorText,
                    config: response.config,
                })
            }

            // Bypass buttonShow: tất cả button permissions đều trả về true
            // const targetObj = response.data?.object ?? response.data?.Object
            // if (targetObj && typeof targetObj === 'object') {
            //   targetObj.buttonShow = new Proxy(targetObj.buttonShow || {}, {
            //     get: () => true,
            //   })
            // }

            return response.data
        },

        async (error) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & {
                _retry?: boolean
            }

            // Xử lý HTTP 403 Forbidden
            if (error.response?.status === 403) {
                notify.error('Bạn không có quyền thực hiện thao tác này.')
                return Promise.reject(error)
            }

            // Xử lý HTTP 401 Unauthorized
            if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('ChangePassword')) {
                // Nếu đang refresh rồi thì queue request lại
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject })
                    })
                        .then((token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`
                            return instance(originalRequest)
                        })
                        .catch((err) => Promise.reject(err))
                }

                originalRequest._retry = true
                isRefreshing = true

                try {
                    const refreshResult = await refreshTokenAction()

                    if (refreshResult.success && refreshResult.accessToken) {
                        // Refresh thành công - cập nhật token và retry tất cả queued requests
                        processQueue(null, refreshResult.accessToken)
                        originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`
                        return instance(originalRequest)
                    }

                    // Refresh thất bại
                    processQueue(new Error('Refresh token failed'), null)
                    clearAllTokens()
                    notify.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
                    window.location.href = ROUTER.HOME
                    return Promise.reject(error)
                } catch (refreshError) {
                    processQueue(refreshError, null)
                    clearAllTokens()
                    window.location.href = ROUTER.HOME
                    return Promise.reject(refreshError)
                } finally {
                    isRefreshing = false
                }
            }

            // Các lỗi HTTP khác
            const errorMessage = extractErrorMessage(
                error.response?.data,
                error.message || 'Lỗi không xác định từ server'
            )
            error.message = errorMessage
            notify.error(errorMessage)
            return Promise.reject(error)
        }
    )
}

// ============ AXIOS INSTANCE ============
const instance = axios.create({
    baseURL: ENV_CONFIG.VITE_BACKEND_BASE_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
})

setupInterceptors(instance)

export default instance
