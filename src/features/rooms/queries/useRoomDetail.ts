import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse } from '../../../types/common';
import type { RoomResponse } from '../../../types/room';

export const useRoomDetail = (roomId: string | undefined) => {
    return useQuery({
        queryKey: ['room', roomId],
        queryFn: async () => {
            if (!roomId) throw new Error('Room ID is required');
            const response = await apiClient.get<any, ApiResponse<RoomResponse>>(`/rooms/${roomId}`);
            return response.data;
        },
        enabled: !!roomId,
    });
};
