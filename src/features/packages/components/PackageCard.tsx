import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { FallbackImage } from '../../../components/common/FallbackImage';
import { getCoverImage } from '../../../utils/image';
import { ASSETS } from '../../../config/assets';
import type { PackageResponse } from '../../../types/package';

interface PackageCardProps {
    pkg: PackageResponse;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
    const mainImage = getCoverImage(pkg.images, ASSETS.IMAGES.HERO_PACKAGES);
    const hasPromotion = pkg.promotionalPrice && pkg.promotionalPrice < pkg.price;

    return (
        <Link
            to={`/packages/${pkg.id}`}
            className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 h-full hover:shadow-md"
        >
            <div className="relative h-56 overflow-hidden">
                <FallbackImage
                    src={mainImage}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

                {pkg.destination?.name && (
                    <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-2 bg-white/95 backdrop-blur-md text-primary-600 text-xs font-bold rounded-[6px] shadow-sm">
                            <MapPin size={12} /> {pkg.destination.name}
                        </span>
                    </div>
                )}

                <div className="absolute bottom-4 left-4 text-white font-medium text-xs flex items-center gap-1.5 bg-black/35 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    <Calendar size={12} />
                    {pkg.duration || 'Liên hệ'}
                </div>
            </div>

            <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary-600 transition-colors line-clamp-2 mb-3">
                    {pkg.name}
                </h3>

                <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {pkg.description || 'Chưa có mô tả chi tiết cho tour du lịch này.'}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-end justify-between">
                    <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Giá từ</div>
                        <div className="flex items-center gap-2">
                            {hasPromotion ? (
                                <>
                                    <span className="text-xl font-extrabold text-rose-500">
                                        {pkg.promotionalPrice?.toLocaleString()}đ
                                    </span>
                                    <span className="text-xs text-slate-400 line-through">
                                        {pkg.price.toLocaleString()}đ
                                    </span>
                                </>
                            ) : (
                                <span className="text-xl font-extrabold text-primary-600">
                                    {pkg.price.toLocaleString()}đ
                                </span>
                            )}
                        </div>
                    </div>

                    <span className="text-sm font-bold text-primary-600 flex items-center gap-1">
                        Chi tiết →
                    </span>
                </div>
            </div>
        </Link>
    );
};
