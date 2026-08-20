import React from 'react';
import { Tabs } from 'antd';
import { useAuthStore } from '../../store/useAuthStore';
import { ProfileInfoForm } from './components/ProfileInfoForm';
import { PasswordChangeForm } from './components/PasswordChangeForm';

export const ProfilePage: React.FC = () => {
    const { user } = useAuthStore();

    if (!user) {
        return <div className="min-h-[50vh] flex items-center justify-center text-lg text-slate-500 font-medium">Vui lòng đăng nhập để xem thông tin</div>;
    }

    const tabItems = [
        {
            key: '1',
            label: <span className="font-medium px-4">Hồ sơ cá nhân</span>,
            children: <ProfileInfoForm />
        },
        {
            key: '2',
            label: <span className="font-medium px-4">Bảo mật</span>,
            children: <PasswordChangeForm />
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Tài khoản của tôi</h1>
                <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden">
                    <Tabs defaultActiveKey="1" items={tabItems} className="custom-profile-tabs px-2 pt-2" />
                </div>
            </div>
        </div>
    );
};
