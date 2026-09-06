import React from 'react';
import { Compass, Utensils, Bus } from 'lucide-react';
import type { DestinationResponse } from '../../../types/destination';

export type DestinationTabKey = 'overview' | 'culinary' | 'transport';

interface DestinationRichTabsProps {
    destination: DestinationResponse;
    activeTab: DestinationTabKey;
    setActiveTab: (tab: DestinationTabKey) => void;
}

export const DestinationRichTabs: React.FC<DestinationRichTabsProps> = ({
    destination,
    activeTab,
    setActiveTab,
}) => {
    const hasRichContent = Boolean(
        destination.overviewHtml || destination.culinaryHtml || destination.transportHtml || destination.description
    );

    if (!hasRichContent) return null;

    return (
        <div className="bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden">
            <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar">
                {(destination.overviewHtml || destination.description) && (
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-4 font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
                            activeTab === 'overview'
                                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                        }`}
                    >
                        <Compass size={18} /> Tổng quan
                    </button>
                )}
                {destination.culinaryHtml && (
                    <button
                        onClick={() => setActiveTab('culinary')}
                        className={`px-6 py-4 font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
                            activeTab === 'culinary'
                                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                        }`}
                    >
                        <Utensils size={18} /> Ẩm thực
                    </button>
                )}
                {destination.transportHtml && (
                    <button
                        onClick={() => setActiveTab('transport')}
                        className={`px-6 py-4 font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
                            activeTab === 'transport'
                                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                        }`}
                    >
                        <Bus size={18} /> Di chuyển
                    </button>
                )}
            </div>
            <div className="p-6 md:p-8">
                {activeTab === 'overview' && (
                    <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600">
                        {destination.overviewHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: destination.overviewHtml }} />
                        ) : (
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                                {destination.description || 'Chưa có thông tin giới thiệu chi tiết về điểm đến này.'}
                            </p>
                        )}
                    </div>
                )}
                {activeTab === 'culinary' && destination.culinaryHtml && (
                    <div
                        className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600"
                        dangerouslySetInnerHTML={{ __html: destination.culinaryHtml }}
                    />
                )}
                {activeTab === 'transport' && destination.transportHtml && (
                    <div
                        className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600"
                        dangerouslySetInnerHTML={{ __html: destination.transportHtml }}
                    />
                )}
            </div>
        </div>
    );
};
