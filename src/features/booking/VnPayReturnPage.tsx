import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Button } from 'antd';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import apiClient from '../../services/api-client';
import { toast } from 'sonner';

export const VnPayReturnPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // Call BE API to verify VNPAY signature and update DB
                await apiClient.get(`/payment/vnpay-return?${searchParams.toString()}`);
                
                const responseCode = searchParams.get('vnp_ResponseCode');
                if (responseCode === '00') {
                    setStatus('success');
                    toast.success('Thanh toán thành công!');
                } else {
                    setStatus('failed');
                    toast.error('Thanh toán thất bại hoặc bị hủy.');
                }
            } catch (error) {
                setStatus('failed');
                toast.error('Lỗi khi xác minh giao dịch.');
            }
        };

        if (searchParams.toString()) {
            verifyPayment();
        } else {
            setStatus('failed');
        }
    }, [searchParams]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl text-center">
                {status === 'loading' && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-16 h-16 animate-spin text-primary-600 mb-4" />
                        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Đang xử lý thanh toán</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Vui lòng đợi trong giây lát, không tắt trình duyệt lúc này...
                        </p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="text-emerald-500 w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Thanh toán Thành công!</h2>
                        <p className="text-slate-500 mb-8">
                            Cảm ơn bạn đã sử dụng dịch vụ. Chuyến đi của bạn đã được xác nhận.
                        </p>
                        <div className="flex gap-4 w-full">
                            <Button 
                                type="primary" 
                                size="large" 
                                className="flex-1 bg-primary-600 rounded-xl h-12 font-bold"
                                onClick={() => navigate('/bookings')}
                            >
                                Xem lịch sử đặt phòng
                            </Button>
                        </div>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                            <XCircle className="text-rose-500 w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Thanh toán thất bại</h2>
                        <p className="text-slate-500 mb-8">
                            Giao dịch của bạn đã bị hủy hoặc có lỗi xảy ra trong quá trình thanh toán.
                        </p>
                        <div className="flex gap-4 w-full">
                            <Link to="/" className="w-full">
                                <Button size="large" className="w-full rounded-xl h-12 font-bold">
                                    Về trang chủ
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
