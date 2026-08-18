import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { Banner } from '../../../types/banner';
import type { ApiResponse } from '../../../types/system';

export const useBanners = () => {
    return useQuery<Banner[]>({
        queryKey: ['banners'],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<any[]>>('/banners');
            const data = response.data;
            if (!data || !Array.isArray(data)) {
                return [];
            }
            return data
                .filter((b: any) => b.isActive)
                .map((b: any) => ({
                    id: b.id,
                    title: b.title,
                    imageUrl: b.imageUrl,
                    linkUrl: b.targetUrl || '',
                    position: b.sortOrder || 0,
                    isActive: b.isActive,
                    description: '',
                }))
                .sort((a, b) => a.position - b.position);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};
