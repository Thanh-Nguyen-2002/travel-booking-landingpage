import React from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'sonner';
import { User, Mail, Lock, Phone, UserPlus, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from './services/auth.service';

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: authService.register,
        onSuccess: () => {
            toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/login');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
        }
    });

    const onFinish = (values: any) => {
        const { confirmPassword, ...data } = values;
        registerMutation.mutate(data);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
            {/* Back Button */}
            <Link
                to="/"
                className="absolute top-6 left-6 md:top-8 md:left-8 z-30 flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-xl group"
                title="Về trang chủ"
            >
                <ArrowLeft size={24} />
            </Link>

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-slate-900/60 z-10 backdrop-blur-sm"></div>
                <img
                    src="https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000"
                    alt="Register Travel"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Form Container */}
            <div className="relative z-20 w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-8 md:p-12">
                <div className="mb-8 text-center mt-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Đăng ký tài khoản</h1>
                    <p className="text-slate-500">Điền thông tin bên dưới để tham gia với chúng tôi</p>
                </div>

                <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <Form.Item
                            label={<span className="font-medium text-slate-700">Họ và tên</span>}
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        >
                            <Input
                                size="large"
                                prefix={<User className="text-slate-400 mr-2" size={18} />}
                                placeholder="Họ và tên"
                                className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="font-medium text-slate-700">Tên đăng nhập</span>}
                            name="username"
                            rules={[
                                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                                { min: 4, message: 'Tối thiểu 4 ký tự' }
                            ]}
                        >
                            <Input
                                size="large"
                                prefix={<User className="text-slate-400 mr-2" size={18} />}
                                placeholder="Tên đăng nhập"
                                className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                            />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
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
                                placeholder="Email của bạn"
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
                                placeholder="Số điện thoại"
                                className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500 py-2.5"
                            />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
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

                    <Form.Item className="mb-4 mt-2">
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
    );
};
