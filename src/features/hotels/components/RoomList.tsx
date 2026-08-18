import React from 'react';
import { Loader2, Bed, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../../store/useBookingStore';
import type { RoomResponse } from '../../../types/room';
import type { HotelResponse } from '../../../types/hotel';
import { FallbackImage } from '../../../components/common/FallbackImage';
import { getCoverImage } from '../../../utils/image';

interface RoomListProps {
    hotel: HotelResponse;
    roomsData?: RoomResponse[];
    isLoadingRooms: boolean;
}

export const RoomList: React.FC<RoomListProps> = ({ hotel, roomsData, isLoadingRooms }) => {
    const navigate = useNavigate();
    const setBookingInfo = useBookingStore((state: any) => state.setBookingInfo);

    return (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Phòng có sẵn</h2>

            {isLoadingRooms ? (
                <div className="py-12 flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
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
                                        <button
                                            onClick={() => {
                                                if (!hotel) return;
                                                setBookingInfo({
                                                    hotelId: hotel.id,
                                                    hotelName: hotel.name,
                                                    roomId: room.id,
                                                    roomName: room.name,
                                                    price: room.price,
                                                    coverImage: roomCover
                                                });
                                                navigate('/checkout');
                                            }}
                                            className="px-6 py-2.5 bg-slate-900 hover:bg-primary-600 hover:cursor-pointer text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
                                        >
                                            Đặt ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
