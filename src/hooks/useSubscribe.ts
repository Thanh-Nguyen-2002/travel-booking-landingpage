import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import type { ApiResponse } from '../types/system';

interface SubscribePayload {
    email: string;
}

export const useSubscribe = () => {
    return useMutation<ApiResponse<null>, Error, SubscribePayload>({
        mutationFn: async (payload) => {
            const response = await apiClient.post<ApiResponse<null>>('/subscribers', payload);
            return response as unknown as ApiResponse<null>;
        },
    });
};
