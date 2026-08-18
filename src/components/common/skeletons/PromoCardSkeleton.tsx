import React from 'react';

export const PromoCardSkeleton: React.FC = () => {
    return (
        <div className="group bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden flex flex-col h-full">
            <div className="h-48 bg-slate-200 animate-pulse relative overflow-hidden shrink-0">
            </div>
            <div className="p-8 flex flex-col grow">
                <div className="w-1/2 h-8 bg-slate-200 rounded animate-pulse mb-3"></div>
                <div className="w-full h-4 bg-slate-200 rounded animate-pulse mb-2"></div>
                <div className="w-4/5 h-4 bg-slate-200 rounded animate-pulse mb-6 grow"></div>
                
                <div className="w-full h-12 bg-slate-200 rounded-xl animate-pulse mb-6"></div>
                
                <div className="w-full h-12 bg-slate-200 rounded-lg animate-pulse mt-auto"></div>
            </div>
        </div>
    );
};
