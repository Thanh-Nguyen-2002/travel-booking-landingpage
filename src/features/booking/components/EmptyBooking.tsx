import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export const EmptyBooking: React.FC = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Chưa có thông tin đặt phòng</h2>
            <p className="text-slate-500 mb-8">Vui lòng chọn khách sạn và phòng trước khi thanh toán.</p>
            <Link to="/hotels" className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors">
                Khám phá Khách sạn
            </Link>
        </div>
    );
};
