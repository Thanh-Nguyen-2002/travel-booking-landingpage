import { useMutation } from '@tanstack/react-query';
import { bookingService } from '../services/booking.service';
import type { BookingCreationRequest } from '../../../types/booking';

export const useCreateBooking = () => {
    return useMutation({
        mutationFn: (request: BookingCreationRequest) => bookingService.createBooking(request)
    });
};
