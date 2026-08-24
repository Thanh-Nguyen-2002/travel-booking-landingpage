import { Bed, Users } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FallbackImage } from '../../../components/common/FallbackImage';
import { RoomCardSkeleton } from '../../../components/common/skeletons';
import { useBookingStore } from '../../../store/useBookingStore';
import type { HotelResponse } from '../../../types/hotel';
import type { RoomResponse } from '../../../types/room';
import { getCoverImage } from '../../../utils/image';
import { RoomBookingCalendar } from './RoomBookingCalendar';
import { format } from 'date-fns';


interface RoomListProps {
    hotel: HotelResponse;
    roomsData?: RoomResponse[];
    isLoadingRooms: boolean;
}

export const RoomList: React.FC<RoomListProps> = ({ hotel, roomsData, isLoadingRooms }) => {
    const navigate = useNavigate();
    const setBookingInfo = useBookingStore((state: any) => state.setBookingInfo);
    
    // Lưu trạng thái mở/đóng lịch cho từng phòng
    const [expandedRoomId, setExpandedRoomId] = React.useState<string | null>(null);
    
    // State lưu ngày đã chọn
    const [selectionRange, setSelectionRange] = React.useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const handleConfirmBooking = (room: RoomResponse) => {
        if (!hotel || !room) return;
        
        const roomCover = getCoverImage(room.images, 'https://images.unsplash.com/photo-1598928506311-c55dd71360fa?q=80&w=1000');
        
        setBookingInfo({
            hotelId: hotel.id,
            hotelName: hotel.name,
            roomId: room.id,
            roomName: room.name,
            price: room.price,
            coverImage: roomCover,
            checkIn: format(selectionRange.startDate, 'yyyy-MM-dd'),
            checkOut: format(selectionRange.endDate, 'yyyy-MM-dd'),
        });
        
        navigate('/checkout');
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Phòng có sẵn</h2>

            {isLoadingRooms ? (
                <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <RoomCardSkeleton key={index} />
                    ))}
                </div>
            ) : !roomsData || roomsData.length === 0 ? (
                <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-slate-100">
                    Hiện chưa có thông tin phòng cho khách sạn này.
                </div>
            ) : (
                <div className="space-y-6">
                    {roomsData.map((room) => {
                        const roomCover = getCoverImage(room.images, 'https://images.unsplash.com/photo-1598928506311-c55dd71360fa?q=80&w=1000');

                        return (
                            <div key={room.id} className="flex flex-col md:flex-row border border-slate-200 rounded-lg overflow-hidden hover:border-primary-300 transition-colors shadow-sm hover:shadow-md">
                                <div className="w-full md:w-1/3 h-48 md:h-auto shrink-0">
                                    <FallbackImage src={roomCover} alt={room.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6 flex flex-col grow">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{room.name}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                                        <div className="flex items-center gap-1.5"><Bed size={16} className="text-slate-400" /> {room.bedType}</div>
                                        <div className="flex items-center gap-1.5"><Users size={16} className="text-slate-400" /> {room.capacity} người</div>
                                        <div className="flex items-center gap-1.5"><span className="text-slate-400 font-medium">Size:</span> {room.size}</div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {room.amenities?.slice(0, 4).map((am: any) => (
                                            <span key={am.id} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-medium">{am.name}</span>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                                        <div>
                                            <div className="text-2xl font-bold text-primary-600">{room.price.toLocaleString()}đ</div>
                                            <div className="text-slate-500 text-sm">/ đêm</div>
                                        </div>
                                        {room.quantity > 0 && room.status === 'ACTIVE' ? (
                                            <button
                                                onClick={() => {
                                                    if (expandedRoomId === room.id) {
                                                        setExpandedRoomId(null);
                                                    } else {
                                                        setExpandedRoomId(room.id);
                                                        setSelectionRange({
                                                            startDate: new Date(),
                                                            endDate: new Date(),
                                                            key: 'selection'
                                                        });
                                                    }
                                                }}
                                                className={`px-6 py-2.5 font-semibold rounded-lg shadow-sm transition-all duration-300 ${expandedRoomId === room.id ? 'bg-slate-200 text-slate-700' : 'bg-slate-900 text-white hover:bg-primary-600 hover:shadow-primary-500/30'}`}
                                            >
                                                {expandedRoomId === room.id ? 'Đóng lịch' : 'Chọn ngày'}
                                            </button>
                                        ) : (
                                            <button
                                                disabled
                                                className="px-6 py-2.5 bg-slate-200 text-slate-500 font-semibold rounded-lg cursor-not-allowed"
                                            >
                                                Hết phòng
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* Calendar Inline Section */}
                                    {expandedRoomId === room.id && (
                                        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-6 items-start">
                                            <div className="w-full md:w-2/3">
                                                <RoomBookingCalendar
                                                    roomId={room.id}
                                                    selectionRange={selectionRange}
                                                    setSelectionRange={setSelectionRange}
                                                    onDateSelect={() => {}}
                                                />
                                            </div>
                                            <div className="w-full md:w-1/3 bg-slate-50 p-5 rounded-xl border border-slate-100">
                                                <h4 className="font-bold text-slate-800 mb-4">Chi tiết đặt phòng</h4>
                                                <div className="space-y-3 mb-6 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-500">Nhận phòng:</span>
                                                        <span className="font-medium text-slate-800">{selectionRange.startDate ? format(selectionRange.startDate, 'dd/MM/yyyy') : '-'}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-500">Trả phòng:</span>
                                                        <span className="font-medium text-slate-800">{selectionRange.endDate ? format(selectionRange.endDate, 'dd/MM/yyyy') : '-'}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    disabled={!selectionRange.startDate || !selectionRange.endDate || format(selectionRange.startDate, 'yyyy-MM-dd') === format(selectionRange.endDate, 'yyyy-MM-dd')}
                                                    onClick={() => handleConfirmBooking(room)}
                                                    className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold rounded-lg shadow-md transition-all"
                                                >
                                                    Xác nhận Đặt phòng
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
