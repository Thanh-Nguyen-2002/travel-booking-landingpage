import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import type { ApiResponse, SettingsMap } from '../types/system';

export const useSettings = () => {
    return useQuery<SettingsMap>({
        queryKey: ['settings'],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<SettingsMap>>('/settings');
            const data = (response as unknown as ApiResponse<SettingsMap>).data;
            return data || {};
        },
        staleTime: 1000 * 60 * 60,
    });
};
