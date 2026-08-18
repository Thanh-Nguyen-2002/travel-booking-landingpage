import React from 'react';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { useHotels } from '../../hotels/queries/useHotels';
import { Link } from 'react-router-dom';
import { FallbackImage } from '../../../components/common/FallbackImage';
import { getCoverImage } from '../../../utils/image';
import { HotelCardSkeleton } from '../../../components/common/skeletons';


export const HotelsSection: React.FC = () => {
    const { data: pageData, isLoading, isError } = useHotels(0, 6);

    if (isLoading) {
        return (
            <section className="py-24 relative overflow-hidden bg-white">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-800 mb-4">Khách sạn yêu thích</h2>
                            <p className="text-lg text-slate-600 max-w-2xl">Những lựa chọn lưu trú hàng đầu được đánh giá cao bởi cộng đồng du khách của chúng tôi.</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-primary-600 font-semibold opacity-50">
                            Xem tất cả <ArrowRight size={20} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <HotelCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !pageData?.data) {
        return null;
    }

    const hotels = pageData.data;

    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Khách sạn yêu thích</h2>
                        <p className="text-lg text-slate-600 max-w-2xl">Những lựa chọn lưu trú hàng đầu được đánh giá cao bởi cộng đồng du khách của chúng tôi.</p>
                    </div>
                    <Link to="/hotels" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                        Xem tất cả <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hotels.map((hotel) => {
                        const coverImage = getCoverImage(hotel.images, 'https://images.unsplash.com/photo-1566073171589-236237eff6dd?q=80&w=2000');

                        return (
                            <Link
                                key={hotel.id}
                                to={`/hotels/${hotel.id}`}
                                className="group block bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative h-56 overflow-hidden shrink-0">
                                    <FallbackImage
                                        src={coverImage}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>

                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-[6px] flex items-center gap-1 shadow-sm">
                                        <Star size={14} className="text-amber-500 fill-amber-500" />
                                        <span className="font-bold text-slate-800 text-sm">{hotel.rating || 5.0}</span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col grow">
                                    <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-1">{hotel.name}</h3>

                                    <div className="flex items-start gap-2 text-slate-500 text-sm mb-4 line-clamp-2">
                                        <MapPin size={16} className="shrink-0 mt-0.5" />
                                        <span>{hotel.address || 'Đang cập nhật'}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {hotel.amenities?.slice(0, 3).map((amenity) => (
                                            <span key={amenity.id} className="px-2.5 py-2 bg-slate-50 text-slate-600 text-xs rounded-[6px] font-medium border border-slate-100">
                                                {amenity.name}
                                            </span>
                                        ))}
                                        {hotel.amenities && hotel.amenities.length > 3 && (
                                            <span className="px-2.5 py-2 bg-slate-50 text-slate-500 text-xs rounded-[6px] font-medium border border-slate-100">
                                                +{hotel.amenities.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-slate-500 text-sm">Chỉ từ</span>
                                        <div className="text-right">
                                            <span className="text-lg font-bold text-primary-600">{hotel.priceFrom ? hotel.priceFrom.toLocaleString() : 0}đ</span>
                                            <span className="text-slate-500 text-xs ml-1">/ đêm</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/hotels" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                        Xem tất cả khách sạn <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};
