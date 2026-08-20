import React, { useState } from 'react';
import { Search } from 'lucide-react';

import { useMyBookings } from './queries/useMyBookings';
import { BookingCard } from './components/BookingCard';
import { ReviewModal } from './components/ReviewModal';
import { PaymentSelectionFlow } from './components/PaymentSelectionFlow';

export const BookingsPage: React.FC = () => {
    const { data: myBookings, isLoading } = useMyBookings();
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);

    const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);
    const [selectedPaymentBooking, setSelectedPaymentBooking] = useState<any>(null);
    const [isRedirectingId, setIsRedirectingId] = useState<string | null>(null);

    const handleOpenReview = (booking: any) => {
        setSelectedBooking(booking);
        setReviewModalVisible(true);
    };

    const handlePayNow = (booking: any) => {
        setSelectedPaymentBooking(booking);
        setPaymentMethodOpen(true);
    };

    const handleRedirecting = (redirecting: boolean) => {
        if (redirecting) {
            setIsRedirectingId(selectedPaymentBooking?.id);
        } else {
            setIsRedirectingId(null);
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
                        myBookings.map((booking: any) => (
                            <BookingCard 
                                key={booking.id} 
                                booking={booking} 
                                onOpenReview={handleOpenReview} 
                                onPayNow={handlePayNow} 
                                isRedirecting={isRedirectingId === booking.id} 
                            />
                        ))
                    )}
                </div>
            </div>

            <ReviewModal 
                open={reviewModalVisible} 
                onCancel={() => setReviewModalVisible(false)} 
                booking={selectedBooking} 
            />

            <PaymentSelectionFlow 
                open={paymentMethodOpen} 
                onCancel={() => setPaymentMethodOpen(false)} 
                booking={selectedPaymentBooking} 
                onRedirecting={handleRedirecting}
            />
        </div>
    );
};
