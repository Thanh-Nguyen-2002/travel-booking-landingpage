import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { CreditCard, QrCode, Timer, Loader2, ShieldCheck, XCircle } from 'lucide-react';

interface PaymentModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    paymentMethod: 'credit_card' | 'momo' | 'vnpay';
    amount: number;
    bookingId: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
    open,
    onClose,
    onSuccess,
    paymentMethod,
    amount,
    bookingId,
}) => {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
    const [cardValues, setCardValues] = useState({ number: '', name: '', expiry: '', cvc: '' });

    useEffect(() => {
        if (!open) return;

        // Reset state
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTimeLeft(300);
        setPaymentStatus('pending');

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setPaymentStatus('failed');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [open]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSimulatePayment = () => {
        setPaymentStatus('processing');
        setTimeout(() => {
            setPaymentStatus('success');
            setTimeout(() => {
                onSuccess();
            }, 1500);
        }, 2000);
    };

    const qrData = paymentMethod === 'momo'
        ? `230012-momo-payment-${bookingId}-${amount}`
        : `00020101021238580010A00000072701240006970422021012345678905204599953037045405${amount}5802VN5913TRAVELBOOKING6005HANOI62200516PAYMENT${bookingId.substring(0, 8)}`;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={paymentMethod === 'credit_card' ? 550 : 680}
            className="custom-payment-modal"
            title={
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <ShieldCheck className="text-emerald-500" size={24} />
                    <div>
                        <h3 className="font-bold text-slate-800 text-lg">Cổng thanh toán an toàn</h3>
                        <p className="text-xs text-slate-400 font-normal">Mã giao dịch: {bookingId.substring(0, 8).toUpperCase()}</p>
                    </div>
                </div>
            }
        >
            <div className="py-6">
                {paymentStatus === 'processing' ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-16 h-16 animate-spin text-primary-600 mb-4" />
                        <h4 className="text-xl font-bold text-slate-800 mb-2">Đang xác thực giao dịch</h4>
                        <p className="text-slate-500">Hệ thống đang kiểm tra thanh toán từ phía ngân hàng...</p>
                    </div>
                ) : paymentStatus === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="text-emerald-500" size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 mb-2 font-display">Thanh toán Thành công!</h4>
                        <p className="text-emerald-600 font-medium">Đang chuyển hướng về lịch sử đặt phòng...</p>
                    </div>
                ) : paymentStatus === 'failed' ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                            <XCircle className="text-rose-500" size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 mb-2">Giao dịch thất bại hoặc Hết hạn</h4>
                        <p className="text-slate-500 mb-6">Đã quá thời gian thực hiện thanh toán.</p>
                        <Button type="primary" danger onClick={onClose} className="rounded-xl px-6 font-bold">Quay lại</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        {/* Left column: payment action */}
                        <div className={`${paymentMethod === 'credit_card' ? 'md:col-span-12' : 'md:col-span-7'} space-y-4`}>
                            {paymentMethod === 'credit_card' ? (
                                <div className="space-y-6">
                                    {/* Credit card view */}
                                    <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-6 rounded-xl text-white shadow-xl flex flex-col justify-between aspect-[1.58/1] h-48 mx-auto relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
                                        <div className="flex justify-between items-start">
                                            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Thẻ tín dụng</div>
                                            <CreditCard size={32} className="text-slate-300" />
                                        </div>
                                        <div className="text-xl font-mono tracking-widest my-4">
                                            {cardValues.number || '•••• •••• •••• ••••'}
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-[10px] uppercase text-slate-400 font-bold">Chủ thẻ</div>
                                                <div className="text-sm font-semibold truncate max-w-[180px]">
                                                    {cardValues.name.toUpperCase() || 'HỌ VÀ TÊN'}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] uppercase text-slate-400 font-bold">Hạn dùng</div>
                                                <div className="text-sm font-semibold">{cardValues.expiry || 'MM/YY'}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card input form */}
                                    <Form layout="vertical" onFinish={handleSimulatePayment} requiredMark={false}>
                                        <Form.Item label={<span className="font-semibold text-slate-700">Số thẻ</span>} name="number" rules={[{ required: true, message: 'Nhập số thẻ' }]}>
                                            <Input
                                                maxLength={19}
                                                placeholder="4111 2222 3333 4444"
                                                onChange={e => setCardValues(prev => ({ ...prev, number: e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim() }))}
                                                className="rounded-xl py-2"
                                            />
                                        </Form.Item>
                                        <Form.Item label={<span className="font-semibold text-slate-700">Tên trên thẻ</span>} name="name" rules={[{ required: true, message: 'Nhập tên' }]}>
                                            <Input
                                                placeholder="NGUYEN VAN A"
                                                onChange={e => setCardValues(prev => ({ ...prev, name: e.target.value }))}
                                                className="rounded-xl py-2"
                                            />
                                        </Form.Item>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Form.Item label={<span className="font-semibold text-slate-700">Hạn dùng (MM/YY)</span>} name="expiry" rules={[{ required: true, message: 'Nhập hạn' }]}>
                                                <Input
                                                    maxLength={5}
                                                    placeholder="12/28"
                                                    onChange={e => setCardValues(prev => ({ ...prev, expiry: e.target.value }))}
                                                    className="rounded-xl py-2"
                                                />
                                            </Form.Item>
                                            <Form.Item label={<span className="font-semibold text-slate-700">CVC</span>} name="cvc" rules={[{ required: true, message: 'Nhập CVC' }]}>
                                                <Input.Password
                                                    maxLength={3}
                                                    placeholder="123"
                                                    onChange={e => setCardValues(prev => ({ ...prev, cvc: e.target.value }))}
                                                    className="rounded-xl py-2"
                                                />
                                            </Form.Item>
                                        </div>
                                        <Button type="primary" htmlType="submit" size="large" className="w-full bg-slate-900 h-12 rounded-xl font-bold mt-4">
                                            Thanh toán {amount.toLocaleString()}đ
                                        </Button>
                                    </Form>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className={`p-4 rounded-xl border flex items-center justify-between ${paymentMethod === 'momo' ? 'bg-pink-50 border-pink-100' : 'bg-blue-50 border-blue-100'}`}>
                                        <div>
                                            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Phương thức</div>
                                            <div className={`font-bold text-base ${paymentMethod === 'momo' ? 'text-pink-600' : 'text-blue-600'}`}>
                                                {paymentMethod === 'momo' ? 'Ví MoMo' : 'VNPay QR'}
                                            </div>
                                        </div>
                                        {paymentMethod === 'momo' ? (
                                            <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white text-lg font-bold">M</div>
                                        ) : (
                                            <div className="text-blue-600 font-extrabold italic text-lg">VNPay</div>
                                        )}
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                                        <div className="flex justify-between text-sm text-slate-500">
                                            <span>Số tiền:</span>
                                            <span className="font-bold text-slate-800">{amount.toLocaleString()}đ</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-slate-500">
                                            <span>Nội dung:</span>
                                            <span className="font-bold text-slate-800 truncate max-w-[150px]">PAY {bookingId.substring(0, 8).toUpperCase()}</span>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700 space-y-1">
                                        <p className="font-bold">Hướng dẫn thanh toán:</p>
                                        <p>1. Mở ứng dụng {paymentMethod === 'momo' ? 'MoMo' : 'Ngân hàng / Mobile Banking'}.</p>
                                        <p>2. Chọn chức năng quét mã QR.</p>
                                        <p>3. Quét mã QR bên cạnh để hoàn tất giao dịch.</p>
                                    </div>

                                    <div className="pt-2">
                                        <Button
                                            type="primary"
                                            onClick={handleSimulatePayment}
                                            size="large"
                                            className={`w-full h-12 rounded-xl font-bold text-white shadow-lg ${paymentMethod === 'momo' ? 'bg-pink-600 hover:!bg-pink-700 shadow-pink-500/20' : 'bg-blue-600 hover:!bg-blue-700 shadow-blue-500/20'}`}
                                        >
                                            Xác nhận đã quét mã thành công
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right column: QR Code and Timer (only for QR payments) */}
                        {paymentMethod !== 'credit_card' && (
                            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 border border-slate-100 rounded-xl bg-white shadow-sm self-stretch">
                                <div className="flex items-center gap-1 text-slate-400 text-sm mb-4 font-bold">
                                    <Timer size={16} />
                                    <span>Hết hạn sau:</span>
                                    <span className="text-rose-500 font-extrabold">{formatTime(timeLeft)}</span>
                                </div>

                                <div className="p-3 border border-slate-100 rounded-xl shadow-inner bg-slate-50 relative group">
                                    <img src={qrUrl} alt="Payment QR Code" className="w-48 h-48 object-contain mix-blend-multiply" />
                                    <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col p-4 rounded-xl cursor-default text-center">
                                        <QrCode className="text-slate-400 mb-2" size={32} />
                                        <span className="text-xs font-semibold text-slate-600">Quét mã để liên kết thanh toán</span>
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Loader2 className="w-3.5 h-3.5 animate-spin text-primary-500" />
                                        <span>Đang chờ quét...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};
