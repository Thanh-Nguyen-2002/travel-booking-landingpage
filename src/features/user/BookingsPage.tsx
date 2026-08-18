import React, { useState } from 'react';
import { Tag, Button, Modal, Rate, Input } from 'antd';
import { toast } from 'sonner';
import { Calendar, Search } from 'lucide-react';


import { useMyBookings } from './queries/useMyBookings';
import { useCreateReview } from './queries/useCreateReview';

export const BookingsPage: React.FC = () => {
    const { data: myBookings, isLoading } = useMyBookings();
    const { mutate: createReview, isPending: isSubmittingReview } = useCreateReview();
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleOpenReview = (booking: any) => {
        setSelectedBooking(booking);
        setRating(5);
        setComment('');
        setReviewModalVisible(true);
    };

    const handleSubmitReview = () => {
        if (!comment.trim()) {
            toast.warning('Vui lòng nhập nội dung đánh giá!');
            return;
        }

        const hotelId = selectedBooking?.rooms?.[0]?.hotelId;
        if (!hotelId) {
            toast.error('Không tìm thấy thông tin khách sạn để đánh giá!');
            return;
        }

        createReview({
            hotelId,
            roomId: selectedBooking.rooms[0].roomId,
            rating,
            comment
        }, {
            onSuccess: () => {
                toast.success('Gửi đánh giá thành công, đang chờ duyệt!');
                setReviewModalVisible(false);
            },
            onError: (err: any) => {
                const msg = err.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá!';
                toast.error(msg);
            }
        });
    };

    const getStatusTag = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return <Tag color="blue" className="rounded-full px-3 py-1 font-bold border-0">Sắp diễn ra</Tag>;
            case 'COMPLETED': return <Tag color="green" className="rounded-full px-3 py-1 font-bold border-0">Đã hoàn thành</Tag>;
            case 'CANCELLED': return <Tag color="error" className="rounded-full px-3 py-1 font-bold border-0">Đã hủy</Tag>;
            default: return <Tag>{status}</Tag>;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-slate-800">Lịch sử đặt phòng</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Tìm mã đặt phòng..." className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none hover:border-primary-400 focus:border-primary-500 transition-colors w-full md:w-64" />
                    </div>
                </div>

                <div className="space-y-6">
                    {isLoading ? (
                        <div className="text-center py-12 text-slate-500 font-medium">Đang tải lịch sử đặt phòng...</div>
                    ) : !myBookings || myBookings.length === 0 ? (
                        <div className="text-center py-12 text-slate-500 font-medium bg-white rounded-xl border border-slate-100">Bạn chưa có chuyến đi nào.</div>
                    ) : (
                        myBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
                                <div className="w-full md:w-72 h-48 md:h-auto shrink-0 relative">
                                    <img src="https://images.unsplash.com/photo-1566073171589-236237eff6dd?q=80&w=500" alt={booking.packageName || 'Khách sạn'} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 left-3">
                                        {getStatusTag(booking.status)}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="pr-4">
                                            <h3 className="text-xl font-bold text-slate-800 mb-1 line-clamp-1 hover:text-primary-600 transition-colors cursor-pointer">{booking.packageName || 'Phòng Khách sạn'}</h3>
                                            <div className="text-primary-600 font-medium mb-3">{booking.rooms && booking.rooms.length > 0 ? booking.rooms[0].roomName : 'Phòng tiêu chuẩn'}</div>
                                        </div>
                                        <div className="text-right shrink-0 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Mã Đặt Chỗ</div>
                                            <div className="font-bold text-slate-700">{booking.id.substring(0, 8).toUpperCase()}</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-8 text-sm text-slate-600 mb-6">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-slate-400" />
                                            <span><span className="font-medium text-slate-800">In:</span> {booking.checkIn}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-slate-400" />
                                            <span><span className="font-medium text-slate-800">Out:</span> {booking.checkOut}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                                        <div className="text-lg font-bold text-slate-800">
                                            Tổng tiền: <span className="text-primary-600 ml-1">{booking.total.toLocaleString()}đ</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            {booking.status === 'COMPLETED' && (
                                                <Button type="primary" onClick={() => handleOpenReview(booking)} className="bg-amber-500 hover:!bg-amber-600 border-none rounded-lg font-semibold shadow-md shadow-amber-500/20 h-10 px-5">
                                                    Viết Đánh Giá
                                                </Button>
                                            )}
                                            <Button className="rounded-lg h-10 px-5 border-slate-200 font-medium hover:text-primary-600 hover:border-primary-400 shadow-sm">
                                                Xem chi tiết
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Modal
                title={<div className="text-xl font-bold text-slate-800">Đánh giá Trải nghiệm</div>}
                open={reviewModalVisible}
                onCancel={() => setReviewModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setReviewModalVisible(false)} className="rounded-xl font-medium px-6">Hủy bỏ</Button>,
                    <Button key="submit" type="primary" loading={isSubmittingReview} onClick={handleSubmitReview} className="bg-primary-600 rounded-xl font-bold px-8 border-none shadow-lg shadow-primary-500/30">Gửi Đánh Giá</Button>
                ]}
                centered
                width={500}
                className="custom-review-modal"
            >
                {selectedBooking && (
                    <div className="py-4">
                        <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <img src="https://images.unsplash.com/photo-1566073171589-236237eff6dd?q=80&w=500" className="w-16 h-16 rounded-lg object-cover shadow-sm" alt="hotel" />
                            <div>
                                <h4 className="font-bold text-slate-800 line-clamp-1 mb-1">{selectedBooking.packageName || 'Phòng Khách sạn'}</h4>
                                <div className="text-sm text-primary-600 font-medium">{selectedBooking.rooms && selectedBooking.rooms.length > 0 ? selectedBooking.rooms[0].roomName : 'Phòng tiêu chuẩn'}</div>
                            </div>
                        </div>

                        <div className="mb-6 text-center">
                            <div className="text-slate-600 mb-3 font-medium text-lg">Bạn cảm thấy chuyến đi thế nào?</div>
                            <Rate value={rating} onChange={setRating} className="text-4xl text-amber-500" />
                        </div>

                        <div className="mb-2">
                            <div className="text-slate-700 mb-2 font-medium">Chia sẻ thêm (Tùy chọn)</div>
                            <Input.TextArea 
                                rows={4} 
                                value={comment} 
                                onChange={e => setComment(e.target.value)} 
                                placeholder="Hãy mô tả trải nghiệm của bạn (phòng ốc, dịch vụ, vị trí...)"
                                className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 text-base py-3"
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
