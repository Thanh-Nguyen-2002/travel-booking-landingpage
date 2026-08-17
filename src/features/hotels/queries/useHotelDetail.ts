import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse } from '../../../types/common';
import type { HotelResponse } from '../../../types/hotel';

export const useHotelDetail = (id: string | undefined) => {
    return useQuery({
        queryKey: ['hotel', id],
        queryFn: async () => {
            if (!id) throw new Error('ID is required');
            const response = await apiClient.get<any, ApiResponse<HotelResponse>>(`/hotels/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
};
