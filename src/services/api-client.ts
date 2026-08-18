import axios, { type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'sonner';

// ============ TOKEN REFRESH MANAGEMENT ============
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const apiClient = axios.create({
    baseURL: (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8080/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response) {
            const status = error.response.status;

            if (status === 403) {
                toast.error('Bạn không có quyền thực hiện thao tác này.');
                return Promise.reject(error);
            }

            if (status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/refresh') && !originalRequest.url?.includes('/auth/login')) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then((token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return apiClient(originalRequest);
                        })
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;
                const refreshToken = localStorage.getItem('refreshToken');

                if (!refreshToken) {
                    useAuthStore.getState().logout();
                    toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                try {
                    // Dùng axios thuần để không bị loop vòng lặp interceptor
                    const refreshResponse = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, {
                        refreshToken
                    });

                    const data = refreshResponse.data?.data;
                    if (data && data.accessToken) {
                        const { accessToken, refreshToken: newRefreshToken, user } = data;

                        // Lưu Token mới vào Zustand Store
                        useAuthStore.getState().login({ accessToken, refreshToken: newRefreshToken, user });

                        // Trả token cho các Request đang đứng đợi
                        processQueue(null, accessToken);

                        // Cập nhật Token mới cho Request hiện tại và gửi đi
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return apiClient(originalRequest);
                    } else {
                        throw new Error('Dữ liệu Refresh Token không hợp lệ');
                    }
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    useAuthStore.getState().logout();
                    toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
export { apiClient };
