import { Pagination } from 'antd';
import { MapPin, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FallbackImage } from '../../components/common/FallbackImage';
import { DestinationCardSkeleton } from '../../components/common/skeletons';
import { useDebounce } from '../../hooks/useDebounce';
import { useDestinations } from './queries/useDestinations';
import { ASSETS } from '../../config/assets';


export const DestinationsPage: React.FC = () => {
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 500);

    // Fetch destinations with pagination (12 items per page)
    const { data: pageData, isLoading, isError } = useDestinations(page, 12, debouncedSearch);

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Header */}
            <div className="relative bg-slate-900 py-32 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${ASSETS.IMAGES.HERO_DESTINATIONS})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 z-10"></div>

                <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-bold rounded-full mb-4 border border-primary-500/30 uppercase tracking-widest">
                        Điểm Đến Tuyệt Đẹp
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">
                        Khám Phá Điểm Đến
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-medium leading-relaxed drop-shadow-sm">
                        Từ những bãi biển hoang sơ đến những thành phố sôi động, hãy để chúng tôi dẫn lối cho chuyến đi tiếp theo của bạn.
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
                            setPage(0); // Reset page on search
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
                                <Link
                                    key={dest.id}
                                    to={`/destinations/${dest.id}`}
                                    className="group block bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <FallbackImage
                                            src={dest.coverImage || 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000'}
                                            alt={dest.name}
                                            className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                                        <div className="absolute bottom-6 left-6 right-6 text-white">
                                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-300 transition-colors duration-300">{dest.name}</h3>
                                            <div className="flex items-center gap-2 text-slate-200 text-sm">
                                                <MapPin size={16} />
                                                <span>{dest.address || 'Đang cập nhật'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed mb-4">
                                            {dest.description || 'Chưa có mô tả chi tiết cho điểm đến này.'}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {dest.activities?.split(',').slice(0, 3).map((act, index) => (
                                                <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium">
                                                    {act.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
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
