import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from './services/auth.service';
import { useAuthStore } from '../../store/useAuthStore';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);

    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (data) => {
            login(data);
            message.success('Đăng nhập thành công!');
            navigate('/');
        },
        onError: (error: any) => {
            message.error(error?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        }
    });

    const onFinish = (values: any) => {
        loginMutation.mutate({ username: values.email, password: values.password }); // Assuming username field is used for email/username
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Left side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-8 md:p-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Chào mừng trở lại! 👋</h1>
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

            {/* Right side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2000" 
                    alt="Travel" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-16 left-16 right-16 z-20 text-white">
                    <h2 className="text-4xl font-bold mb-4">Khám phá thế giới cùng chúng tôi</h2>
                    <p className="text-lg text-slate-200 line-clamp-3">
                        Tham gia cộng đồng hơn 10,000+ thành viên để nhận ngay những ưu đãi độc quyền lên đến 50% cho chuyến đi tiếp theo của bạn.
                    </p>
                </div>
            </div>
        </div>
    );
};
