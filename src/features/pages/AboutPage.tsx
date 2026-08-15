import React from 'react';
import { useSettings } from '../../hooks/useSettings';

export const AboutPage: React.FC = () => {
    const { data: settings } = useSettings();
    const siteName = settings?.siteName || 'Travel Booking';
    const aboutUsContent = settings?.aboutUs;

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-20 text-center text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Về {siteName}</h1>
                    <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
                        Hành trình của chúng tôi là mang thế giới đến gần bạn hơn, với những trải nghiệm tuyệt vời và đáng nhớ nhất.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                    {aboutUsContent ? (
                        <div 
                            className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-500"
                            dangerouslySetInnerHTML={{ __html: aboutUsContent }} 
                        />
                    ) : (
                        <div className="text-center py-12 text-slate-500">
                            <p className="text-lg">Nội dung giới thiệu đang được cập nhật...</p>
                            <p className="text-sm mt-2">Vui lòng cấu hình trường "aboutUs" trong CMS Settings dưới dạng HTML.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
