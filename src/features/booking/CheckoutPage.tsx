/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Form, Button, Steps, Divider } from 'antd';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useBookingStore } from '../../store/useBookingStore';
import { useCreateBooking } from './queries/useCreateBooking';
import type { BookingCreationRequest } from '../../types/booking';
import { EmptyBooking } from './components/EmptyBooking';
import { SuccessStep } from './components/SuccessStep';
import { OrderSummary } from './components/OrderSummary';
import { PaymentModal } from './components/PaymentModal';
import { ContactInfoForm } from './components/ContactInfoForm';
import { PaymentMethodSelector } from './components/PaymentMethodSelector';
import apiClient from '../../services/api-client';

export const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuthStore();
    const { bookingInfo, clearBookingInfo } = useBookingStore();
    const [step, setStep] = useState(0);
    const { mutate: createBooking, isPending } = useCreateBooking();
    const [form] = Form.useForm();
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [createdBooking, setCreatedBooking] = useState<any>(null);
    const [selectedMethod, setSelectedMethod] = useState<'credit_card' | 'momo' | 'vnpay'>('vnpay');

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

        const method = values.paymentMethod || 'vnpay';
        setSelectedMethod(method);

        createBooking(request, {
            onSuccess: async (data) => {
                setCreatedBooking(data);
                if (method === 'vnpay') {
                    try {
                        const returnUrl = window.location.origin + '/booking/vnpay-return';
                        const res: any = await apiClient.get(`/payment/create?amount=${data.total}&bookingId=${data.id}&returnUrl=${encodeURIComponent(returnUrl)}`);
                        if (res.data?.paymentUrl) {
                            window.location.replace(res.data.paymentUrl);
                        } else {
                            toast.error('Không lấy được URL thanh toán VNPAY');
                        }
                    } catch (error) {
                        toast.error('Lỗi kết nối đến cổng thanh toán VNPAY');
                    }
                } else {
                    setPaymentModalOpen(true);
                }
            },
            onError: (error: any) => {
                const message = error?.response?.data?.message || 'Có lỗi xảy ra khi đặt phòng. Vui lòng kiểm tra lại!';
                toast.error(message);
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
            <div className="container mx-auto px-4 max-w-6xl">
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
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                initialValues={{
                                    fullName: user?.fullName,
                                    email: user?.email,
                                    phone: user?.phone
                                }}
                                requiredMark={false}
                            >
                                <ContactInfoForm isAuthenticated={isAuthenticated} />

                                <Divider className="my-8" />

                                <PaymentMethodSelector form={form} />

                                <div className="mt-8">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        loading={isPending}
                                        className="w-full !bg-primary-600 hover:!bg-primary-700 h-14 text-lg font-lg font-bold rounded-xl shadow-lg shadow-primary-500/30"
                                    >
                                        {isPending ? 'Đang xử lý...' : (
                                            <span className="flex items-center justify-center gap-2">
                                                Xác nhận Đặt phòng <ArrowRight size={16} />
                                            </span>
                                        )}
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
