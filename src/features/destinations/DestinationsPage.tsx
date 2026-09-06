import React, { useState } from 'react';
import { Pagination } from 'antd';
import { MapPin, Search } from 'lucide-react';
import { DestinationCardSkeleton } from '../../components/common/skeletons';
import { useDebounce } from '../../hooks/useDebounce';
import { useDestinations } from './queries/useDestinations';
import { useBanners } from '../home/queries/useBanners';
import { ASSETS } from '../../config/assets';
import { DestinationCard } from './components/DestinationCard';

export const DestinationsPage: React.FC = () => {
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data: pageData, isLoading, isError } = useDestinations(page, 12, debouncedSearch);

    const { data: banners } = useBanners('DESTINATION_HEADER');
    const banner = banners && banners.length > 0 ? banners[0] : null;

    const bannerUrl = banner?.imageUrl || ASSETS.IMAGES.HERO_DESTINATIONS;
    const bannerTitle = banner?.title || 'Khám Phá Điểm Đến';
    const bannerDesc = banner?.description || 'Từ những bãi biển hoang sơ đến những thành phố sôi động, hãy để chúng tôi dẫn lối cho chuyến đi tiếp theo của bạn.';

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Header */}
            <div className="relative bg-slate-900 py-32 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-1000" style={{ backgroundImage: `url(${bannerUrl})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 z-10"></div>

                <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-bold rounded-full mb-4 border border-primary-500/30 uppercase tracking-widest">
                        Điểm Đến Tuyệt Đẹp
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
                <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-4 mb-12 max-w-2xl mx-auto flex items-center gap-3">
                    <Search className="text-slate-400 shrink-0 ml-2" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm điểm đến (ví dụ: Hà Nội, Đà Nẵng...)"
                        className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(0);
                        }}
                    />
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <DestinationCardSkeleton key={index} />
                        ))}
                    </div>
                ) : isError || !pageData?.data || pageData.data.length === 0 ? (
                    <div className="py-24 text-center bg-white rounded-xl shadow-sm border border-slate-100">
                        <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-700 mb-2">Không tìm thấy kết quả</h3>
                        <p className="text-slate-500">Rất tiếc, chúng tôi không tìm thấy điểm đến nào phù hợp với tìm kiếm của bạn.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {pageData.data.map((dest) => (
                                <DestinationCard key={dest.id} destination={dest} />
                            ))}
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
