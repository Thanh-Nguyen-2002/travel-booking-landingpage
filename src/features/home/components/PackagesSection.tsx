import React from 'react';
import { Clock, Tag, ArrowRight, Loader2 } from 'lucide-react';
import { usePackages } from '../../packages/queries/usePackages';
import { Link } from 'react-router-dom';
import { FallbackImage } from '../../../components/common/FallbackImage';
import { getCoverImage } from '../../../utils/image';

export const PackagesSection: React.FC = () => {
    // Fetch 3 hot packages for the home page
    const { data: pageData, isLoading, isError } = usePackages(0, 3);

    if (isLoading) {
        return (
            <div className="py-24 flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    if (isError || !pageData?.data || pageData.data.length === 0) {
        return null;
    }

    const packages = pageData.data;

    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2"></div>
            
            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-primary-600 font-bold text-sm uppercase tracking-widest block mb-2">Trải nghiệm tuyệt vời</span>
                        <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">Tour Du Lịch Bán Chạy</h2>
                        <p className="text-lg text-slate-600 mt-2 max-w-2xl">
                            Khám phá các gói tour trọn gói được thiết kế tỉ mỉ, giúp bạn tận hưởng kỳ nghỉ trọn vẹn mà không cần lo lắng.
                        </p>
                    </div>
                    <Link to="/packages" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                        Xem tất cả tour <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg) => {
                        const coverImage = getCoverImage(pkg.images, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000');
                        
                        const hasPromo = pkg.promotionalPrice && pkg.promotionalPrice < pkg.price;
                        const discountPercent = hasPromo 
                            ? Math.round(((pkg.price - pkg.promotionalPrice!) / pkg.price) * 100) 
                            : 0;

                        return (
                            <Link 
                                key={pkg.id} 
                                to={`/packages/${pkg.id}`}
                                className="group bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Image Area */}
                                <div className="relative h-56 overflow-hidden shrink-0">
                                    <FallbackImage 
                                        src={coverImage} 
                                        alt={pkg.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    
                                    {/* Destination Badge */}
                                    {pkg.destination?.name && (
                                        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                            {pkg.destination.name}
                                        </div>
                                    )}

                                    {/* Discount Badge */}
                                    {hasPromo && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-extrabold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-md">
                                            <Tag size={12} className="fill-white" />
                                            Giảm {discountPercent}%
                                        </div>
                                    )}

                                    {/* Duration Badge */}
                                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                                        <Clock size={13} className="text-primary-500" />
                                        {pkg.duration || 'Liên hệ'}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 flex flex-col grow">
                                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 mb-3">
                                        {pkg.name}
                                    </h3>
                                    
                                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6">
                                        {pkg.description || 'Hành trình khám phá tuyệt vời đang chờ đón bạn.'}
                                    </p>

                                    {/* Pricing & Button */}
                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div>
                                            {hasPromo ? (
                                                <>
                                                    <span className="text-slate-400 line-through text-xs block">
                                                        {pkg.price.toLocaleString()}đ
                                                    </span>
                                                    <span className="text-xl font-black text-red-500">
                                                        {pkg.promotionalPrice!.toLocaleString()}đ
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-xl font-black text-primary-600">
                                                    {pkg.price.toLocaleString()}đ
                                                </span>
                                            )}
                                        </div>
                                        
                                        <span className="px-4 py-2 bg-slate-50 group-hover:bg-primary-600 group-hover:text-white text-slate-700 text-xs font-bold rounded-lg border border-slate-150 transition-all duration-300">
                                            Chi tiết
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link to="/packages" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                        Xem tất cả tour <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};
