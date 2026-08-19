import React from 'react';
import { Check, Phone, Mail } from 'lucide-react';
import type { HotelResponse } from '../../../types/hotel';

interface BookingSidebarProps {
    hotel: HotelResponse;
}

export const BookingSidebar: React.FC<BookingSidebarProps> = ({ hotel }) => {
    return (
        <div className="sticky top-24 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-6">
            <div className="text-slate-500 mb-1">Giá thấp nhất từ</div>
            <div className="text-3xl font-bold text-primary-600 mb-6">{hotel.priceFrom ? hotel.priceFrom.toLocaleString() : 0}đ <span className="text-base font-normal text-slate-500">/ đêm</span></div>

            <hr className="border-slate-100 mb-6" />

            <div className="space-y-4 mb-6 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                    <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Giá hiển thị là giá cuối cùng, không phụ phí.</span>
                </div>
                <div className="flex items-start gap-3">
                    <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Miễn phí hủy phòng (áp dụng cho hầu hết các phòng).</span>
                </div>
                <div className="flex items-start gap-3">
                    <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Đội ngũ hỗ trợ 24/7 trực tuyến.</span>
                </div>
            </div>

            <button className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg shadow-primary-500/30 transition-all duration-300">
                Chọn phòng
            </button>

            {(hotel.contactPhone || hotel.contactEmail) && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-800 mb-3">Thông tin liên hệ</h4>
                    {hotel.contactPhone && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                            <Phone size={14} className="text-primary-600" />
                            <a href={`tel:${hotel.contactPhone}`} className="hover:text-primary-600">{hotel.contactPhone}</a>
                        </div>
                    )}
                    {hotel.contactEmail && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail size={14} className="text-primary-600" />
                            <a href={`mailto:${hotel.contactEmail}`} className="hover:text-primary-600">{hotel.contactEmail}</a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
