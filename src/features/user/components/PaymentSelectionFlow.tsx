import React, { useState } from 'react';
import { Modal } from 'antd';
import { CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '../../../services/api-client';
import { PaymentModal } from '../../booking/components/PaymentModal';

interface PaymentSelectionFlowProps {
    open: boolean;
    onCancel: () => void;
    booking: any;
    onRedirecting: (isRedirecting: boolean) => void;
}

export const PaymentSelectionFlow: React.FC<PaymentSelectionFlowProps> = ({ open, onCancel, booking, onRedirecting }) => {
    const [selectedMethod, setSelectedMethod] = useState<'credit_card' | 'momo' | 'vnpay'>('vnpay');
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);

    const handleConfirmPaymentMethod = async (method: 'credit_card' | 'momo' | 'vnpay') => {
        setSelectedMethod(method);
        
        if (method === 'vnpay') {
            onCancel(); // Close selection modal
            onRedirecting(true);
            try {
                const returnUrl = window.location.origin + '/booking/vnpay-return';
                const res: any = await apiClient.get(`/payment/create?amount=${booking.total}&bookingId=${booking.id}&returnUrl=${encodeURIComponent(returnUrl)}`);
                if (res.data?.paymentUrl) {
                    window.location.replace(res.data.paymentUrl);
                } else {
                    toast.error('Không lấy được URL thanh toán VNPAY');
                    onRedirecting(false);
                }
            } catch (error) {
                toast.error('Lỗi kết nối đến cổng thanh toán VNPAY');
                onRedirecting(false);
            }
        } else {
            onCancel(); // Close selection modal
            setPaymentModalOpen(true);
        }
    };

    const handlePaymentSuccess = () => {
        setPaymentModalOpen(false);
        toast.success('Thanh toán thành công!');
    };

    const handlePaymentClose = () => {
        setPaymentModalOpen(false);
        toast.warning('Thanh toán chưa hoàn tất.');
    };

    return (
        <>
            <Modal
                title={<div className="text-xl font-bold text-slate-800">Chọn phương thức thanh toán</div>}
                open={open}
                onCancel={onCancel}
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

            {booking && (
                <PaymentModal
                    open={paymentModalOpen}
                    onClose={handlePaymentClose}
                    onSuccess={handlePaymentSuccess}
                    paymentMethod={selectedMethod}
                    amount={booking.total}
                    bookingId={booking.id}
                />
            )}
        </>
    );
};
