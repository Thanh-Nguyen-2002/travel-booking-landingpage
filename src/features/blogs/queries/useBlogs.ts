import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse, PageResponse } from '../../../types/common';
import type { BlogResponse } from '../../../types/blog';

export const useBlogs = (page = 0, size = 3, search?: string) => {
    return useQuery({
        queryKey: ['blogs', page, size, search],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: page.toString(),
                size: size.toString(),
                status: 'PUBLISHED' // Only fetch published blogs for landing page
            });
            if (search) {
                params.append('search', search);
            }
            const response = await apiClient.get<any, ApiResponse<PageResponse<BlogResponse>>>('/blogs', { params });
            return response.data;
        },
    });
};
