import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { bookingService } from '../../booking/services/booking.service';

export const useUpdateBookingStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            return await bookingService.updateBookingStatus(id, status);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
            toast.success('Cập nhật trạng thái thành công');
        },
        onError: (error: any) => {
            const msg = error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái';
            toast.error(msg);
        }
    });
};
