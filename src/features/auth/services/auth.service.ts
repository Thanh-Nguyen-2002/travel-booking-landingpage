import apiClient from '../../../services/api-client';
import type { ApiResponse } from '../../../types/common';
import type { LoginResponse, RegisterRequest } from '../../../types/auth';

export const authService = {
    login: async (credentials: { username: string; password: string }) => {
        const response = await apiClient.post<any, ApiResponse<LoginResponse>>('/auth/login', credentials);
        return response.data;
    },
    register: async (data: RegisterRequest) => {
        const response = await apiClient.post<any, ApiResponse<any>>('/auth/register', data);
        return response.data;
    }
};
