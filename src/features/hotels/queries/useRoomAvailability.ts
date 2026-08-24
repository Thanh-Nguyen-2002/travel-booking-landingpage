import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse } from '../../../types/common';

export interface RoomAvailabilityResponse {
    id: string;
    roomId: string;
    targetDate: string;
    totalQuantity: number;
    bookedQuantity: number;
    priceOverride: number | null;
}

export const useRoomAvailability = (roomId: string, startDate: string, endDate: string) => {
    return useQuery({
        queryKey: ['roomAvailability', roomId, startDate, endDate],
        queryFn: async () => {
            if (!roomId || !startDate || !endDate) return [];
            const response = await apiClient.get<any, ApiResponse<RoomAvailabilityResponse[]>>(
                `/rooms/${roomId}/availability`,
                { params: { startDate, endDate } }
            );
            return response.data || [];
        },
        enabled: !!roomId && !!startDate && !!endDate,
    });
};
