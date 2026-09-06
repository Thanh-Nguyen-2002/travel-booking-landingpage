import React from 'react';

export const BlogHeaderBanner: React.FC = () => {
    return (
        <div className="relative bg-slate-900 text-white py-20 overflow-hidden mb-12">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2000')] bg-cover bg-center opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-10"></div>
            <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
                <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 text-sm font-bold rounded-full mb-4 border border-teal-500/30 uppercase tracking-widest">
                    Blog & Cẩm Nang
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Cẩm Nang Du Lịch</h1>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    Chia sẻ kinh nghiệm hành trình, bí kíp đặt phòng và tin tức du lịch mới nhất dành cho bạn.
                </p>
            </div>
        </div>
    );
};
