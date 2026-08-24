import React from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

export const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full text-center space-y-8 flex flex-col items-center">
                
                {/* Custom Illustration */}
                <img 
                    src="/404-illustration.png" 
                    alt="404 Not Found" 
                    className="w-full max-w-sm drop-shadow-md rounded-2xl animate-subtle-zoom"
                />

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                        Ôi không! Lạc đường rồi
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Trang bạn đang tìm kiếm không tồn tại, đã bị gỡ bỏ hoặc bạn đã gõ sai đường dẫn. Hãy để chúng tôi đưa bạn về đúng hướng nhé.
                    </p>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all duration-300 font-medium shadow-sm hover:shadow-md active:scale-[0.98]"
                    >
                        <HomeOutlined />
                        <span>Trang chủ</span>
                    </Link>
                    <Link
                        to="/destinations"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium shadow-sm hover:shadow-md active:scale-[0.98]"
                    >
                        <span>Khám phá điểm đến</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
