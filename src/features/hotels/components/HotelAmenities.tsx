import React from 'react';
import { Check } from 'lucide-react';
import type { AmenityResponse } from '../../../types/amenity';

interface HotelAmenitiesProps {
    amenities?: AmenityResponse[];
}

export const HotelAmenities: React.FC<HotelAmenitiesProps> = ({ amenities }) => {
    return (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Tiện ích nổi bật</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities?.map((amenity) => (
                    <div key={amenity.id} className="flex items-center gap-3 text-slate-700">
                        <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                            <Check size={16} />
                        </div>
                        <span className="font-medium">{amenity.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
