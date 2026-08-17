import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse } from '../../../types/common';
import type { RoomResponse } from '../../../types/room';

export const useRooms = (hotelId: string | undefined) => {
    return useQuery({
        queryKey: ['rooms', hotelId],
        queryFn: async () => {
            if (!hotelId) throw new Error('Hotel ID is required');
            const response = await apiClient.get<any, ApiResponse<RoomResponse[]>>('/rooms', { params: { hotelId } });
            return response.data;
        },
        enabled: !!hotelId,
    });
};
