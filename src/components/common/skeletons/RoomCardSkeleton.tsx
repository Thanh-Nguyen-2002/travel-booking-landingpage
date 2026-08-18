import React from 'react';

export const RoomCardSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="w-full md:w-1/3 h-48 md:h-auto shrink-0 bg-slate-200 animate-pulse"></div>
            <div className="p-6 flex flex-col grow">
                <div className="w-1/3 h-6 bg-slate-200 rounded mb-2 animate-pulse"></div>
                
                <div className="flex flex-wrap gap-4 mb-4">
                    <div className="w-20 h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                    <div className="w-16 h-6 bg-slate-200 rounded animate-pulse"></div>
                    <div className="w-20 h-6 bg-slate-200 rounded animate-pulse"></div>
                    <div className="w-24 h-6 bg-slate-200 rounded animate-pulse"></div>
                </div>
                
                <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                    <div className="flex flex-col gap-1">
                        <div className="w-24 h-7 bg-slate-200 rounded animate-pulse"></div>
                        <div className="w-12 h-4 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-28 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};
