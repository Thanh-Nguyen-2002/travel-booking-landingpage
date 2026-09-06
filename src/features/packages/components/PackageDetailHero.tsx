import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { FallbackImage } from '../../../components/common/FallbackImage';
import type { PackageResponse } from '../../../types/package';

interface PackageDetailHeroProps {
    pkg: PackageResponse;
    slideImages: string[];
}

export const PackageDetailHero: React.FC<PackageDetailHeroProps> = ({ pkg, slideImages }) => {
    return (
        <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-100 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 mb-4">
                {pkg.destination?.name && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-lg">
                        <MapPin size={12} /> {pkg.destination.name}
                    </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">
                    <Clock size={12} /> {pkg.duration || 'Liên hệ'}
                </span>
                {pkg.departureLocation && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg">
                        <MapPin size={12} /> Khởi hành: {pkg.departureLocation}
                    </span>
                )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 leading-tight">
                {pkg.name}
            </h1>

            <div className="text-slate-600 whitespace-pre-line mb-4 leading-relaxed">
                {pkg.description || 'Hành trình được chuẩn bị chu đáo mang lại trải nghiệm tuyệt vời cho quý khách.'}
            </div>

            {pkg.videoUrl && (
                <div className="mb-6">
                    <a
                        href={pkg.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors font-bold text-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                        Xem Video Giới Thiệu
                    </a>
                </div>
            )}

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3 h-96 rounded-xl overflow-hidden shadow-sm">
                    <FallbackImage src={slideImages[0]} alt={pkg.name} className="w-full h-full object-cover" />
                </div>
                {slideImages.slice(1, 4).map((img, idx) => (
                    <div key={idx} className="h-32 rounded-xl overflow-hidden shadow-sm">
                        <FallbackImage src={img} alt={`${pkg.name} ${idx + 2}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};
