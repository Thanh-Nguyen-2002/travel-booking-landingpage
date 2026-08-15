import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { Banner } from '../../../types/banner';
import type { ApiResponse } from '../../../types/system';

export const useBanners = () => {
    return useQuery<Banner[]>({
        queryKey: ['banners'],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<Banner[]>>('/banners');
            const data = (response as unknown as ApiResponse<Banner[]>).data;
            if (!data || !Array.isArray(data)) {
                return [];
            }
            return data.filter(b => b.isActive).sort((a, b) => a.position - b.position);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};
