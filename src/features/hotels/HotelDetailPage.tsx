import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useHotelDetail } from './queries/useHotelDetail';
import { useRooms } from '../rooms/queries/useRooms';
import { HotelGallery } from './components/HotelGallery';
import { HotelAmenities } from './components/HotelAmenities';
import { RoomList } from './components/RoomList';
import { BookingSidebar } from './components/BookingSidebar';
import { decodeHtmlEntities } from '../../utils/html';

export const HotelDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
    const { data: hotel, isLoading, isError } = useHotelDetail(id);
    const { data: roomsData, isLoading: isLoadingRooms } = useRooms(id);
    const [activeTab, setActiveTab] = React.useState('overview');

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-50">
                <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
            </div>
        );
    }

    if (isError || !hotel) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Không tìm thấy khách sạn</h2>
                <Link to="/hotels" className="text-primary-600 hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Quay lại danh sách
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <HotelGallery hotel={hotel} />

            <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Content Tabs */}
                        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden">
                            <div className="flex border-b border-slate-200 overflow-x-auto hide-scrollbar">
                                <button 
                                    onClick={() => setActiveTab('overview')}
                                    className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${activeTab === 'overview' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                                >
                                    Tổng quan
                                </button>
                                {hotel.policiesHtml && (
                                    <button 
                                        onClick={() => setActiveTab('policies')}
                                        className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${activeTab === 'policies' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                                    >
                                        Quy định & Chính sách
                                    </button>
                                )}
                                {hotel.mapIframe && (
                                    <button 
                                        onClick={() => setActiveTab('map')}
                                        className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${activeTab === 'map' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                                    >
                                        Bản đồ
                                    </button>
                                )}
                            </div>

                            <div className="p-6 md:p-8">
                                {activeTab === 'overview' && (
                                    <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600">
                                        {hotel.overviewHtml ? (
                                            <div dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(hotel.overviewHtml) }} />
                                        ) : (
                                            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                                                {hotel.description || 'Chưa có thông tin tổng quan chi tiết.'}
                                            </p>
                                        )}
                                    </div>
                                )}
                                
                                {activeTab === 'policies' && hotel.policiesHtml && (
                                    <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600" dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(hotel.policiesHtml) }} />
                                )}

                                {activeTab === 'map' && hotel.mapIframe && (
                                    <div className="w-full h-[400px] rounded-xl overflow-hidden" dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(hotel.mapIframe) }} />
                                )}
                            </div>
                        </div>

                        <HotelAmenities amenities={hotel.amenities} />

                        <RoomList hotel={hotel} roomsData={roomsData} isLoadingRooms={isLoadingRooms} />
                    </div>

                    {/* Sidebar / Sticky Booking Summary */}
                    <div className="lg:col-span-1">
                        <BookingSidebar hotel={hotel} />
                    </div>
                </div>
            </div>
        </div>
    );
};
