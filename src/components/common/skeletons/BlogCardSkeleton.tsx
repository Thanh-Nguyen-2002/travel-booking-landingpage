import React from 'react';

export const BlogCardSkeleton: React.FC = () => {
    return (
        <div className="group flex flex-col bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden h-full">
            <div className="relative h-56 overflow-hidden shrink-0 bg-slate-200 animate-pulse">
                <div className="absolute top-4 left-4 w-20 h-7 bg-slate-300 rounded-[6px]"></div>
            </div>
            <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="w-20 h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-6 bg-slate-200 rounded mb-2 animate-pulse"></div>
                <div className="w-3/4 h-6 bg-slate-200 rounded mb-4 animate-pulse"></div>
                
                <div className="w-full h-4 bg-slate-200 rounded mb-2 animate-pulse"></div>
                <div className="w-full h-4 bg-slate-200 rounded mb-2 animate-pulse"></div>
                <div className="w-2/3 h-4 bg-slate-200 rounded mb-4 animate-pulse"></div>
                
                <div className="mt-auto pt-4">
                    <div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};
