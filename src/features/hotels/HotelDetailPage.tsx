import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader2, MapPin, Star, Check, ArrowLeft, Bed, Users } from 'lucide-react';
import { useHotelDetail } from './queries/useHotelDetail';
import { useRooms } from '../rooms/queries/useRooms';
import { useBookingStore } from '../../store/useBookingStore';

export const HotelDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const setBookingInfo = useBookingStore(state => state.setBookingInfo);
    
    const { data: hotel, isLoading, isError } = useHotelDetail(id);
    const { data: roomsData, isLoading: isLoadingRooms } = useRooms(id);

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

    const images = hotel.images ? hotel.images.split(',') : [];
    const coverImage = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1566073171589-236237eff6dd?q=80&w=2000';

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Gallery Section */}
            <div className="relative h-[60vh] min-h-[400px] w-full">
                <img src={coverImage} alt={hotel.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30"></div>
                
                <div className="absolute top-8 left-8">
                    <Link 
                        to="/hotels" 
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium">Quay lại</span>
                    </Link>
                </div>

                <div className="absolute bottom-12 left-0 right-0">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1 rounded-md text-sm font-bold shadow-md">
                                <Star size={14} className="fill-white" />
                                {hotel.rating || 5.0}
                            </div>
                            <span className="text-white/90 text-sm">Tuyệt vời</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{hotel.name}</h1>
                        <div className="flex items-center gap-2 text-white/90">
                            <MapPin size={20} />
                            <span className="text-lg">{hotel.address}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Giới thiệu</h2>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                {hotel.description || 'Chưa có thông tin giới thiệu chi tiết.'}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Tiện ích nổi bật</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {hotel.amenities?.map((amenity) => (
                                    <div key={amenity.id} className="flex items-center gap-3 text-slate-700">
                                        <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                                            <Check size={16} />
                                        </div>
                                        <span className="font-medium">{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rooms List */}
                        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Phòng có sẵn</h2>
                            
                            {isLoadingRooms ? (
                                <div className="py-12 flex justify-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                                </div>
                            ) : !roomsData || roomsData.length === 0 ? (
                                <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-slate-100">
                                    Hiện chưa có thông tin phòng cho khách sạn này.
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {roomsData.map((room) => {
                                        const roomImages = room.images ? room.images.split(',') : [];
                                        const roomCover = roomImages.length > 0 ? roomImages[0] : 'https://images.unsplash.com/photo-1598928506311-c55dd71360fa?q=80&w=1000';
                                        
                                        return (
                                            <div key={room.id} className="flex flex-col md:flex-row border border-slate-200 rounded-xl overflow-hidden hover:border-primary-300 transition-colors shadow-sm hover:shadow-md">
                                                <div className="w-full md:w-1/3 h-48 md:h-auto shrink-0">
                                                    <img src={roomCover} alt={room.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="p-6 flex flex-col grow">
                                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{room.name}</h3>
                                                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                                                        <div className="flex items-center gap-1.5"><Bed size={16} className="text-slate-400"/> {room.bedType}</div>
                                                        <div className="flex items-center gap-1.5"><Users size={16} className="text-slate-400"/> {room.capacity} người</div>
                                                        <div className="flex items-center gap-1.5"><span className="text-slate-400 font-medium">Size:</span> {room.size}</div>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {room.amenities?.slice(0,4).map(am => (
                                                            <span key={am.id} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-medium">{am.name}</span>
                                                        ))}
                                                    </div>

                                                    <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                                                        <div>
                                                            <div className="text-2xl font-bold text-primary-600">{room.price.toLocaleString()}đ</div>
                                                            <div className="text-slate-500 text-sm">/ đêm</div>
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                if (!hotel) return;
                                                                setBookingInfo({
                                                                    hotelId: hotel.id,
                                                                    hotelName: hotel.name,
                                                                    roomId: room.id,
                                                                    roomName: room.name,
                                                                    price: room.price,
                                                                    coverImage: roomCover
                                                                });
                                                                navigate('/checkout');
                                                            }}
                                                            className="px-6 py-2.5 bg-slate-900 hover:bg-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
                                                        >
                                                            Đặt ngay
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Sticky Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 p-6">
                            <div className="text-slate-500 mb-1">Giá thấp nhất từ</div>
                            <div className="text-3xl font-bold text-primary-600 mb-6">{hotel.priceFrom ? hotel.priceFrom.toLocaleString() : 0}đ <span className="text-base font-normal text-slate-500">/ đêm</span></div>
                            
                            <hr className="border-slate-100 mb-6" />
                            
                            <div className="space-y-4 mb-6 text-sm text-slate-600">
                                <div className="flex items-start gap-3">
                                    <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span>Giá hiển thị là giá cuối cùng, không phụ phí.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span>Miễn phí hủy phòng (áp dụng cho hầu hết các phòng).</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span>Đội ngũ hỗ trợ 24/7 trực tuyến.</span>
                                </div>
                            </div>
                            
                            <button className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all duration-300">
                                Chọn phòng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
