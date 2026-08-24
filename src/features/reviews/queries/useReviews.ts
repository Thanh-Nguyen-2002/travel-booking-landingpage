import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse, PageResponse } from '../../../types/common';

export interface ReviewResponse {
    id: string;
    rating: number;
    comment: string;
    status: string;
    createdAt: string;
    customerName: string;
    customerAvatar: string;
}

export const useReviews = (params: { hotelId?: string; roomId?: string; page?: number; size?: number }) => {
    return useQuery({
        queryKey: ['reviews', params],
        queryFn: async () => {
            const { hotelId, roomId, page = 1, size = 10 } = params;
            let url = `/reviews?page=${page}&size=${size}`;
            if (hotelId) url += `&hotelId=${hotelId}`;
            if (roomId) url += `&roomId=${roomId}`;
            
            const response = await apiClient.get<any, ApiResponse<PageResponse<ReviewResponse>>>(url);
            return response.data;
        },
        enabled: !!params.hotelId || !!params.roomId,
    });
};
