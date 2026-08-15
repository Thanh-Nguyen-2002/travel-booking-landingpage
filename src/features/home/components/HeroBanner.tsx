import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        }, 5000); // 5 seconds
        
        return () => clearInterval(timer);
    }, [banners]);

    if (isLoading) {
        return (
            <div className="w-full h-[500px] md:h-[600px] bg-slate-200 animate-pulse flex items-center justify-center">
                <span className="text-slate-400">Loading Banners...</span>
            </div>
        );
    }

    if (!banners || banners.length === 0) {
        return (
            <div className="w-full h-[500px] md:h-[600px] bg-slate-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Khám phá Thế Giới</h1>
                    <p className="text-lg text-slate-300">Đặt phòng khách sạn và tour du lịch dễ dàng hơn bao giờ hết</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
            {banners.map((banner, index) => (
                <div 
                    key={banner.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    {/* Overlay gradient for text readability */}
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    
                    {/* Background Image */}
                    <FallbackImage 
                        src={banner.imageUrl} 
                        alt={banner.title} 
                        fallbackText="Banner Image"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Content */}
                    <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl leading-tight">
                            {banner.title}
                        </h1>
                        {banner.description && (
                            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl">
                                {banner.description}
                            </p>
                        )}
                        {banner.linkUrl && (
                            <Link 
                                to={banner.linkUrl}
                                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                Khám phá ngay
                            </Link>
                        )}
                    </div>
                </div>
            ))}

            {/* Slider Controls */}
            {banners.length > 1 && (
                <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
                    {banners.map((_, index) => (
                        <button 
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                index === currentIndex ? 'bg-primary-500 w-8' : 'bg-white/50 hover:bg-white'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
