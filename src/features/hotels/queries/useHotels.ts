/*eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse, PageResponse } from '../../../types/common';
import type { HotelResponse } from '../../../types/hotel';

export const useHotels = (page = 0, size = 6, search?: string, sortBy?: string, direction?: string) => {
    return useQuery({
        queryKey: ['hotels', page, size, search, sortBy, direction],
        queryFn: async () => {
            const response = await apiClient.get<any, ApiResponse<HotelResponse[]>>('/hotels', {
                params: { sortBy, direction }
            });
            const allHotels = response.data || [];

            // Perform client-side search if search term is provided
            let filtered = allHotels;
            if (search) {
                const query = search.toLowerCase();
                filtered = allHotels.filter(h =>
                    h.name.toLowerCase().includes(query) ||
                    (h.address && h.address.toLowerCase().includes(query))
                );
            }

            // Perform client-side pagination
            const totalElements = filtered.length;
            const totalPages = Math.ceil(totalElements / size);
            const startIndex = page * size;
            const endIndex = startIndex + size;
            const paginatedData = filtered.slice(startIndex, endIndex);

            const pageResponse: PageResponse<HotelResponse> = {
                currentPage: page,
                pageSize: size,
                totalPages: totalPages,
                totalElements: totalElements,
                data: paginatedData
            };

            return pageResponse;
        },
    });
};
