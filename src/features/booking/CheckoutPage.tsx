import React, { useState } from 'react';
import { Form, Input, Button, Steps, Divider, Radio } from 'antd';
import { toast } from 'sonner';
import { CreditCard, User, Mail, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useBookingStore } from '../../store/useBookingStore';
import { useCreateBooking } from './queries/useCreateBooking';
import type { BookingCreationRequest } from '../../types/booking';
import { EmptyBooking } from './components/EmptyBooking';
import { SuccessStep } from './components/SuccessStep';
import { OrderSummary } from './components/OrderSummary';
import { PaymentModal } from './components/PaymentModal';

export const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuthStore();
    const { bookingInfo, clearBookingInfo } = useBookingStore();
    const [step, setStep] = useState(0);
    const { mutate: createBooking, isPending } = useCreateBooking();
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [createdBooking, setCreatedBooking] = useState<any>(null);
    const [selectedMethod, setSelectedMethod] = useState<'credit_card' | 'momo' | 'vnpay'>('credit_card');

    if (!bookingInfo) {
        return <EmptyBooking />;
    }

    const onFinish = (values: any) => {
        if (!isAuthenticated) {
            toast.warning('Vui lòng đăng nhập để tiếp tục thanh toán');
            navigate('/login');
            return;
        }
        
        const request: BookingCreationRequest = {
            checkIn: bookingInfo.checkIn || new Date().toISOString().split('T')[0],
            checkOut: bookingInfo.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
            customerName: values.fullName,
            customerPhone: values.phone,
            customerEmail: values.email,
            guests: bookingInfo.guests || 2,
        };

        if (bookingInfo.type === 'package' && bookingInfo.packageId) {
            request.packageId = bookingInfo.packageId;
        } else if (bookingInfo.roomId) {
            request.items = [{
                roomId: bookingInfo.roomId,
                quantity: 1
            }];
        }
        
        const method = values.paymentMethod || 'credit_card';
        setSelectedMethod(method);

        createBooking(request, {
            onSuccess: (data) => {
                setCreatedBooking(data);
                setPaymentModalOpen(true);
            },
            onError: () => {
                toast.error('Có lỗi xảy ra khi đặt phòng. Vui lòng kiểm tra lại!');
            }
        });
    };

    const handlePaymentSuccess = () => {
        setPaymentModalOpen(false);
        toast.success('Đặt phòng thành công! Cảm ơn bạn đã sử dụng dịch vụ.');
        clearBookingInfo();
        setStep(1);
    };

    const handlePaymentClose = () => {
        setPaymentModalOpen(false);
        toast.warning('Thanh toán chưa hoàn tất. Bạn có thể tiếp tục thanh toán trong Lịch sử đặt phòng.');
        clearBookingInfo();
        navigate('/bookings');
    };

    if (step === 1) {
        return <SuccessStep />;
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-24 pt-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex items-center gap-2 text-slate-500 mb-8">
                    {bookingInfo.type === 'package' ? (
                        <Link to={`/packages/${bookingInfo.packageId}`} className="hover:text-primary-600 flex items-center gap-1">
                            <ArrowLeft size={16} /> Quay lại tour du lịch
                        </Link>
                    ) : (
                        <Link to={`/hotels/${bookingInfo.hotelId}`} className="hover:text-primary-600 flex items-center gap-1">
                            <ArrowLeft size={16} /> Quay lại khách sạn
                        </Link>
                    )}
                </div>

                <div className="mb-12">
                    <Steps
                        current={0}
                        items={[
                            { title: 'Thông tin & Thanh toán' },
                            { title: 'Hoàn tất' },
                        ]}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Thông tin liên hệ</h2>
                            
                            {!isAuthenticated && (
                                <div className="bg-primary-50 text-primary-700 p-4 rounded-xl mb-8 flex items-center justify-between border border-primary-100">
                                    <div className="flex items-center gap-3">
                                        <User size={20} className="text-primary-600" />
                                        <span className="font-medium">Bạn đã có tài khoản? Đăng nhập để thanh toán nhanh hơn.</span>
                                    </div>
                                    <Link to="/login" className="px-4 py-1.5 bg-white text-primary-600 font-bold rounded-lg shadow-sm border border-primary-100 hover:bg-primary-600 hover:text-white transition-colors">
                                        Đăng nhập
                                    </Link>
                                </div>
                            )}

                            <Form 
                                layout="vertical" 
                                onFinish={onFinish} 
                                initialValues={{
                                    fullName: user?.fullName,
                                    email: user?.email,
                                    phone: user?.phone
                                }}
                                requiredMark={false}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item 
                                        label={<span className="font-medium text-slate-700">Họ và Tên</span>}
                                        name="fullName"
                                        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                                    >
                                        <Input size="large" prefix={<User className="text-slate-400 mr-2" size={18} />} className="rounded-xl border-slate-200" />
                                    </Form.Item>
                                    
                                    <Form.Item 
                                        label={<span className="font-medium text-slate-700">Email</span>}
                                        name="email"
                                        rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}
                                    >
                                        <Input size="large" prefix={<Mail className="text-slate-400 mr-2" size={18} />} className="rounded-xl border-slate-200" />
                                    </Form.Item>
                                    
                                    <Form.Item 
                                        label={<span className="font-medium text-slate-700">Số điện thoại</span>}
                                        name="phone"
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                                    >
                                        <Input size="large" prefix={<Phone className="text-slate-400 mr-2" size={18} />} className="rounded-xl border-slate-200" />
                                    </Form.Item>
                                </div>

                                <Divider className="my-8" />

                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Phương thức thanh toán</h2>
                                <Form.Item name="paymentMethod" initialValue="credit_card">
                                    <Radio.Group className="w-full space-y-4">
                                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-400 cursor-pointer transition-colors bg-white">
                                            <Radio value="credit_card" className="font-medium text-slate-800">Thẻ Tín dụng / Ghi nợ (Credit/Debit Card)</Radio>
                                            <CreditCard size={24} className="text-slate-400" />
                                        </div>
                                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-400 cursor-pointer transition-colors bg-white">
                                            <Radio value="momo" className="font-medium text-slate-800">Ví MoMo</Radio>
                                            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>
                                        </div>
                                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-400 cursor-pointer transition-colors bg-white">
                                            <Radio value="vnpay" className="font-medium text-slate-800">VNPay</Radio>
                                            <div className="text-blue-600 font-bold text-sm">VNPay</div>
                                        </div>
                                    </Radio.Group>
                                </Form.Item>

                                <div className="mt-8">
                                    <Button 
                                        type="primary" 
                                        htmlType="submit"
                                        size="large"
                                        loading={isPending}
                                        className="w-full bg-primary-600 hover:!bg-primary-700 h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2"
                                    >
                                        {isPending ? 'Đang xử lý...' : <>Xác nhận Đặt phòng <ArrowRight size={20} /></>}
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <OrderSummary bookingInfo={bookingInfo} />
                    </div>
                </div>
            </div>
            {createdBooking && (
                <PaymentModal
                    open={paymentModalOpen}
                    onClose={handlePaymentClose}
                    onSuccess={handlePaymentSuccess}
                    paymentMethod={selectedMethod}
                    amount={createdBooking.total}
                    bookingId={createdBooking.id}
                />
            )}
        </div>
    );
};
