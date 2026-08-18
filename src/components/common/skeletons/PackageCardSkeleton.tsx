import React from 'react';

export const PackageCardSkeleton: React.FC = () => {
    return (
        <div className="group bg-white rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col h-full">
            <div className="relative h-56 overflow-hidden shrink-0 bg-slate-200 animate-pulse">
                <div className="absolute top-4 left-4 w-24 h-7 bg-slate-300 rounded-[6px]"></div>
                <div className="absolute top-4 right-4 w-20 h-7 bg-slate-300 rounded-[6px]"></div>
                <div className="absolute bottom-4 left-4 w-24 h-8 bg-slate-300 rounded-[6px]"></div>
            </div>
            <div className="p-6 flex flex-col grow">
                <div className="w-full h-7 bg-slate-200 rounded mb-2 animate-pulse"></div>
                <div className="w-4/5 h-7 bg-slate-200 rounded mb-4 animate-pulse"></div>
                
                <div className="w-full h-4 bg-slate-200 rounded mb-2 animate-pulse"></div>
                <div className="w-5/6 h-4 bg-slate-200 rounded mb-6 animate-pulse"></div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="w-16 h-3 bg-slate-200 rounded animate-pulse"></div>
                        <div className="w-24 h-6 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-20 h-8 bg-slate-200 rounded-[6px] animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};
