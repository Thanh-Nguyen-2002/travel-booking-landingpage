import { Input, Pagination } from 'antd';
import { Calendar, Compass, MapPin, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FallbackImage } from '../../components/common/FallbackImage';
import { PackageCardSkeleton } from '../../components/common/skeletons';
import { getCoverImage } from '../../utils/image';
import { usePackages } from './queries/usePackages';
import { ASSETS } from '../../config/assets';


export const PackagesPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);

    const { data: pageData, isLoading, isError } = usePackages(page, 12, search);

    const packages = pageData?.data || [];

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Banner Section */}
            <div className="relative bg-slate-900 text-white py-24 overflow-hidden mb-12">
                <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${ASSETS.IMAGES.HERO_PACKAGES})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-10"></div>
                <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-bold rounded-full mb-4 border border-primary-500/30 uppercase tracking-widest">Hành trình Tour</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-display text-white">Khám Phá Các Tour Du Lịch</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">Trải nghiệm những địa điểm đẹp nhất cùng gia đình và bạn bè qua các hành trình được thiết kế chi tiết.</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                {/* Search Bar */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="w-full md:w-1/3">
                        <Input
                            size="large"
                            placeholder="Tìm kiếm tour..."
                            prefix={<Search className="text-slate-400 mr-2" size={18} />}
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                            className="rounded-xl py-2.5"
                        />
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                        Hiển thị <span className="font-bold text-slate-800">{packages.length}</span> tour du lịch
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <PackageCardSkeleton key={index} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-24 bg-white rounded-xl border border-slate-100">
                        <Compass className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Đã xảy ra lỗi khi lấy danh sách</h3>
                        <p className="text-slate-500">Vui lòng thử lại sau.</p>
                    </div>
                ) : packages.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-xl border border-slate-100">
                        <Compass className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy tour phù hợp</h3>
                        <p className="text-slate-500">Vui lòng thay đổi từ khóa tìm kiếm của bạn.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {packages.map((pkg) => {
                                const mainImage = getCoverImage(pkg.images, ASSETS.IMAGES.HERO_PACKAGES);
                                const hasPromotion = pkg.promotionalPrice && pkg.promotionalPrice < pkg.price;

                                return (
                                    <Link
                                        key={pkg.id}
                                        to={`/packages/${pkg.id}`}
                                        className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 h-full"
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
                            })}
                        </div>


                        {pageData && pageData.totalPages > 1 && (
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
