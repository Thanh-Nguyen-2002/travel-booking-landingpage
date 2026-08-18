import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse, PageResponse } from '../../../types/common';
import type { DestinationResponse } from '../../../types/destination';

export const useDestinations = (page = 0, size = 6, search?: string) => {
    return useQuery({
        queryKey: ['destinations', page, size, search],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: (page + 1).toString(),
                size: size.toString()
            });
            if (search) {
                params.append('keyword', search);
            }
            const response = await apiClient.get<any, ApiResponse<PageResponse<DestinationResponse>>>('/destinations', { params });
            return response.data; // PageResponse
        },
    });
};
