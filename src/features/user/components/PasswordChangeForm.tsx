import React from 'react';
import { Form, Input, Button } from 'antd';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useChangePassword } from '../queries/useChangePassword';

export const PasswordChangeForm: React.FC = () => {
    const [passwordForm] = Form.useForm();
    const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();

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

    return (
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
};
