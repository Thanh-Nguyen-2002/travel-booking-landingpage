import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse, PageResponse } from '../../../types/common';
import type { DestinationResponse } from '../../../types/destination';

export const useDestinations = (page = 0, size = 6, search?: string) => {
    return useQuery({
        queryKey: ['destinations', page, size, search],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: page.toString(),
                size: size.toString(),
                status: 'ACTIVE' // Only fetch active destinations for public landing page
            });
            if (search) {
                params.append('search', search);
            }
            const response = await apiClient.get<any, ApiResponse<PageResponse<DestinationResponse>>>('/destinations', { params });
            return response.data; // Because interceptor returns response.data, response is ApiResponse, so response.data is PageResponse
        },
    });
};
