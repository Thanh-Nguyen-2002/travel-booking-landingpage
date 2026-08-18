import React from 'react';

export const HotelCardSkeleton: React.FC = () => {
    return (
        <div className="group block bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden flex flex-col h-full">
            <div className="relative h-56 overflow-hidden shrink-0 bg-slate-200 animate-pulse">
                <div className="absolute top-4 right-4 w-12 h-7 bg-slate-300 rounded-[6px]"></div>
            </div>
            <div className="p-6 flex flex-col grow">
                <div className="w-3/4 h-6 bg-slate-200 rounded mb-2 animate-pulse"></div>
                
                <div className="flex items-start gap-2 mb-4">
                    <div className="w-4 h-4 bg-slate-200 rounded animate-pulse mt-0.5 shrink-0"></div>
                    <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                    <div className="w-16 h-7 bg-slate-200 rounded-[6px] animate-pulse"></div>
                    <div className="w-20 h-7 bg-slate-200 rounded-[6px] animate-pulse"></div>
                    <div className="w-24 h-7 bg-slate-200 rounded-[6px] animate-pulse"></div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="w-12 h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="w-20 h-6 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
