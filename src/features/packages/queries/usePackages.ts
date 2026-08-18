import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse, PageResponse } from '../../../types/common';
import type { PackageResponse } from '../../../types/package';

export const usePackages = (page = 0, size = 12, search?: string) => {
    return useQuery({
        queryKey: ['packages', page, size, search],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: (page + 1).toString(),
                size: size.toString(),
                status: 'ACTIVE'
            });
            if (search) {
                params.append('keyword', search);
            }
            const response = await apiClient.get<any, ApiResponse<PageResponse<PackageResponse>>>('/packages', { params });
            return response.data;
        },
    });
};
