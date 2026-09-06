import React from 'react';

interface PackageHeaderBannerProps {
    bannerUrl: string;
    bannerTitle: string;
    bannerDesc: string;
}

export const PackageHeaderBanner: React.FC<PackageHeaderBannerProps> = ({
    bannerUrl,
    bannerTitle,
    bannerDesc,
}) => {
    return (
        <div className="relative bg-slate-900 text-white py-24 overflow-hidden mb-12">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-1000"
                style={{ backgroundImage: `url(${bannerUrl})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-10"></div>
            <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
                <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-bold rounded-full mb-4 border border-primary-500/30 uppercase tracking-widest">
                    Hành trình Tour
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-display text-white transition-all duration-500">
                    {bannerTitle}
                </h1>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto transition-all duration-500">
                    {bannerDesc}
                </p>
            </div>
        </div>
    );
};
