import { apiClient } from '../../../services/api-client';
import type { ApiResponse } from '../../../types/common';
import type { BookingCreationRequest, BookingResponse } from '../../../types/booking';

export const bookingService = {
    createBooking: async (request: BookingCreationRequest) => {
        const response = await apiClient.post<any, ApiResponse<BookingResponse>>('/bookings', request);
        return response.data;
    },
    
    getMyBookings: async () => {
        const response = await apiClient.get<any, ApiResponse<BookingResponse[]>>('/bookings/my-bookings');
        return response.data;
    },

    updateBookingStatus: async (id: string, status: string) => {
        const response = await apiClient.put<any, ApiResponse<BookingResponse>>(`/bookings/${id}/status?status=${status}`);
        return response.data;
    }
};
