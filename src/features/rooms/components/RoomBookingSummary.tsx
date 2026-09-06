import React from 'react';
import { format, differenceInDays } from 'date-fns';
import type { RoomResponse } from '../../../types/room';

interface RoomBookingSummaryProps {
    room: RoomResponse;
    selectionRange: {
        startDate: Date;
        endDate: Date;
        key: string;
    };
    onConfirmBooking: () => void;
}

export const RoomBookingSummary: React.FC<RoomBookingSummaryProps> = ({ room, selectionRange, onConfirmBooking }) => {
    const nights = (selectionRange.startDate && selectionRange.endDate)
        ? Math.max(1, differenceInDays(selectionRange.endDate, selectionRange.startDate))
        : 1;

    const totalPrice = room.price * nights;
    const isDisabled = !selectionRange.startDate || !selectionRange.endDate || room.quantity === 0 || room.status !== 'ACTIVE';

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100 sticky top-24">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Tóm tắt đặt phòng</h3>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-500">Nhận phòng</span>
                    <span className="font-bold text-slate-800">
                        {selectionRange.startDate ? format(selectionRange.startDate, 'dd/MM/yyyy') : '-'}
                    </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-500">Trả phòng</span>
                    <span className="font-bold text-slate-800">
                        {selectionRange.endDate ? format(selectionRange.endDate, 'dd/MM/yyyy') : '-'}
                    </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-500">Thời gian</span>
                    <span className="font-bold text-slate-800">{nights} ngày</span>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-4 mb-6">
                <div className="flex justify-between items-center mb-1 text-slate-500 text-sm">
                    <span>Đơn giá</span>
                    <span>{room.price.toLocaleString()}đ / ngày</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-primary-600">
                    <span>Tổng tiền</span>
                    <span>{totalPrice.toLocaleString()}đ</span>
                </div>
            </div>

            <button
                disabled={isDisabled}
                onClick={onConfirmBooking}
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold hover:cursor-pointer rounded-xl shadow-[0_8px_20px_rgb(14,165,233,0.3)] disabled:shadow-none transition-all text-lg"
            >
                {room.quantity === 0 || room.status !== 'ACTIVE' ? 'Hết phòng' : 'Tiếp tục đặt phòng'}
            </button>
        </div>
    );
};
