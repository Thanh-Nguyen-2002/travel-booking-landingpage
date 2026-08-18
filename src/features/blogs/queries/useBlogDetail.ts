import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse } from '../../../types/common';
import type { BlogResponse } from '../../../types/blog';

export const useBlogDetail = (idOrSlug?: string) => {
    return useQuery({
        queryKey: ['blog', idOrSlug],
        queryFn: async () => {
            if (!idOrSlug) return null;
            const response = await apiClient.get<any, ApiResponse<BlogResponse>>(`/blogs/${idOrSlug}`);
            return response.data;
        },
        enabled: !!idOrSlug
    });
};
