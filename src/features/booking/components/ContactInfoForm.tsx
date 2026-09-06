import React from 'react';
import { Form, Input } from 'antd';
import { User, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContactInfoFormProps {
    isAuthenticated: boolean;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ isAuthenticated }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Thông tin liên hệ</h2>

            {!isAuthenticated && (
                <div className="bg-primary-50 text-primary-700 p-4 rounded-xl mb-8 flex items-center justify-between border border-primary-100">
                    <div className="flex items-center gap-3">
                        <User size={20} className="text-primary-600" />
                        <span className="font-medium">Bạn đã có tài khoản? Đăng nhập để thanh toán nhanh hơn.</span>
                    </div>
                    <Link
                        to="/login"
                        className="px-4 py-1.5 bg-white text-primary-600 font-bold rounded-lg shadow-sm border border-primary-100 hover:bg-primary-600 hover:text-white transition-colors"
                    >
                        Đăng nhập
                    </Link>
                </div>
            )}

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
        </div>
    );
};
