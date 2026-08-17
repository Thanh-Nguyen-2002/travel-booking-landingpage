import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export const SuccessStep: React.FC = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Đặt phòng thành công!</h2>
            <p className="text-slate-500 mb-8 max-w-md text-center">
                Mã đặt chỗ của bạn đã được gửi qua email. Vui lòng kiểm tra hộp thư để xem chi tiết.
            </p>
            <Link to="/" className="px-8 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg shadow-slate-900/20">
                Về Trang Chủ
            </Link>
        </div>
    );
};
