import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, PlayCircle } from 'lucide-react';
import { FallbackImage } from '../../../components/common/FallbackImage';
import type { DestinationResponse } from '../../../types/destination';

interface DestinationHeroHeaderProps {
    destination: DestinationResponse;
}

export const DestinationHeroHeader: React.FC<DestinationHeroHeaderProps> = ({ destination }) => {
    return (
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden group">
            <FallbackImage
                src={destination.coverImage || 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000'}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>

            <div className="absolute top-8 left-4 md:left-8 z-20">
                <Link
                    to="/destinations"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg transition-all"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium hidden sm:inline">Trở về</span>
                </Link>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white container mx-auto max-w-6xl z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.name}</h1>
                    <div className="flex items-center gap-2 text-lg text-slate-200">
                        <MapPin size={24} className="text-primary-400" />
                        <span>{destination.address || 'Đang cập nhật địa chỉ'}</span>
                    </div>
                </div>

                {destination.videoUrl && (
                    <a
                        href={destination.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-full font-medium transition-all group/video"
                    >
                        <PlayCircle size={24} className="group-hover/video:scale-110 transition-transform" />
                        Xem Video Giới Thiệu
                    </a>
                )}
            </div>
        </div>
    );
};
