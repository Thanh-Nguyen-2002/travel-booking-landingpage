import React from 'react';
import { DatePicker, InputNumber, Button, Divider } from 'antd';
import { Users, ShieldCheck } from 'lucide-react';
import dayjs from 'dayjs';
import type { PackageResponse } from '../../../types/package';

interface PackageBookingSidebarProps {
    pkg: PackageResponse;
    activePrice: number;
    hasPromotion: boolean;
    checkIn: string;
    setCheckIn: (dateStr: string) => void;
    guests: number;
    setGuests: (val: number) => void;
    handleBookNow: () => void;
}

export const PackageBookingSidebar: React.FC<PackageBookingSidebarProps> = ({
    pkg,
    activePrice,
    hasPromotion,
    setCheckIn,
    guests,
    setGuests,
    handleBookNow,
}) => {
    return (
        <div className="bg-white rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 sticky top-24">
            <div className="mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Giá vé từ</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-rose-500">
                        {activePrice.toLocaleString()}đ
                    </span>
                    <span className="text-sm text-slate-500 font-medium">/khách</span>
                    {hasPromotion && (
                        <span className="text-sm text-slate-400 line-through ml-2">
                            {pkg.price.toLocaleString()}đ
                        </span>
                    )}
                </div>
            </div>

            <Divider className="my-4" />

            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ngày khởi hành</label>
                    <DatePicker
                        className="w-full rounded-xl py-2.5"
                        size="large"
                        disabledDate={(current) => current && current < dayjs().startOf('day')}
                        onChange={(date) => setCheckIn(date ? date.format('YYYY-MM-DD') : '')}
                        placeholder="Chọn ngày đi"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Số lượng khách</label>
                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                        <span className="text-slate-600 font-medium flex items-center gap-2">
                            <Users size={16} /> Số khách
                        </span>
                        <InputNumber
                            min={1}
                            max={20}
                            value={guests}
                            onChange={(val) => setGuests(val || 1)}
                            size="large"
                            className="w-24 rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Real-time total calculation */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100/50">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Giá vé tạm tính</span>
                    <span>{activePrice.toLocaleString()}đ x {guests}</span>
                </div>
                <Divider className="my-2 border-slate-200" />
                <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-slate-800">Tổng cộng tạm tính</span>
                    <span className="text-2xl font-extrabold text-primary-600">
                        {(activePrice * guests).toLocaleString()}đ
                    </span>
                </div>
            </div>

            <Button
                type="primary"
                size="large"
                onClick={handleBookNow}
                className="w-full bg-primary-600 hover:!bg-primary-700 h-14 text-base font-bold rounded-xl shadow-lg shadow-primary-500/20"
            >
                Đặt Tour Ngay
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-semibold">
                <ShieldCheck size={14} className="text-emerald-500" /> Bảo mật thông tin & thanh toán an toàn
            </div>
        </div>
    );
};
