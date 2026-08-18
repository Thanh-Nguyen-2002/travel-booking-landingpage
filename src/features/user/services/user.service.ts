import { apiClient } from '../../../services/api-client';
import type { ApiResponse } from '../../../types/common';
import type { User } from '../../../types/auth';

export interface UpdateProfileRequest {
    fullName: string;
    phone?: string;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const userService = {
    updateProfile: async (request: UpdateProfileRequest) => {
        const response = await apiClient.put<any, ApiResponse<User>>('/users/me', request);
        return response.data;
    },
    
    changePassword: async (request: ChangePasswordRequest) => {
        const response = await apiClient.put<any, ApiResponse<string>>('/users/me/password', request);
        return response.data;
    }
};
