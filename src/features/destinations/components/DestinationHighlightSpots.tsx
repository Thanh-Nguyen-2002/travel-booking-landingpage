import React from 'react';
import { Map } from 'lucide-react';
import { FallbackImage } from '../../../components/common/FallbackImage';

export interface HighlightSpot {
    name?: string;
    image?: string;
    short_desc?: string;
}

interface DestinationHighlightSpotsProps {
    highlightSpots: HighlightSpot[];
}

export const DestinationHighlightSpots: React.FC<DestinationHighlightSpotsProps> = ({ highlightSpots }) => {
    if (highlightSpots.length === 0) return null;

    return (
        <div className="bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Map className="text-primary-500" /> Điểm đến không thể bỏ lỡ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlightSpots.map((spot, idx) => (
                    <div key={idx} className="group relative rounded-lg overflow-hidden aspect-video cursor-pointer">
                        <FallbackImage
                            src={spot.image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800'}
                            alt={spot.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                            <h3 className="text-white font-bold text-lg">{spot.name}</h3>
                            {spot.short_desc && <p className="text-white/80 text-sm line-clamp-1">{spot.short_desc}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
