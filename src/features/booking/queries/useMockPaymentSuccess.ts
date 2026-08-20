import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';

export const useMockPaymentSuccess = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (bookingId: string) => {
            const { data } = await apiClient.post(`/payment/mock-success?bookingId=${bookingId}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
        },
    });
};
