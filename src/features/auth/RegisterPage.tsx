import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { User, Mail, Lock, Phone, UserPlus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from './services/auth.service';

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: authService.register,
        onSuccess: () => {
            message.success('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/login');
        },
        onError: (error: any) => {
            message.error(error?.response?.data?.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
        }
    });

    const onFinish = (values: any) => {
        const { confirmPassword, ...data } = values;
        registerMutation.mutate(data);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Left side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000" 
                    alt="Register Travel" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-16 left-16 right-16 z-20 text-white">
                    <h2 className="text-4xl font-bold mb-4">Bắt đầu hành trình mới</h2>
                    <p className="text-lg text-slate-200 line-clamp-3">
                        Tạo tài khoản ngay hôm nay để quản lý các chuyến đi của bạn dễ dàng hơn bao giờ hết.
                    </p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-8 md:p-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Đăng ký tài khoản</h1>
                        <p className="text-slate-500">Điền thông tin bên dưới để tham gia với chúng tôi</p>
                    </div>

                    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                        <Form.Item 
                            label={<span className="font-medium text-slate-700">Họ và tên</span>}
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        >
                            <Input 
                                size="large" 
                                prefix={<User className="text-slate-400 mr-2" size={18} />} 
                                placeholder="Nhập họ và tên"
                                className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                            />
                        </Form.Item>

                        <Form.Item 
                            label={<span className="font-medium text-slate-700">Tên đăng nhập</span>}
                            name="username"
                            rules={[
                                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                                { min: 4, message: 'Tên đăng nhập phải có ít nhất 4 ký tự' }
                            ]}
                        >
                            <Input 
                                size="large" 
                                prefix={<User className="text-slate-400 mr-2" size={18} />} 
                                placeholder="Nhập tên đăng nhập"
                                className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                            />
                        </Form.Item>

                        <Form.Item 
                            label={<span className="font-medium text-slate-700">Email</span>}
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input 
                                size="large" 
                                prefix={<Mail className="text-slate-400 mr-2" size={18} />} 
                                placeholder="Nhập email của bạn"
                                className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                            />
                        </Form.Item>

                        <Form.Item 
                            label={<span className="font-medium text-slate-700">Số điện thoại (Tùy chọn)</span>}
                            name="phone"
                        >
                            <Input 
                                size="large" 
                                prefix={<Phone className="text-slate-400 mr-2" size={18} />} 
                                placeholder="Nhập số điện thoại"
                                className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                            />
                        </Form.Item>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item 
                                label={<span className="font-medium text-slate-700">Mật khẩu</span>}
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }, { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }]}
                            >
                                <Input.Password 
                                    size="large"
                                    prefix={<Lock className="text-slate-400 mr-2" size={18} />}
                                    placeholder="Mật khẩu"
                                    className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                                />
                            </Form.Item>

                            <Form.Item 
                                label={<span className="font-medium text-slate-700">Nhập lại</span>}
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
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
                                    placeholder="Xác nhận"
                                    className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                                />
                            </Form.Item>
                        </div>

                        <Form.Item className="mb-6 mt-2">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large"
                                loading={registerMutation.isPending}
                                className="w-full bg-slate-900 hover:!bg-primary-600 border-none rounded-xl h-12 text-base font-bold shadow-lg shadow-slate-900/20 hover:!shadow-primary-600/30 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {!registerMutation.isPending && <UserPlus size={20} />}
                                Đăng ký
                            </Button>
                        </Form.Item>

                        <div className="text-center">
                            <span className="text-slate-500">Đã có tài khoản? </span>
                            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
                                Đăng nhập ngay <ArrowRight size={16} />
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};
