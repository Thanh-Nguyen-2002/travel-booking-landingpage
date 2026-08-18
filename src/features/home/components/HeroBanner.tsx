import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles } from 'lucide-react';
import { useBanners } from '../queries/useBanners';
import { FallbackImage } from '../../../components/common/FallbackImage';

export const HeroBanner: React.FC = () => {
    const { data: banners, isLoading } = useBanners();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto slide
    useEffect(() => {
        if (!banners || banners.length <= 1) return;
        
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 6000); // 6 seconds
        
        return () => clearInterval(timer);
    }, [banners]);

    if (isLoading) {
        return (
            <div className="w-full h-[550px] md:h-[650px] bg-slate-900 animate-pulse flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <span className="text-slate-400 font-medium block">Đang tải trải nghiệm...</span>
                </div>
            </div>
        );
    }

    // Default premium travel hero if no banner exists in DB
    if (!banners || banners.length === 0) {
        return (
            <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-slate-950 flex items-center">
                {/* Background Image with Zoom Animation */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2500" 
                        alt="Khám phá Việt Nam" 
                        className="w-full h-full object-cover scale-105 animate-subtle-zoom opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
                </div>

                {/* Content */}
                <div className="relative z-20 container mx-auto px-4 max-w-6xl text-white">
                    <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/20 border border-primary-400/30 backdrop-blur-md text-primary-300 text-xs font-bold uppercase tracking-wider">
                            <Sparkles size={14} className="animate-pulse" />
                            Hành trình mơ ước của bạn
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                            Khám Phá Điểm Đến <br />
                            <span className="text-primary-400">Tuyệt Vời Nhất</span>
                        </h1>
                        <p className="text-lg text-slate-200 font-medium leading-relaxed max-w-lg">
                            Hệ thống đặt phòng resort cao cấp và các tour du lịch trọn gói, được chuẩn bị tinh tế để đem lại trải nghiệm hoàn hảo cho kỳ nghỉ của bạn.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link 
                                to="/packages"
                                className="px-8 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg shadow-primary-600/30 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                            >
                                <Compass size={18} />
                                Khám phá các Tour
                            </Link>
                            <Link 
                                to="/hotels"
                                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-md font-bold rounded-xl hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Đặt khách sạn
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-slate-950">
            {banners.map((banner, index) => {
                const isActive = index === currentIndex;
                return (
                    <div 
                        key={banner.id}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                            isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        {/* Overlay gradient for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent z-10"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
                        
                        {/* Background Image with Zoom on active */}
                        <div className="absolute inset-0 overflow-hidden">
                            <FallbackImage 
                                src={banner.imageUrl} 
                                alt={banner.title} 
                                fallbackText="Banner Image"
                                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                                    isActive ? 'scale-105' : 'scale-100'
                                }`}
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-20 max-w-6xl mx-auto px-4 h-full flex items-center text-white">
                            <div className="max-w-2xl space-y-6">
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] transition-all duration-700 transform translate-y-0 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 drop-shadow-sm">
                                    {banner.title}
                                </h1>
                                
                                {banner.description && (
                                    <div className="backdrop-blur-md bg-black/20 border border-white/10 p-5 md:p-6 rounded-xl max-w-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                                        <p className="text-lg md:text-xl text-slate-100 leading-relaxed font-medium">
                                            {banner.description}
                                        </p>
                                    </div>
                                )}
                                
                                {banner.linkUrl && (
                                    <div className="pt-4 flex flex-wrap gap-4">
                                        <Link 
                                            to={banner.linkUrl}
                                            className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-[0_8px_30px_rgb(6,182,212,0.3)] hover:shadow-[0_12px_40px_rgb(6,182,212,0.4)] transition-all duration-300 inline-flex items-center gap-2 group border border-primary-500/50"
                                        >
                                            <Compass size={20} className="group-hover:rotate-45 group-hover:scale-110 transition-all duration-300" />
                                            Khám phá ngay
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Slider Controls */}
            {banners.length > 1 && (
                <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center gap-2.5">
                    {banners.map((_, index) => (
                        <button 
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all duration-350 ${
                                index === currentIndex ? 'bg-primary-500 w-8 shadow-sm' : 'bg-white/40 hover:bg-white'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
