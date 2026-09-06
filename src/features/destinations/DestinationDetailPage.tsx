import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useDestinationDetail } from './queries/useDestinationDetail';
import { DestinationHeroHeader } from './components/DestinationHeroHeader';
import { DestinationHighlightSpots, type HighlightSpot } from './components/DestinationHighlightSpots';
import { DestinationRichTabs, type DestinationTabKey } from './components/DestinationRichTabs';
import { DestinationSidebar } from './components/DestinationSidebar';

export const DestinationDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: destination, isLoading, isError } = useDestinationDetail(id);
    const [activeTab, setActiveTab] = useState<DestinationTabKey>('overview');

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-50">
                <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
            </div>
        );
    }

    if (isError || !destination) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Không tìm thấy điểm đến</h2>
                <Link to="/destinations" className="text-primary-600 hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Quay lại danh sách
                </Link>
            </div>
        );
    }

    // Parse highlights JSON
    let highlightSpots: HighlightSpot[] = [];
    try {
        if (destination.highlightSpots) {
            highlightSpots = JSON.parse(destination.highlightSpots);
        }
    } catch (e) {
        console.error("Lỗi parse highlightSpots JSON", e);
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Header */}
            <DestinationHeroHeader destination={destination} />

            <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Highlight Spots Carousel/Grid */}
                        <DestinationHighlightSpots highlightSpots={highlightSpots} />

                        {/* Rich Content Tabs */}
                        <DestinationRichTabs
                            destination={destination}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        {/* Activities Tags */}
                        {destination.activities && destination.activities.trim() !== '' && (
                            <div className="bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-slate-800 mb-6">Trải nghiệm & Hoạt động tiêu biểu</h2>
                                <div className="flex flex-wrap gap-2 md:gap-3">
                                    {destination.activities.split(',').map((act, idx) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium border border-primary-100 cursor-pointer hover:bg-primary-100 transition-colors"
                                        >
                                            #{act.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <DestinationSidebar destination={destination} />
                    </div>
                </div>
            </div>
        </div>
    );
};
