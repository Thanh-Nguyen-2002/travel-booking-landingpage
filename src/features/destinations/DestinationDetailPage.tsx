import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, MapPin, Compass, PlayCircle, Map, Utensils, Bus } from 'lucide-react';
import { useDestinationDetail } from './queries/useDestinationDetail';
import { FallbackImage } from '../../components/common/FallbackImage';

export const DestinationDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: destination, isLoading, isError } = useDestinationDetail(id);
    const [activeTab, setActiveTab] = useState<'overview' | 'culinary' | 'transport'>('overview');

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

    // Parse highlights JSON
    let highlightSpots: { name?: string; image?: string; short_desc?: string }[] = [];
    try {
        if (destination.highlightSpots) {
            highlightSpots = JSON.parse(destination.highlightSpots);
        }
    } catch (e) {
        console.error("Lỗi parse highlightSpots JSON", e);
    }

    const hasRichContent = destination.overviewHtml || destination.culinaryHtml || destination.transportHtml || destination.description;

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Header */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden group">
                <FallbackImage 
                    src={destination.coverImage || 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000'} 
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                
                <div className="absolute top-8 left-4 md:left-8 z-20">
                    <Link to="/destinations" className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl transition-all">
                        <ArrowLeft size={20} />
                        <span className="font-medium hidden sm:inline">Trở về</span>
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white container mx-auto max-w-6xl z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.name}</h1>
                        <div className="flex items-center gap-2 text-lg text-slate-200">
                            <MapPin size={24} className="text-primary-400" />
                            <span>{destination.address || 'Đang cập nhật địa chỉ'}</span>
                        </div>
                    </div>
                    
                    {destination.videoUrl && (
                        <a 
                            href={destination.videoUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-full font-medium transition-all group/video"
                        >
                            <PlayCircle size={24} className="group-hover/video:scale-110 transition-transform" />
                            Xem Video Giới Thiệu
                        </a>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Highlight Spots Carousel/Grid */}
                        {highlightSpots.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <Map className="text-primary-500" /> Điểm đến không thể bỏ lỡ
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {highlightSpots.map((spot, idx) => (
                                        <div key={idx} className="group relative rounded-xl overflow-hidden aspect-video cursor-pointer">
                                            <FallbackImage 
                                                src={spot.image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800'} 
                                                alt={spot.name} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                                                <h3 className="text-white font-bold text-lg">{spot.name}</h3>
                                                {spot.short_desc && <p className="text-white/80 text-sm line-clamp-1">{spot.short_desc}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Rich Content Tabs */}
                        {hasRichContent && (
                            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden">
                                <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar">
                                    {(destination.overviewHtml || destination.description) && (
                                        <button 
                                            onClick={() => setActiveTab('overview')}
                                            className={`px-6 py-4 font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'overview' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                                        >
                                            <Compass size={18} /> Tổng quan
                                        </button>
                                    )}
                                    {destination.culinaryHtml && (
                                        <button 
                                            onClick={() => setActiveTab('culinary')}
                                            className={`px-6 py-4 font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'culinary' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                                        >
                                            <Utensils size={18} /> Ẩm thực
                                        </button>
                                    )}
                                    {destination.transportHtml && (
                                        <button 
                                            onClick={() => setActiveTab('transport')}
                                            className={`px-6 py-4 font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'transport' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                                        >
                                            <Bus size={18} /> Di chuyển
                                        </button>
                                    )}
                                </div>
                                <div className="p-6 md:p-8">
                                    {activeTab === 'overview' && (
                                        <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600">
                                            {destination.overviewHtml ? (
                                                <div dangerouslySetInnerHTML={{ __html: destination.overviewHtml }} />
                                            ) : (
                                                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                                                    {destination.description || 'Chưa có thông tin giới thiệu chi tiết về điểm đến này.'}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    {activeTab === 'culinary' && destination.culinaryHtml && (
                                        <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600" dangerouslySetInnerHTML={{ __html: destination.culinaryHtml }} />
                                    )}
                                    {activeTab === 'transport' && destination.transportHtml && (
                                        <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600" dangerouslySetInnerHTML={{ __html: destination.transportHtml }} />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Activities Tags */}
                        {destination.activities && destination.activities.trim() !== '' && (
                            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-slate-800 mb-6">Trải nghiệm & Hoạt động tiêu biểu</h2>
                                <div className="flex flex-wrap gap-2 md:gap-3">
                                    {destination.activities.split(',').map((act, idx) => (
                                        <span key={idx} className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl font-medium border border-primary-100 cursor-pointer hover:bg-primary-100 transition-colors">
                                            #{act.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Lên kế hoạch chuyến đi?</h3>
                            <p className="text-slate-600 mb-6">
                                Đặt phòng khách sạn hoặc tìm kiếm Tour du lịch tại <strong className="text-slate-800">{destination.name}</strong> ngay hôm nay để nhận được mức giá tốt nhất.
                            </p>
                            
                            <div className="space-y-3">
                                <Link to={`/hotels?destinationId=${destination.id}`} className="w-full flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-slate-900/20">
                                    Tìm Khách sạn
                                </Link>
                                <Link to={`/packages`} className="w-full flex justify-center items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 py-3 px-4 rounded-xl font-bold transition-all border border-primary-200">
                                    Xem Tour Khám Phá
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

