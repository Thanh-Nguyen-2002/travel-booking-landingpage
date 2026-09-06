import { Pagination } from 'antd';
import { MapPin, Search, Star } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FallbackImage } from '../../components/common/FallbackImage';
import { HotelCardSkeleton } from '../../components/common/skeletons';
import { useDebounce } from '../../hooks/useDebounce';
import { getCoverImage } from '../../utils/image';
import { useHotels } from './queries/useHotels';
import { useBanners } from '../home/queries/useBanners';
import { ASSETS } from '../../config/assets';


export const HotelsPage: React.FC = () => {
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data: pageData, isLoading, isError } = useHotels(page, 12, debouncedSearch);

    const { data: banners } = useBanners('HOTEL_HEADER');
    const banner = banners && banners.length > 0 ? banners[0] : null;

    const bannerUrl = banner?.imageUrl || ASSETS.IMAGES.HERO_HOTELS;
    const bannerTitle = banner?.title || 'Danh Sách Khách Sạn';
    const bannerDesc = banner?.description || 'Khám phá hàng ngàn khách sạn, resort đẳng cấp với mức giá ưu đãi nhất cho chuyến đi của bạn.';

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Header */}
            <div className="relative bg-slate-900 py-32 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-1000" style={{ backgroundImage: `url(${bannerUrl})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 z-10"></div>

                <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-bold rounded-full mb-4 border border-primary-500/30 uppercase tracking-widest">
                        Khách Sạn & Lưu Trú
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm transition-all duration-500">
                        {bannerTitle}
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-medium leading-relaxed drop-shadow-sm transition-all duration-500">
                        {bannerDesc}
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
                {/* Search Bar */}
                <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-4 mb-12 max-w-2xl mx-auto flex items-center gap-3">
                    <Search className="text-slate-400 shrink-0 ml-2" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm khách sạn (ví dụ: Vinpearl, InterContinental...)"
                        className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(0); // Reset page on search
                        }}
                    />
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <HotelCardSkeleton key={index} />
                        ))}
                    </div>
                ) : isError || !pageData?.data || pageData.data.length === 0 ? (
                    <div className="py-24 text-center bg-white rounded-xl shadow-sm border border-slate-100">
                        <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-700 mb-2">Không tìm thấy kết quả</h3>
                        <p className="text-slate-500">Rất tiếc, chúng tôi không tìm thấy khách sạn nào phù hợp với tìm kiếm của bạn.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {pageData.data.map((hotel) => {
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

                                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-[6px] flex items-center gap-1 shadow-sm">
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
                                                    <span key={amenity.id} className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs rounded-lg font-medium border border-slate-100">
                                                        {amenity.name}
                                                    </span>
                                                ))}
                                                {hotel.amenities && hotel.amenities.length > 3 && (
                                                    <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-xs rounded-lg font-medium border border-slate-100">
                                                        +{hotel.amenities.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                                <span className="text-slate-500 text-sm">Chỉ từ</span>
                                                <div className="text-right">
                                                    <span className="text-lg font-bold text-primary-600">{hotel.priceFrom ? hotel.priceFrom.toLocaleString() : 0}đ</span>
                                                    <span className="text-slate-500 text-xs ml-1">/ ngày</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {pageData.totalPages > 1 && (
                            <div className="flex justify-center mt-12">
                                <Pagination
                                    current={page + 1}
                                    total={pageData.totalElements}
                                    pageSize={12}
                                    onChange={(newPage) => {
                                        setPage(newPage - 1);
                                        window.scrollTo(0, 0);
                                    }}
                                    showSizeChanger={false}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
