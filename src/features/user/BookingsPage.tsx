/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Tag, Button, Modal, Rate, Input, Popconfirm } from 'antd';
import { toast } from 'sonner';
import { Calendar, Search, CreditCard } from 'lucide-react';
import apiClient from '../../services/api-client';
import { PaymentModal } from '../booking/components/PaymentModal';

import { useMyBookings } from './queries/useMyBookings';
import { useCreateReview } from './queries/useCreateReview';
import { useUpdateBookingStatus } from './queries/useUpdateBookingStatus';

export const BookingsPage: React.FC = () => {
    const { data: myBookings, isLoading } = useMyBookings();
    const { mutate: createReview, isPending: isSubmittingReview } = useCreateReview();
    const { mutate: updateStatus, isPending: isUpdating } = useUpdateBookingStatus();
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);
    const [selectedPaymentBooking, setSelectedPaymentBooking] = useState<any>(null);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<'credit_card' | 'momo' | 'vnpay'>('vnpay');
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handlePayNow = (booking: any) => {
        setSelectedPaymentBooking(booking);
        setPaymentMethodOpen(true);
    };

    const handleConfirmPaymentMethod = async (method: 'credit_card' | 'momo' | 'vnpay') => {
        setPaymentMethodOpen(false);
        setSelectedMethod(method);

        if (method === 'vnpay') {
            setIsRedirecting(true);
            try {
                const returnUrl = window.location.origin + '/booking/vnpay-return';
                const res: any = await apiClient.get(`/payment/create?amount=${selectedPaymentBooking.total}&bookingId=${selectedPaymentBooking.id}&returnUrl=${encodeURIComponent(returnUrl)}`);
                if (res.data?.paymentUrl) {
                    window.location.replace(res.data.paymentUrl);
                } else {
                    toast.error('Không lấy được URL thanh toán VNPAY');
                    setIsRedirecting(false);
                }
            } catch (error) {
                toast.error('Lỗi kết nối đến cổng thanh toán VNPAY');
                setIsRedirecting(false);
            }
        } else {
            setPaymentModalOpen(true);
        }
    };

    const handlePaymentSuccess = () => {
        setPaymentModalOpen(false);
        toast.success('Thanh toán thành công!');
        setSelectedPaymentBooking(null);
    };

    const handlePaymentClose = () => {
        setPaymentModalOpen(false);
        toast.warning('Thanh toán chưa hoàn tất.');
        setSelectedPaymentBooking(null);
    };

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
            case 'CONFIRMED': return <Tag color="blue" className="rounded-full px-3 py-1 font-bold border-0">Đã xác nhận</Tag>;
            case 'PAID': return <Tag color="cyan" className="rounded-full px-3 py-1 font-bold border-0">Đã thanh toán</Tag>;
            case 'COMPLETED': return <Tag color="green" className="rounded-full px-3 py-1 font-bold border-0">Đã hoàn thành</Tag>;
            case 'CANCELLED': return <Tag color="error" className="rounded-full px-3 py-1 font-bold border-0">Đã hủy</Tag>;
            case 'PENDING': return <Tag color="orange" className="rounded-full px-3 py-1 font-bold border-0">Chờ thanh toán</Tag>;
            default: return <Tag className="rounded-full px-3 py-1 font-bold border-0">{status}</Tag>;
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
                                <div className="w-full md:w-72 h-48 md:h-auto shrink-0 relative bg-slate-200">
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                        <Calendar size={48} className="opacity-20" />
                                    </div>
                                    {/* <img src={getBookingImage(booking)} alt={booking.packageName || 'Khách sạn'} className="w-full h-full object-cover" /> */}
                                </div>
                                <div className="p-6 flex flex-col grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="pr-4">
                                            <h3 className="text-xl font-bold text-slate-800 mb-1 line-clamp-1 hover:text-primary-600 transition-colors cursor-pointer">{booking.packageName || 'Phòng Khách sạn'}</h3>
                                            <div className="text-primary-600 font-medium mb-3">{booking.rooms && booking.rooms.length > 0 ? booking.rooms[0].roomName : 'Phòng tiêu chuẩn'}</div>
                                        </div>
                                        <div className="text-right shrink-0 flex flex-col items-end gap-2">
                                            {getStatusTag(booking.status)}
                                            <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-center">
                                                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Mã Đặt Chỗ</div>
                                                <div className="font-bold text-slate-700">{booking.id.substring(0, 8).toUpperCase()}</div>
                                            </div>
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
                                            {(booking.status === 'CONFIRMED' || booking.status === 'PAID') && (
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
                                            {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
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
                                            {booking.status === 'PENDING' && (
                                                <Button
                                                    type="primary"
                                                    loading={isRedirecting && selectedPaymentBooking?.id === booking.id}
                                                    onClick={() => handlePayNow(booking)}
                                                    className="bg-blue-600 hover:!bg-blue-700 border-none rounded-lg font-semibold shadow-md shadow-blue-600/20 !h-12 px-5"
                                                >
                                                    Thanh toán
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Modal
                title={
                    <div className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                        Đánh giá Trải nghiệm
                    </div>
                }
                open={reviewModalVisible}
                onCancel={() => setReviewModalVisible(false)}
                footer={null}
                centered
                width={520}
                className="custom-review-modal"
                styles={{
                    body: { borderRadius: '24px', padding: '32px' }
                }}
            >
                {selectedBooking && (
                    <div className="py-2">
                        <div className="flex items-center gap-4 mb-8 p-5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-primary-200 transition-colors">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 z-10 border border-slate-100">
                                <Calendar className="text-primary-500" size={24} />
                            </div>
                            <div className="z-10">
                                <h4 className="font-bold text-slate-800 text-lg line-clamp-1 mb-1">{selectedBooking.packageName || 'Phòng Khách sạn'}</h4>
                                <div className="text-sm text-primary-600 font-semibold">{selectedBooking.rooms && selectedBooking.rooms.length > 0 ? selectedBooking.rooms[0].roomName : 'Phòng tiêu chuẩn'}</div>
                            </div>
                        </div>

                        <div className="mb-8 text-center">
                            <div className="text-slate-500 mb-4 font-medium text-base">Bạn đánh giá chuyến đi này bao nhiêu sao?</div>
                            <Rate
                                value={rating}
                                onChange={setRating}
                                className="text-5xl text-amber-400"
                            />
                        </div>

                        <div className="mb-8">
                            <div className="text-slate-700 mb-3 font-semibold flex items-center gap-2">
                                <span>Chia sẻ thêm</span>
                                <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Tùy chọn</span>
                            </div>
                            <Input.TextArea
                                rows={4}
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder="Trải nghiệm của bạn về dịch vụ, không gian, vị trí..."
                                className="rounded-2xl border-slate-200 hover:border-primary-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 text-base py-4 px-5 bg-slate-50/50 transition-all resize-none shadow-sm"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                            <Button
                                onClick={() => setReviewModalVisible(false)}
                                className="rounded-xl font-semibold px-6 h-12 border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                type="primary"
                                loading={isSubmittingReview}
                                onClick={handleSubmitReview}
                                className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 rounded-xl font-bold px-8 h-12 border-none shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
                            >
                                Gửi Đánh Giá
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                title={<div className="text-xl font-bold text-slate-800">Chọn phương thức thanh toán</div>}
                open={paymentMethodOpen}
                onCancel={() => setPaymentMethodOpen(false)}
                footer={null}
                centered
                width={500}
                styles={{ body: { padding: '24px' } }}
            >
                <div className="space-y-4 pt-4">
                    <div 
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-400 cursor-pointer transition-colors bg-white"
                        onClick={() => handleConfirmPaymentMethod('credit_card')}
                    >
                        <div className="font-medium text-slate-800">Thẻ Tín dụng / Ghi nợ</div>
                        <CreditCard size={24} className="text-slate-400" />
                    </div>
                    <div 
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-400 cursor-pointer transition-colors bg-white"
                        onClick={() => handleConfirmPaymentMethod('momo')}
                    >
                        <div className="font-medium text-slate-800">Ví MoMo</div>
                        <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>
                    </div>
                    <div 
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-400 cursor-pointer transition-colors bg-white"
                        onClick={() => handleConfirmPaymentMethod('vnpay')}
                    >
                        <div className="font-medium text-slate-800">VNPay</div>
                        <div className="text-blue-600 font-bold text-sm">VNPay</div>
                    </div>
                </div>
            </Modal>

            {selectedPaymentBooking && (
                <PaymentModal
                    open={paymentModalOpen}
                    onClose={handlePaymentClose}
                    onSuccess={handlePaymentSuccess}
                    paymentMethod={selectedMethod}
                    amount={selectedPaymentBooking.total}
                    bookingId={selectedPaymentBooking.id}
                />
            )}
        </div>
    );
};
