import React, { useState } from 'react';
import { Pagination } from 'antd';
import { Compass } from 'lucide-react';
import { PackageCardSkeleton } from '../../components/common/skeletons';
import { usePackages } from './queries/usePackages';
import { useBanners } from '../home/queries/useBanners';
import { ASSETS } from '../../config/assets';
import { PackageHeaderBanner } from './components/PackageHeaderBanner';
import { PackageSearchBar } from './components/PackageSearchBar';
import { PackageCard } from './components/PackageCard';

export const PackagesPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);

    const { data: pageData, isLoading, isError } = usePackages(page, 12, search);

    const packages = pageData?.data || [];

    const { data: banners } = useBanners('PACKAGE_HEADER');
    const banner = banners && banners.length > 0 ? banners[0] : null;

    const bannerUrl = banner?.imageUrl || ASSETS.IMAGES.HERO_PACKAGES;
    const bannerTitle = banner?.title || 'Khám Phá Các Tour Du Lịch';
    const bannerDesc = banner?.description || 'Trải nghiệm những địa điểm đẹp nhất cùng gia đình và bạn bè qua các hành trình được thiết kế chi tiết.';

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Banner Section */}
            <PackageHeaderBanner
                bannerUrl={bannerUrl}
                bannerTitle={bannerTitle}
                bannerDesc={bannerDesc}
            />

            <div className="max-w-6xl mx-auto px-4">
                {/* Search Bar */}
                <PackageSearchBar
                    search={search}
                    onSearchChange={(val) => {
                        setSearch(val);
                        setPage(0);
                    }}
                    totalCount={packages.length}
                />

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
                            {packages.map((pkg) => (
                                <PackageCard key={pkg.id} pkg={pkg} />
                            ))}
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
