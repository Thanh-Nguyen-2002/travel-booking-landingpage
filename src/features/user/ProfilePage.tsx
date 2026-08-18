import React from 'react';
import { Form, Input, Button, Tabs, Avatar, Upload } from 'antd';
import { toast } from 'sonner';
import { User, Lock, Upload as UploadIcon, Mail, Phone, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useUpdateProfile } from './queries/useUpdateProfile';
import { useChangePassword } from './queries/useChangePassword';

export const ProfilePage: React.FC = () => {
    const { user, updateUser } = useAuthStore();
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    
    const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
    const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();

    if (!user) {
        return <div className="min-h-[50vh] flex items-center justify-center text-lg text-slate-500 font-medium">Vui lòng đăng nhập để xem thông tin</div>;
    }

    const onUpdateProfile = (values: any) => {
        updateProfile({ fullName: values.fullName, phone: values.phone }, {
            onSuccess: (data: any) => {
                updateUser({ fullName: data.fullName, phone: data.phone });
                toast.success('Cập nhật thông tin thành công!');
            },
            onError: (err: any) => {
                const msg = err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin!';
                toast.error(msg);
            }
        });
    };

    const onChangePassword = (values: any) => {
        changePassword({
            oldPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword
        }, {
            onSuccess: () => {
                toast.success('Đổi mật khẩu thành công!');
                passwordForm.resetFields();
            },
            onError: (err: any) => {
                const msg = err.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu!';
                toast.error(msg);
            }
        });
    };

    const profileTab = (
        <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <Avatar size={120} src={user.avatar} icon={<User size={60} className="mt-4" />} className="mb-4 bg-primary-100 text-primary-600" />
                    <Upload showUploadList={false}>
                        <Button icon={<UploadIcon size={16} />} className="rounded-xl font-medium">Thay đổi Ảnh đại diện</Button>
                    </Upload>
                    <div className="mt-6 text-center w-full">
                        <div className="text-sm text-slate-500 mb-1">Quyền hạn</div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 font-bold text-xs rounded-full uppercase">
                            <Shield size={12} /> {user.role || 'MEMBER'}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Thông tin cá nhân</h2>
                    <Form form={form} layout="vertical" initialValues={{ fullName: user.fullName, email: user.email, phone: user.phone }} onFinish={onUpdateProfile} requiredMark={false}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item label={<span className="font-medium text-slate-700">Họ và Tên</span>} name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                                <Input size="large" prefix={<User className="text-slate-400 mr-2" size={18} />} className="rounded-xl hover:border-primary-400 focus:border-primary-500 py-2" />
                            </Form.Item>
                            
                            <Form.Item label={<span className="font-medium text-slate-700">Số điện thoại</span>} name="phone">
                                <Input size="large" prefix={<Phone className="text-slate-400 mr-2" size={18} />} className="rounded-xl hover:border-primary-400 focus:border-primary-500 py-2" />
                            </Form.Item>
                        </div>

                        <Form.Item label={<span className="font-medium text-slate-700">Địa chỉ Email</span>} name="email">
                            <Input size="large" prefix={<Mail className="text-slate-400 mr-2" size={18} />} className="rounded-xl bg-slate-50 text-slate-500" disabled />
                        </Form.Item>

                        <Form.Item className="mt-6 mb-0">
                            <Button type="primary" htmlType="submit" size="large" loading={isUpdatingProfile} className="bg-primary-600 hover:!bg-primary-700 border-none rounded-xl font-bold px-8 h-12 shadow-lg shadow-primary-500/30">
                                Lưu Thay Đổi
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );

    const passwordTab = (
        <div className="p-6 md:p-8 max-w-2xl">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Đổi mật khẩu</h2>
            <p className="text-slate-500 mb-8">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác.</p>

            <Form form={passwordForm} layout="vertical" onFinish={onChangePassword} requiredMark={false}>
                <Form.Item label={<span className="font-medium text-slate-700">Mật khẩu hiện tại</span>} name="currentPassword" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}>
                    <Input.Password size="large" prefix={<Lock className="text-slate-400 mr-2" size={18} />} className="rounded-xl hover:border-primary-400 focus:border-primary-500 py-2" />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item label={<span className="font-medium text-slate-700">Mật khẩu mới</span>} name="newPassword" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }, { min: 6, message: 'Mật khẩu phải từ 6 ký tự' }]}>
                        <Input.Password size="large" prefix={<Lock className="text-slate-400 mr-2" size={18} />} className="rounded-xl hover:border-primary-400 focus:border-primary-500 py-2" />
                    </Form.Item>

                    <Form.Item 
                        label={<span className="font-medium text-slate-700">Xác nhận mật khẩu mới</span>} 
                        name="confirmPassword" 
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu' },
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
                        <Input.Password size="large" prefix={<Lock className="text-slate-400 mr-2" size={18} />} className="rounded-xl hover:border-primary-400 focus:border-primary-500 py-2" />
                    </Form.Item>
                </div>

                <Form.Item className="mt-6 mb-0">
                    <Button type="primary" htmlType="submit" size="large" loading={isChangingPassword} className="bg-slate-900 hover:!bg-primary-600 border-none rounded-xl font-bold px-8 h-12 shadow-lg hover:shadow-primary-500/30 transition-all duration-300">
                        Cập Nhật Mật Khẩu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

    const tabItems = [
        { key: '1', label: <span className="font-medium px-4">Hồ sơ cá nhân</span>, children: profileTab },
        { key: '2', label: <span className="font-medium px-4">Bảo mật</span>, children: passwordTab },
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Tài khoản của tôi</h1>
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden">
                    <Tabs defaultActiveKey="1" items={tabItems} className="custom-profile-tabs px-2 pt-2" />
                </div>
            </div>
        </div>
    );
};
