import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { FallbackImage } from '../../../components/common/FallbackImage';
import type { DestinationResponse } from '../../../types/destination';

interface DestinationCardProps {
    destination: DestinationResponse;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
    return (
        <Link
            to={`/destinations/${destination.id}`}
            className="group block bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
        >
            <div className="relative h-64 overflow-hidden">
                <FallbackImage
                    src={destination.coverImage || 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000'}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-300 transition-colors duration-300">{destination.name}</h3>
                    <div className="flex items-center gap-2 text-slate-200 text-sm">
                        <MapPin size={16} />
                        <span>{destination.address || 'Đang cập nhật'}</span>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed mb-4">
                    {destination.description || 'Chưa có mô tả chi tiết cho điểm đến này.'}
                </p>
                <div className="flex flex-wrap gap-2">
                    {destination.activities?.split(',').slice(0, 3).map((act, index) => (
                        <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium">
                            {act.trim()}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};
