import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'sonner';
import { Mail, Lock, Key, ArrowLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from './services/auth.service';

export const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0); // 0: request email, 1: submit code & new password
    const [email, setEmail] = useState('');

    const forgotPasswordMutation = useMutation({
        mutationFn: authService.forgotPassword,
        onSuccess: () => {
            toast.success('Mã xác thực đã được gửi! Vui lòng kiểm tra email hoặc console log của server.');
            setStep(1);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng kiểm tra lại email.');
        }
    });

    const resetPasswordMutation = useMutation({
        mutationFn: authService.resetPassword,
        onSuccess: () => {
            toast.success('Đặt lại mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.');
            navigate('/login');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Mã xác thực không đúng hoặc đã hết hạn.');
        }
    });

    const handleRequestToken = (values: { email: string }) => {
        setEmail(values.email);
        forgotPasswordMutation.mutate(values.email);
    };

    const handleResetPassword = (values: any) => {
        resetPasswordMutation.mutate({
            token: values.token,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword
        });
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
            {/* Back Button */}
            <Link
                to="/login"
                className="absolute top-6 left-6 md:top-8 md:left-8 z-30 flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-xl group"
                title="Quay lại đăng nhập"
            >
                <ArrowLeft size={24} className="group-hover:scale-110 transition-transform" />
            </Link>

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-slate-900/60 z-10 backdrop-blur-[2px]"></div>
                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000"
                    alt="Travel Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Form Container */}
            <div className="relative z-20 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10">
                {step === 0 ? (
                    <div>
                        <div className="mb-8 mt-2 justify-center items-center flex flex-col text-center">
                            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4 text-primary-600">
                                <ShieldAlert size={32} />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">Quên mật khẩu?</h1>
                            <p className="text-slate-500">Nhập địa chỉ email của bạn để nhận mã xác thực đặt lại mật khẩu</p>
                        </div>

                        <Form layout="vertical" onFinish={handleRequestToken} requiredMark={false}>
                            <Form.Item
                                label={<span className="font-semibold text-slate-700">Email đã đăng ký</span>}
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Email không đúng định dạng!' }
                                ]}
                            >
                                <Input
                                    size="large"
                                    prefix={<Mail className="text-slate-400 mr-2" size={18} />}
                                    placeholder="your-email@example.com"
                                    className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                                />
                            </Form.Item>

                            <Form.Item className="mt-8 mb-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    loading={forgotPasswordMutation.isPending}
                                    className="w-full bg-slate-900 hover:!bg-primary-600 border-none rounded-xl h-12 text-base font-bold shadow-lg shadow-slate-900/20 hover:!shadow-primary-600/30 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Tiếp tục
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                ) : (
                    <div>
                        <div className="mb-8 mt-2 justify-center items-center flex flex-col text-center">
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                                <CheckCircle2 size={32} />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">Đặt lại mật khẩu</h1>
                            <p className="text-slate-500">Nhập mã xác nhận được gửi tới email <span className="font-bold text-slate-800">{email}</span></p>
                        </div>

                        <Form layout="vertical" onFinish={handleResetPassword} requiredMark={false}>
                            <Form.Item
                                label={<span className="font-semibold text-slate-700">Mã xác thực</span>}
                                name="token"
                                rules={[{ required: true, message: 'Vui lòng nhập mã xác thực!' }]}
                            >
                                <Input
                                    size="large"
                                    prefix={<Key className="text-slate-400 mr-2" size={18} />}
                                    placeholder="Nhập mã xác thực gồm 6 chữ số"
                                    className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5 font-semibold text-center tracking-widest text-lg"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="font-semibold text-slate-700">Mật khẩu mới</span>}
                                name="newPassword"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                    { min: 6, message: 'Mật khẩu mới phải từ 6 ký tự!' }
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<Lock className="text-slate-400 mr-2" size={18} />}
                                    placeholder="Tối thiểu 6 ký tự"
                                    className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="font-semibold text-slate-700">Xác nhận mật khẩu mới</span>}
                                name="confirmPassword"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<Lock className="text-slate-400 mr-2" size={18} />}
                                    placeholder="Nhập lại mật khẩu mới"
                                    className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                                />
                            </Form.Item>

                            <Form.Item className="mt-8 mb-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    loading={resetPasswordMutation.isPending}
                                    className="w-full bg-primary-600 hover:!bg-primary-700 border-none rounded-xl h-12 text-base font-bold shadow-lg shadow-primary-500/20 hover:!shadow-primary-700/30 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Cập nhật mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={() => setStep(0)}
                                className="text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors"
                            >
                                Gửi lại mã xác thực
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
