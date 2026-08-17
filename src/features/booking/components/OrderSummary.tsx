import React from 'react';
import { MapPin, Calendar, User } from 'lucide-react';
import { Divider } from 'antd';

interface OrderSummaryProps {
    bookingInfo: {
        hotelName: string;
        roomName: string;
        coverImage?: string;
        checkIn?: string;
        checkOut?: string;
        guests?: number;
        price: number;
    };
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ bookingInfo }) => {
    return (
        <div className="sticky top-24 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden">
            <div className="h-48 overflow-hidden relative">
                <img 
                    src={bookingInfo.coverImage || 'https://images.unsplash.com/photo-1566073171589-236237eff6dd?q=80&w=1000'} 
                    alt={bookingInfo.hotelName} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold line-clamp-2 mb-1">{bookingInfo.hotelName}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-slate-200">
                        <MapPin size={14} /> Việt Nam
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h4 className="font-bold text-slate-800 mb-4">{bookingInfo.roomName}</h4>
                
                <div className="space-y-3 text-sm text-slate-600 mb-6">
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2"><Calendar size={16} className="text-slate-400" /> Nhận phòng</span>
                        <span className="font-medium text-slate-800">{bookingInfo.checkIn || '14:00 - Tự chọn'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2"><Calendar size={16} className="text-slate-400" /> Trả phòng</span>
                        <span className="font-medium text-slate-800">{bookingInfo.checkOut || '12:00 - Tự chọn'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2"><User size={16} className="text-slate-400" /> Khách</span>
                        <span className="font-medium text-slate-800">{bookingInfo.guests || 2} người lớn</span>
                    </div>
                </div>

                <Divider className="my-4" />

                <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Giá phòng (1 đêm)</span>
                    <span className="font-medium">{bookingInfo.price.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between items-center mb-4 text-emerald-600">
                    <span>Thuế & Phí</span>
                    <span>Đã bao gồm</span>
                </div>

                <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-slate-800">Tổng cộng</span>
                    <span className="text-3xl font-bold text-primary-600">{bookingInfo.price.toLocaleString()}đ</span>
                </div>
            </div>
        </div>
    );
};
