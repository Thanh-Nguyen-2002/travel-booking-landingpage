import React, { useState, useMemo } from 'react';
import { Modal, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useRoomAvailability } from '../queries/useRoomAvailability';

const { RangePicker } = DatePicker;

interface RoomBookingModalProps {
    open: boolean;
    onClose: () => void;
    roomId: string;
    roomName: string;
    onConfirm: (dates: [Dayjs, Dayjs]) => void;
}

export const RoomBookingModal: React.FC<RoomBookingModalProps> = ({ open, onClose, roomId, roomName, onConfirm }) => {
    const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);

    // Fetch availability for the next 2 months
    const startDate = dayjs().format('YYYY-MM-DD');
    const endDate = dayjs().add(2, 'month').format('YYYY-MM-DD');

    const { data: availability, isLoading } = useRoomAvailability(open ? roomId : '', startDate, endDate);

    // Create a Set of full dates (YYYY-MM-DD) for O(1) lookup
    const fullyBookedDates = useMemo(() => {
        if (!availability) return new Set<string>();
        const booked = new Set<string>();
        availability.forEach((a) => {
            if (a.totalQuantity <= a.bookedQuantity) {
                booked.add(a.targetDate);
            }
        });
        return booked;
    }, [availability]);

    const disabledDate = (current: Dayjs) => {
        // Can not select days before today or today
        if (current && current < dayjs().startOf('day')) {
            return true;
        }
        // Disable if fully booked
        const dateStr = current.format('YYYY-MM-DD');
        if (fullyBookedDates.has(dateStr)) {
            return true;
        }
        return false;
    };

    const handleConfirm = () => {
        if (dates && dates[0] && dates[1]) {
            // Also need to check if any date IN BETWEEN check-in and check-out is fully booked
            let isInvalid = false;
            let current = dates[0].clone();
            while (current.isBefore(dates[1], 'day')) {
                if (fullyBookedDates.has(current.format('YYYY-MM-DD'))) {
                    isInvalid = true;
                    break;
                }
                current = current.add(1, 'day');
            }

            if (isInvalid) {
                alert('Có ngày trong khoảng thời gian bạn chọn đã hết phòng. Vui lòng chọn lại!');
                return;
            }

            onConfirm(dates);
        }
    };

    return (
        <Modal
            title={`Chọn ngày đặt phòng - ${roomName}`}
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Hủy
                </Button>,
                <Button 
                    key="submit" 
                    type="primary" 
                    disabled={!dates || !dates[0] || !dates[1]}
                    onClick={handleConfirm}
                    className="bg-primary-600"
                >
                    Xác nhận
                </Button>,
            ]}
        >
            <div className="py-6">
                <p className="mb-4 text-slate-600">Vui lòng chọn ngày nhận phòng (Check-in) và ngày trả phòng (Check-out):</p>
                <RangePicker
                    className="w-full"
                    size="large"
                    disabledDate={disabledDate}
                    onChange={(val) => setDates(val as [Dayjs, Dayjs])}
                    placeholder={['Ngày nhận phòng', 'Ngày trả phòng']}
                />
                {isLoading && <div className="text-sm text-slate-500 mt-2">Đang tải trạng thái phòng...</div>}
                
                <div className="mt-6 flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-white border border-slate-300 rounded"></div>
                        <span className="text-slate-600">Phòng trống</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-slate-200 border border-slate-300 rounded"></div>
                        <span className="text-slate-600">Hết phòng / Không chọn được</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
