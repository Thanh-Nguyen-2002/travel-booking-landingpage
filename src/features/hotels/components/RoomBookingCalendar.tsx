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

    const { fullyBookedDates } = useMemo(() => {
        const booked = new Set<string>();
        const availableMap = new Map<string, number>();

        if (!availability) return { fullyBookedDates: booked, availableDatesMap: availableMap };

        availability.forEach((a) => {
            const remaining = Math.max(0, a.totalQuantity - a.bookedQuantity);
            availableMap.set(a.targetDate, remaining);
            if (remaining <= 0) {
                booked.add(a.targetDate);
            }
        });
        return { fullyBookedDates: booked, availableDatesMap: availableMap };
    }, [availability]);

    const handleSelect = (ranges: RangeKeyDict) => {
        const { selection } = ranges;
        let startDate = selection.startDate;
        let endDate = selection.endDate;

        if (startDate && endDate) {
            // If user clicked a single date (startDate === endDate), default to 1 night stay (endDate = startDate + 1 day)
            if (format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')) {
                endDate = addDays(startDate, 1);
            }

            const updatedRange = { ...selection, startDate, endDate };
            setSelectionRange(updatedRange);

            // Check if any date in between is fully booked
            let isInvalid = false;
            let current = new Date(startDate);
            while (current < endDate) {
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
                    endDate: addDays(new Date(), 1),
                    key: 'selection'
                });
                return;
            }

            onDateSelect(startDate, endDate);
        }
    };

    const customDayContent = (day: Date) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const isPast = isBefore(day, startOfDay(new Date()));
        const isBooked = fullyBookedDates.has(dateStr);
        const isDisabled = isPast || isBooked;

        // const remaining = availableDatesMap.get(dateStr);

        return (
            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all ${isDisabled ? 'text-slate-300' : 'text-slate-700 font-medium hover:text-primary-700'}`}>
                <span>{format(day, 'd')}</span>
                {!isPast && isBooked && (
                    <div className="absolute bottom-1 w-full flex justify-center">
                        <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1 rounded">Hết</span>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full flex flex-col items-center">
            {isLoading && (
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 bg-slate-50 px-4 py-2 rounded-lg">
                    <div className="w-4 h-4 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                    Đang tải lịch phòng...
                </div>
            )}

            <div className="w-full max-w-full overflow-x-auto custom-scrollbar flex justify-center pb-4">
                <style>
                    {`
                    .rdrCalendarWrapper {
                        font-family: inherit;
                        color: #334155;
                        background: transparent;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                    }
                    .rdrMonths {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                    }
                    .rdrMonth {
                        width: 100%;
                        max-width: 420px;
                        padding: 0;
                    }
                    .rdrMonthAndYearWrapper {
                        padding-top: 1rem;
                        height: 60px;
                    }
                    .rdrMonthAndYearPickers {
                        font-weight: 700;
                        font-size: 1.15rem;
                        color: #0f172a;
                    }
                    /* Ẩn chữ tháng nhỏ bị thừa (thg 8 2026) */
                    .rdrMonthName {
                        display: none;
                    }
                    .rdrWeekDays {
                        font-weight: 700;
                        font-size: 0.9rem;
                        color: #475569;
                        padding-bottom: 0.75rem;
                    }
                    .rdrDay {
                        height: 3.5rem;
                    }
                    .rdrDayNumber span {
                        font-size: 1rem;
                        font-weight: 500;
                    }
                    
                    /* Xử lý khoảng cách cho các ô bị vô hiệu hóa (disabled) */
                    .rdrDayDisabled {
                        background-color: #f8fafc !important;
                        border: 6px solid #ffffff !important;
                        border-radius: 14px !important;
                        box-sizing: border-box !important;
                    }
                    
                    /* Tạo khoảng cách (gap) giữa các ô bằng cách thu nhỏ vùng chọn (background) */
                    .rdrStartEdge, 
                    .rdrEndEdge, 
                    .rdrInRange, 
                    .rdrDayStartPreview, 
                    .rdrDayEndPreview, 
                    .rdrDayInPreview {
                        top: 6px !important;
                        bottom: 6px !important;
                        left: 6px !important;
                        right: 6px !important;
                        box-sizing: border-box !important;
                    }

                    /* Bo góc 8px cho vùng chọn màu xanh */
                    .rdrStartEdge {
                        border-top-left-radius: 8px !important;
                        border-bottom-left-radius: 8px !important;
                        border-top-right-radius: 4px !important;
                        border-bottom-right-radius: 4px !important;
                    }
                    .rdrEndEdge {
                        border-top-right-radius: 8px !important;
                        border-bottom-right-radius: 8px !important;
                        border-top-left-radius: 4px !important;
                        border-bottom-left-radius: 4px !important;
                    }
                    .rdrStartEdge.rdrEndEdge {
                        border-radius: 8px !important;
                    }
                    .rdrInRange {
                        border-radius: 4px !important;
                    }
                    
                    /* Bo góc khi hover/preview */
                    .rdrDayStartPreview {
                        border-top-left-radius: 8px !important;
                        border-bottom-left-radius: 8px !important;
                        border-top-right-radius: 4px !important;
                        border-bottom-right-radius: 4px !important;
                    }
                    .rdrDayEndPreview {
                        border-top-right-radius: 8px !important;
                        border-bottom-right-radius: 8px !important;
                        border-top-left-radius: 4px !important;
                        border-bottom-left-radius: 4px !important;
                    }
                    .rdrDayStartPreview.rdrDayEndPreview {
                        border-radius: 8px !important;
                    }
                    .rdrDayInPreview {
                        border-radius: 4px !important;
                        border: none !important;
                        border-top: 1px solid #0284c7 !important;
                        border-bottom: 1px solid #0284c7 !important;
                        background: rgba(2, 132, 199, 0.1) !important;
                    }
                    `}
                </style>
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
                    disabledDates={Array.from(fullyBookedDates).map(d => {
                        const [year, month, day] = d.split('-').map(Number);
                        return new Date(year, month - 1, day);
                    })}
                />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium border-t border-slate-100 pt-6 w-full max-w-lg">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                    <div className="w-3 h-3 bg-white border-2 border-slate-300 rounded-full"></div>
                    <span className="text-slate-700">Phòng trống</span>
                </div>
                <div className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-lg border border-rose-200">
                    <div className="w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                    <span className="text-rose-700">Hết phòng</span>
                </div>
                <div className="flex items-center gap-2 bg-sky-50 px-4 py-2 rounded-lg border border-sky-200">
                    <div className="w-3 h-3 bg-sky-600 rounded-full shadow-[0_0_8px_rgba(2,132,199,0.5)]"></div>
                    <span className="text-sky-700">Đang chọn</span>
                </div>
            </div>
        </div>
    );
};
