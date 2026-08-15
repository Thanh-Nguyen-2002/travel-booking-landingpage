import React from 'react';
import { useSettings } from '../../hooks/useSettings';

export const PrivacyPage: React.FC = () => {
    const { data: settings } = useSettings();
    const privacyContent = settings?.privacyPolicy;

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Chính sách bảo mật</h1>
                    <p className="text-slate-300">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                    {privacyContent ? (
                        <div 
                            className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-500"
                            dangerouslySetInnerHTML={{ __html: privacyContent }} 
                        />
                    ) : (
                        <div className="text-center py-12 text-slate-500">
                            <p className="text-lg">Nội dung chính sách bảo mật đang được cập nhật...</p>
                            <p className="text-sm mt-2">Vui lòng cấu hình trường "privacyPolicy" trong CMS Settings dưới dạng HTML.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
