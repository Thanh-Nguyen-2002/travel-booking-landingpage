import React from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'sonner';
import { Mail, Lock, LogIn, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from './services/auth.service';
import { useAuthStore } from '../../store/useAuthStore';
import { IMAGES } from '../../assets/images';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);

    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (data) => {
            login(data);
            toast.success('Đăng nhập thành công!');
            navigate('/');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        }
    });

    const onFinish = (values: any) => {
        loginMutation.mutate({ email: values.email, password: values.password });
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
            {/* Back Button */}
            <Link
                to="/"
                className="absolute top-6 left-6 md:top-8 md:left-8 z-30 flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-xl group"
                title="Về trang chủ"
            >
                <ArrowLeft size={24} className="group-hover:scale-110 transition-transform" />
            </Link>

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-slate-900/60 z-10 backdrop-blur-[2px]"></div>
                <img
                    src={IMAGES.loginBg}
                    alt="Travel"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Form Container */}
            <div className="relative z-20 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-8 md:p-10">
                <div className="mb-8 mt-2 justify-center items-center flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Chào mừng trở lại</h1>
                    <p className="text-slate-500">Vui lòng đăng nhập để tiếp tục trải nghiệm</p>
                </div>

                <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                    <Form.Item
                        label={<span className="font-medium text-slate-700">Email hoặc Tên đăng nhập</span>}
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email hoặc tên đăng nhập!' }]}
                    >
                        <Input
                            size="large"
                            prefix={<Mail className="text-slate-400 mr-2" size={18} />}
                            placeholder="Nhập email của bạn"
                            className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="font-medium text-slate-700">Mật khẩu</span>}
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<Lock className="text-slate-400 mr-2" size={18} />}
                            placeholder="Nhập mật khẩu"
                            className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                        />
                    </Form.Item>

                    <div className="flex items-center justify-between mb-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500 border-slate-300 w-4 h-4 cursor-pointer" />
                            <span className="text-sm text-slate-600">Ghi nhớ đăng nhập</span>
                        </label>
                        <Link to="/forgot-password" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <Form.Item className="mb-6">
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={loginMutation.isPending}
                            className="w-full bg-slate-900 hover:!bg-primary-600 border-none rounded-xl h-12 text-base font-bold shadow-lg shadow-slate-900/20 hover:!shadow-primary-600/30 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {!loginMutation.isPending && <LogIn size={20} />}
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <div className="text-center">
                        <span className="text-slate-500">Chưa có tài khoản? </span>
                        <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
                            Đăng ký ngay <ArrowRight size={16} />
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};
