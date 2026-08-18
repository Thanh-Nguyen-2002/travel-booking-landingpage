import React from 'react';

export const DestinationCardSkeleton: React.FC = () => {
    return (
        <div className="group block bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden">
            <div className="relative h-64 overflow-hidden bg-slate-200 animate-pulse">
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="w-2/3 h-8 bg-slate-300 rounded mb-3"></div>
                    <div className="w-1/2 h-4 bg-slate-300 rounded"></div>
                </div>
            </div>
            <div className="p-6">
                <div className="w-full h-4 bg-slate-200 rounded mb-2 animate-pulse"></div>
                <div className="w-full h-4 bg-slate-200 rounded mb-2 animate-pulse"></div>
                <div className="w-3/4 h-4 bg-slate-200 rounded mb-6 animate-pulse"></div>
                
                <div className="flex flex-wrap gap-2">
                    <div className="w-20 h-8 bg-slate-200 rounded-[6px] animate-pulse"></div>
                    <div className="w-24 h-8 bg-slate-200 rounded-[6px] animate-pulse"></div>
                    <div className="w-16 h-8 bg-slate-200 rounded-[6px] animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};
