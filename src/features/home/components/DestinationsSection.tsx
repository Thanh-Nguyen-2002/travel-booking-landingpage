import React from 'react';
import { MapPin, Loader2, ArrowRight } from 'lucide-react';
import { useDestinations } from '../../destinations/queries/useDestinations';
import { Link } from 'react-router-dom';
import { FallbackImage } from '../../../components/common/FallbackImage';

export const DestinationsSection: React.FC = () => {
    // Fetch 6 destinations for the home page
    const { data: pageData, isLoading, isError } = useDestinations(0, 6);
    
    if (isLoading) {
        return (
            <div className="py-24 flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }
    
    if (isError || !pageData?.data) {
        return null;
    }

    const destinations = pageData.data;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Điểm đến nổi bật</h2>
                        <p className="text-lg text-slate-600 max-w-2xl">Khám phá những địa điểm du lịch tuyệt vời nhất được chúng tôi tuyển chọn dành riêng cho bạn.</p>
                    </div>
                    <Link to="/destinations" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                        Xem tất cả <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest) => (
                        <Link 
                            key={dest.id} 
                            to={`/destinations/${dest.id}`}
                            className="group block bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
                        >
                            <div className="relative h-64 overflow-hidden">
                                {/* Image with overlay instead of scale */}
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
                
                <div className="mt-8 text-center md:hidden">
                    <Link to="/destinations" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                        Xem tất cả điểm đến <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};
