import React from 'react';
import { Tag, Button, Popconfirm } from 'antd';
import { Calendar } from 'lucide-react';
import { useUpdateBookingStatus } from '../queries/useUpdateBookingStatus';
import { getCoverImage } from '../../../utils/image';

interface BookingCardProps {
    booking: any;
    onOpenReview: (booking: any) => void;
    onPayNow: (booking: any) => void;
    isRedirecting: boolean;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onOpenReview, onPayNow, isRedirecting }) => {
    const { mutate: updateStatus, isPending: isUpdating } = useUpdateBookingStatus();

    const getBookingStatusTag = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return <Tag color="blue" className="rounded-full px-3 py-1 font-bold border-0">Đã xác nhận</Tag>;
            case 'COMPLETED': return <Tag color="green" className="rounded-full px-3 py-1 font-bold border-0">Đã hoàn thành</Tag>;
            case 'CANCELLED': return <Tag color="error" className="rounded-full px-3 py-1 font-bold border-0">Đã hủy</Tag>;
            case 'REJECTED': return <Tag color="error" className="rounded-full px-3 py-1 font-bold border-0">Bị từ chối</Tag>;
            case 'PENDING': return <Tag color="orange" className="rounded-full px-3 py-1 font-bold border-0">Chờ xác nhận</Tag>;
            default: return <Tag className="rounded-full px-3 py-1 font-bold border-0">{status || 'PENDING'}</Tag>;
        }
    };

    const getPaymentStatusTag = (status: string) => {
        switch (status) {
            case 'PAID': return <Tag color="cyan" className="rounded-full px-3 py-1 font-bold border-0">Đã thanh toán</Tag>;
            case 'UNPAID': return <Tag color="default" className="rounded-full px-3 py-1 font-bold border-0">Chưa thanh toán</Tag>;
            case 'REFUNDING': return <Tag color="orange" className="rounded-full px-3 py-1 font-bold border-0">Chờ hoàn tiền</Tag>;
            case 'REFUNDED': return <Tag color="purple" className="rounded-full px-3 py-1 font-bold border-0">Đã hoàn tiền</Tag>;
            default: return <Tag className="rounded-full px-3 py-1 font-bold border-0">{status || 'UNPAID'}</Tag>;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
            <div className="w-full md:w-72 h-48 md:h-auto shrink-0 relative bg-slate-200 overflow-hidden">
                {booking.packageImage || (booking.rooms && booking.rooms.length > 0 && booking.rooms[0].roomImage) ? (
                    <img 
                        src={getCoverImage(booking.packageImage || booking.rooms[0].roomImage)} 
                        alt="Booking" 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        <Calendar size={48} className="opacity-20" />
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                    <div className="pr-4">
                        <h3 className="text-xl font-bold text-slate-800 mb-1 line-clamp-1 hover:text-primary-600 transition-colors cursor-pointer">{booking.packageName || 'Phòng Khách sạn'}</h3>
                        <div className="text-primary-600 font-medium mb-3">{booking.rooms && booking.rooms.length > 0 ? booking.rooms[0].roomName : 'Phòng tiêu chuẩn'}</div>
                    </div>
                    <div className="text-right shrink-0 flex flex-col items-end gap-2">
                        <div className="flex gap-2">
                            {getBookingStatusTag(booking.bookingStatus)}
                            {getPaymentStatusTag(booking.paymentStatus)}
                        </div>
                        <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-center">
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Mã Đặt Chỗ</div>
                            <div className="font-bold text-slate-700">{booking.id.substring(0, 8).toUpperCase()}</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-8 text-sm text-slate-600 mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-400" />
                        <span><span className="font-medium text-slate-800">Ngày nhận phòng:</span> {booking.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-400" />
                        <span><span className="font-medium text-slate-800">Ngày trả phòng:</span> {booking.checkOut}</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                    <div className="text-lg font-bold text-slate-800">
                        Tổng tiền: <span className="text-primary-600 ml-1">{booking.total.toLocaleString()}đ</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {booking.bookingStatus === 'COMPLETED' && (
                            <Button type="primary" onClick={() => onOpenReview(booking)} className="bg-amber-500 hover:!bg-amber-600 border-none rounded-lg font-semibold shadow-md shadow-amber-500/20 !h-12 px-5">
                                Viết Đánh Giá
                            </Button>
                        )}
                        {booking.bookingStatus === 'CONFIRMED' && (
                            <Popconfirm
                                title="Xác nhận hoàn thành"
                                description="Bạn có chắc chắn chuyến đi này đã hoàn tất?"
                                onConfirm={() => updateStatus({ id: booking.id, status: 'COMPLETED' })}
                                okText="Xác nhận"
                                cancelText="Đóng"
                                okButtonProps={{ className: "bg-green-600 hover:!bg-green-700 border-none shadow-md shadow-green-600/20" }}
                            >
                                <Button
                                    type="primary"
                                    loading={isUpdating}
                                    className="bg-green-600 hover:!bg-green-700 border-none rounded-lg font-semibold shadow-md shadow-green-600/20 !h-12 px-5"
                                >
                                    Hoàn thành
                                </Button>
                            </Popconfirm>
                        )}
                        {(booking.bookingStatus === 'PENDING' || booking.bookingStatus === 'CONFIRMED') && (
                            <Popconfirm
                                title="Xác nhận hủy phòng"
                                description="Bạn có chắc chắn muốn hủy đặt phòng này không? Hành động này không thể hoàn tác."
                                onConfirm={() => updateStatus({ id: booking.id, status: 'CANCELLED' })}
                                okText="Xác nhận hủy"
                                cancelText="Đóng"
                                okButtonProps={{ danger: true }}
                            >
                                <Button
                                    danger
                                    loading={isUpdating}
                                    className="rounded-lg font-semibold !h-12 px-5"
                                >
                                    Hủy phòng
                                </Button>
                            </Popconfirm>
                        )}
                        {booking.paymentStatus === 'UNPAID' && booking.bookingStatus !== 'CANCELLED' && booking.bookingStatus !== 'REJECTED' && (
                            <Button
                                type="primary"
                                loading={isRedirecting}
                                onClick={() => onPayNow(booking)}
                                className="bg-blue-600 hover:!bg-blue-700 border-none rounded-lg font-semibold shadow-md shadow-blue-600/20 !h-12 px-5"
                            >
                                Thanh toán ngay
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
