import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '../services/booking.service';
import type { BookingCreationRequest } from '../../../types/booking';

export const useCreateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: BookingCreationRequest) => bookingService.createBooking(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
        }
    });
};
