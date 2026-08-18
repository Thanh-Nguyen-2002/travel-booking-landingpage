import { apiClient } from '../../../services/api-client';
import type { ApiResponse } from '../../../types/common';

export interface ReviewCreationRequest {
    hotelId: string;
    roomId?: string;
    rating: number;
    comment?: string;
    images?: string;
}

export const reviewService = {
    createReview: async (request: ReviewCreationRequest) => {
        const response = await apiClient.post<any, ApiResponse<any>>('/reviews', request);
        return response.data;
    }
};
