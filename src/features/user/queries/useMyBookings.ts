import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../../booking/services/booking.service';
import { useAuthStore } from '../../../store/useAuthStore';

export const useMyBookings = () => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    
    return useQuery({
        queryKey: ['my-bookings'],
        queryFn: () => bookingService.getMyBookings(),
        enabled: isAuthenticated
    });
};
