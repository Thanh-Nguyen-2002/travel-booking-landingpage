import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import type { HotelResponse } from '../../../types/hotel';

interface HotelGalleryProps {
    hotel: HotelResponse;
}

export const HotelGallery: React.FC<HotelGalleryProps> = ({ hotel }) => {
    const images = hotel.images ? hotel.images.split(',') : [];
    const coverImage = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1566073171589-236237eff6dd?q=80&w=2000';

    return (
        <div className="relative h-[60vh] min-h-[400px] w-full">
            <img src={coverImage} alt={hotel.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30"></div>
            
            <div className="absolute top-8 left-8">
                <Link 
                    to="/hotels" 
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Quay lại</span>
                </Link>
            </div>

            <div className="absolute bottom-12 left-0 right-0">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1 rounded-md text-sm font-bold shadow-md">
                            <Star size={14} className="fill-white" />
                            {hotel.rating || 5.0}
                        </div>
                        <span className="text-white/90 text-sm">Tuyệt vời</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{hotel.name}</h1>
                    <div className="flex items-center gap-2 text-white/90">
                        <MapPin size={20} />
                        <span className="text-lg">{hotel.address}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
