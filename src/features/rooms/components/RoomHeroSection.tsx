import React from 'react';
import { Bed, Users, Check } from 'lucide-react';
import { FallbackImage } from '../../../components/common/FallbackImage';
import type { RoomResponse } from '../../../types/room';

interface RoomHeroSectionProps {
    room: RoomResponse;
    roomCover: string;
}

export const RoomHeroSection: React.FC<RoomHeroSectionProps> = ({ room, roomCover }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/2 h-80 lg:h-auto rounded-xl overflow-hidden relative">
                    <FallbackImage src={roomCover} alt={room.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-bold text-slate-800 shadow-sm">
                        {room.size} m²
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col">
                    <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">{room.name}</h1>

                    <div className="flex flex-wrap gap-4 text-slate-600 mb-6">
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg">
                            <Bed size={18} className="text-primary-600" />
                            <span className="font-medium">{room.bedType}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg">
                            <Users size={18} className="text-primary-600" />
                            <span className="font-medium">Tối đa {room.capacity} người</span>
                        </div>
                    </div>

                    <div className="mb-8 flex-grow">
                        <h3 className="text-lg font-bold text-slate-800 mb-3">Tiện nghi phòng</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {room.amenities?.map((am: any) => (
                                <div key={am.id} className="flex items-center gap-2 text-slate-600">
                                    <Check size={16} className="text-green-500 shrink-0" />
                                    <span>{am.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-end justify-between">
                        <div>
                            <p className="text-slate-500 mb-1">Giá mỗi đêm từ</p>
                            <div className="text-3xl font-black text-primary-600">
                                {room.price.toLocaleString()}đ
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
