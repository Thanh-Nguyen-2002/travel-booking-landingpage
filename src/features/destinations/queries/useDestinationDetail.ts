import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse } from '../../../types/common';
import type { DestinationResponse } from '../../../types/destination';

export const useDestinationDetail = (id: string | undefined) => {
    return useQuery({
        queryKey: ['destination', id],
        queryFn: async () => {
            if (!id) throw new Error('ID is required');
            const response = await apiClient.get<any, ApiResponse<DestinationResponse>>(`/destinations/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
};
