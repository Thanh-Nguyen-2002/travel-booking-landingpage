import { format } from 'date-fns';
import { ArrowLeft, Bed, Check, Star, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FallbackImage } from '../../components/common/FallbackImage';
import { useBookingStore } from '../../store/useBookingStore';
import { getCoverImage } from '../../utils/image';
import { RoomBookingCalendar } from '../hotels/components/RoomBookingCalendar';
import { useReviews } from '../reviews/queries/useReviews';
import { useRoomDetail } from './queries/useRoomDetail';

export const RoomDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: room, isLoading } = useRoomDetail(id);
    const { data: reviewsData, isLoading: isLoadingReviews } = useReviews({ roomId: id });
    const setBookingInfo = useBookingStore((state: any) => state.setBookingInfo);

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50">
                <div className="text-center text-slate-500">Không tìm thấy thông tin phòng.</div>
            </div>
        );
    }

    const roomCover = getCoverImage(room.images, 'https://images.unsplash.com/photo-1598928506311-c55dd71360fa?q=80&w=1000');

    const handleConfirmBooking = () => {
        if (!room) return;
        setBookingInfo({
            hotelId: room.hotelId, // Note: Assuming room API returns hotelId. If not, we might need a workaround or fetch it.
            hotelName: 'Khách sạn', // Fallback, usually need hotel detail or backend to return hotel info
            roomId: room.id,
            roomName: room.name,
            price: room.price,
            coverImage: roomCover,
            checkIn: format(selectionRange.startDate, 'yyyy-MM-dd'),
            checkOut: format(selectionRange.endDate, 'yyyy-MM-dd'),
        });
        navigate('/checkout');
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-slate-50">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:cursor-pointer hover:text-primary-600 transition-colors mb-6 font-medium"
                >
                    <ArrowLeft size={20} /> Quay lại
                </button>

                {/* Hero Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100 mb-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/2 h-80 lg:h-auto rounded-xl overflow-hidden relative">
                            <FallbackImage src={roomCover} alt={room.name} className="w-full h-full object-cover" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-bold text-slate-800 shadow-sm">
                                {room.size} m²
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 flex flex-col">
                            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">{room.name}</h1>

                            <div className="flex flex-wrap gap-4 text-slate-600 mb-6">
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg">
                                    <Bed size={18} className="text-primary-600" />
                                    <span className="font-medium">{room.bedType}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg">
                                    <Users size={18} className="text-primary-600" />
                                    <span className="font-medium">Tối đa {room.capacity} người</span>
                                </div>
                            </div>

                            <div className="mb-8 flex-grow">
                                <h3 className="text-lg font-bold text-slate-800 mb-3">Tiện nghi phòng</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {room.amenities?.map((am: any) => (
                                        <div key={am.id} className="flex items-center gap-2 text-slate-600">
                                            <Check size={16} className="text-green-500 shrink-0" />
                                            <span>{am.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex items-end justify-between">
                                <div>
                                    <p className="text-slate-500 mb-1">Giá mỗi đêm từ</p>
                                    <div className="text-3xl font-black text-primary-600">
                                        {room.price.toLocaleString()}đ
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking & Calendar Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Chọn ngày đặt phòng</h2>
                        <RoomBookingCalendar
                            roomId={room.id}
                            selectionRange={selectionRange}
                            setSelectionRange={setSelectionRange}
                            onDateSelect={() => { }}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Tóm tắt đặt phòng</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-500">Nhận phòng</span>
                                    <span className="font-bold text-slate-800">
                                        {selectionRange.startDate ? format(selectionRange.startDate, 'dd/MM/yyyy') : '-'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-500">Trả phòng</span>
                                    <span className="font-bold text-slate-800">
                                        {selectionRange.endDate ? format(selectionRange.endDate, 'dd/MM/yyyy') : '-'}
                                    </span>
                                </div>
                            </div>

                            <button
                                disabled={!selectionRange.startDate || !selectionRange.endDate || format(selectionRange.startDate, 'yyyy-MM-dd') === format(selectionRange.endDate, 'yyyy-MM-dd') || room.quantity === 0 || room.status !== 'ACTIVE'}
                                onClick={handleConfirmBooking}
                                className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold hover:cursor-pointer rounded-xl shadow-[0_8px_20px_rgb(14,165,233,0.3)] disabled:shadow-none transition-all text-lg"
                            >
                                {room.quantity === 0 || room.status !== 'ACTIVE' ? 'Hết phòng' : 'Tiếp tục đặt phòng'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm ring-1 ring-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Đánh giá từ khách hàng</h2>

                    {isLoadingReviews ? (
                        <div className="flex justify-center py-8">
                            <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                        </div>
                    ) : !reviewsData?.data || reviewsData?.data?.length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
                            <Star size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-700 mb-2">Chưa có đánh giá nào</h3>
                            <p className="text-slate-500">Hãy là người đầu tiên trải nghiệm và đánh giá phòng này.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {reviewsData.data.map((review: any) => (
                                <div key={review.id} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                                <FallbackImage src={review.customerAvatar} alt={review.customerName} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{review.customerName || 'Khách hàng'}</div>
                                                <div className="text-xs text-slate-500">{format(new Date(review.createdAt), 'dd/MM/yyyy')}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 text-amber-400">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-300" : ""} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
