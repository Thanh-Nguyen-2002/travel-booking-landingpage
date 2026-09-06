import React from 'react';
import { Link } from 'react-router-dom';
import type { DestinationResponse } from '../../../types/destination';

interface DestinationSidebarProps {
    destination: DestinationResponse;
}

export const DestinationSidebar: React.FC<DestinationSidebarProps> = ({ destination }) => {
    return (
        <div className="bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-6 sticky top-24">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Lên kế hoạch chuyến đi?</h3>
            <p className="text-slate-600 mb-6">
                Đặt phòng khách sạn hoặc tìm kiếm Tour du lịch tại <strong className="text-slate-800">{destination.name}</strong> ngay hôm nay để nhận được mức giá tốt nhất.
            </p>

            <div className="space-y-3">
                <Link
                    to={`/hotels?destinationId=${destination.id}`}
                    className="w-full flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-slate-900/20"
                >
                    Tìm Khách sạn
                </Link>
                <Link
                    to="/packages"
                    className="w-full flex justify-center items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 py-3 px-4 rounded-xl font-bold transition-all border border-primary-200"
                >
                    Xem Tour Khám Phá
                </Link>
            </div>
        </div>
    );
};
