import React, { useMemo } from 'react';
import { DateRange, type RangeKeyDict } from 'react-date-range';
import { vi } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays, format, isBefore, startOfDay } from 'date-fns';
import { useRoomAvailability } from '../queries/useRoomAvailability';

interface RoomBookingCalendarProps {
    roomId: string;
    onDateSelect: (startDate: Date, endDate: Date) => void;
    selectionRange: { startDate: Date; endDate: Date; key: string };
    setSelectionRange: (range: any) => void;
}

export const RoomBookingCalendar: React.FC<RoomBookingCalendarProps> = ({ roomId, onDateSelect, selectionRange, setSelectionRange }) => {
    const startDateStr = format(new Date(), 'yyyy-MM-dd');
    const endDateStr = format(addDays(new Date(), 60), 'yyyy-MM-dd');

    const { data: availability, isLoading } = useRoomAvailability(roomId, startDateStr, endDateStr);

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

    const handleSelect = (ranges: RangeKeyDict) => {
        const { selection } = ranges;
        setSelectionRange(selection);
        if (selection.startDate && selection.endDate && selection.startDate !== selection.endDate) {
            // Check if any date in between is fully booked
            let isInvalid = false;
            let current = new Date(selection.startDate);
            while (current < selection.endDate) {
                if (fullyBookedDates.has(format(current, 'yyyy-MM-dd'))) {
                    isInvalid = true;
                    break;
                }
                current = addDays(current, 1);
            }

            if (isInvalid) {
                alert('Có ngày trong khoảng thời gian bạn chọn đã hết phòng. Vui lòng chọn lại!');
                setSelectionRange({
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection'
                });
                return;
            }

            onDateSelect(selection.startDate, selection.endDate);
        }
    };

    const customDayContent = (day: Date) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const isPast = isBefore(day, startOfDay(new Date()));
        const isBooked = fullyBookedDates.has(dateStr);
        const isDisabled = isPast || isBooked;

        return (
            <div className={`relative w-full h-full flex items-center justify-center ${isDisabled ? 'text-slate-300' : 'text-slate-700'}`}>
                <span>{format(day, 'd')}</span>
                {isBooked && !isPast && (
                    <div className="absolute bottom-1 w-full flex justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-4 w-full flex flex-col items-center">
            {isLoading && <div className="text-sm text-slate-500 mb-2">Đang tải trạng thái phòng...</div>}

            <div className="w-full max-w-full overflow-x-auto custom-scrollbar flex justify-center">
                <DateRange
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 60)}
                    months={1}
                    direction="horizontal"
                    locale={vi}
                    showDateDisplay={false}
                    showMonthAndYearPickers={false}
                    dayContentRenderer={customDayContent}
                    rangeColors={['#0284c7']} // Primary 600
                    disabledDates={Array.from(fullyBookedDates).map(d => new Date(d))}
                />
            </div>

            <div className="mt-4 flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-white border border-slate-300 rounded-full"></div>
                    <span className="text-slate-600">Phòng trống</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-slate-600">Hết phòng</span>
                </div>
            </div>
        </div>
    );
};
