import React from 'react';
import { MapPin, Calendar, User } from 'lucide-react';
import { Divider } from 'antd';
import dayjs from 'dayjs';

interface OrderSummaryProps {
    bookingInfo: {
        hotelName?: string;
        roomName?: string;
        packageName?: string;
        packageId?: string;
        type?: 'room' | 'package';
        coverImage?: string;
        checkIn?: string;
        checkOut?: string;
        guests?: number;
        price: number;
    };
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ bookingInfo }) => {
    const isPackage = bookingInfo.type === 'package';
    const displayName = isPackage ? (bookingInfo.packageName || 'Tour Du Lịch') : (bookingInfo.hotelName || 'Khách sạn');
    const displaySubName = isPackage ? 'Hành trình trọn gói' : (bookingInfo.roomName || 'Loại phòng');

    let numberOfNights = 1;
    if (!isPackage && bookingInfo.checkIn && bookingInfo.checkOut) {
        const checkInDate = dayjs(bookingInfo.checkIn);
        const checkOutDate = dayjs(bookingInfo.checkOut);
        const diff = checkOutDate.diff(checkInDate, 'day');
        if (diff > 0) numberOfNights = diff;
    }

    // For packages, price is per guest, so total = price * guests
    // For rooms, price is per night, so total = price * numberOfNights
    const totalAmount = isPackage
        ? bookingInfo.price * (bookingInfo.guests || 1)
        : bookingInfo.price * numberOfNights;

    return (
        <div className="sticky top-24 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={bookingInfo.coverImage || 'https://images.unsplash.com/photo-1566073171589-236237eff6dd?q=80&w=1000'}
                    alt={displayName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold line-clamp-2 mb-1">{displayName}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-slate-200">
                        <MapPin size={14} /> Việt Nam
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h4 className="font-bold text-slate-800 mb-4">{displaySubName}</h4>

                {isPackage ? (
                    <div className="space-y-3 text-sm text-slate-600 mb-6">
                        <div className="flex justify-between">
                            <span className="flex items-center gap-2"><Calendar size={16} className="text-slate-400" /> Ngày khởi hành</span>
                            <span className="font-medium text-slate-800">{bookingInfo.checkIn || 'Tự chọn'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="flex items-center gap-2"><User size={16} className="text-slate-400" /> Số lượng khách</span>
                            <span className="font-medium text-slate-800">{bookingInfo.guests || 1} khách</span>
                        </div>
                    </div>
                ) : (
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
                )}

                <Divider className="my-4" />

                <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">{isPackage ? 'Giá vé (1 khách)' : 'Giá phòng (1 đêm)'}</span>
                    <span className="font-medium">{bookingInfo.price.toLocaleString()}đ</span>
                </div>
                {isPackage ? (
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600">Số lượng</span>
                        <span className="font-medium">x{bookingInfo.guests || 1} khách</span>
                    </div>
                ) : (
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600">Thời gian lưu trú</span>
                        <span className="font-medium text-primary-600">{numberOfNights} đêm</span>
                    </div>
                )}
                <div className="flex justify-between items-center mb-4 text-emerald-600">
                    <span>Thuế & Phí</span>
                    <span>Đã bao gồm</span>
                </div>

                <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-slate-800">Tổng cộng</span>
                    <span className="text-3xl font-bold text-primary-600">{totalAmount.toLocaleString()}đ</span>
                </div>
            </div>
        </div>
    );
};
