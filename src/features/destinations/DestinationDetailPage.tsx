import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, MapPin, Compass } from 'lucide-react';
import { useDestinationDetail } from './queries/useDestinationDetail';

export const DestinationDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
    const { data: destination, isLoading, isError } = useDestinationDetail(id);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-50">
                <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
            </div>
        );
    }

    if (isError || !destination) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Không tìm thấy điểm đến</h2>
                <Link to="/destinations" className="text-primary-600 hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Quay lại danh sách
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Header */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                <img 
                    src={destination.coverImage || 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000'} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                
                <div className="absolute top-8 left-4 md:left-8 z-20">
                    <Link to="/destinations" className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl transition-all">
                        <ArrowLeft size={20} />
                        <span className="font-medium hidden sm:inline">Trở về</span>
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white container mx-auto max-w-5xl z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.name}</h1>
                    <div className="flex items-center gap-2 text-lg text-slate-200">
                        <MapPin size={24} className="text-primary-400" />
                        <span>{destination.address || 'Đang cập nhật địa chỉ'}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Compass className="text-primary-500" /> Khám phá điểm đến
                            </h2>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                                {destination.description || 'Chưa có thông tin giới thiệu chi tiết về điểm đến này.'}
                            </p>
                        </div>

                        {/* Activities */}
                        {destination.activities && destination.activities.trim() !== '' && (
                            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Trải nghiệm & Hoạt động</h2>
                                <div className="flex flex-wrap gap-3">
                                    {destination.activities.split(',').map((act, idx) => (
                                        <span key={idx} className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl font-medium border border-primary-100">
                                            {act.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Lên kế hoạch chuyến đi?</h3>
                            <p className="text-slate-600 mb-6">
                                Đặt phòng khách sạn tại {destination.name} ngay hôm nay để nhận được mức giá tốt nhất.
                            </p>
                            <Link to="/hotels" className="w-full flex justify-center items-center gap-2 bg-slate-900 hover:bg-primary-600 text-white py-3 px-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary-600/30">
                                Tìm Khách sạn ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
