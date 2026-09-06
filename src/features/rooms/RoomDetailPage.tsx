import { format, addDays } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookingStore } from '../../store/useBookingStore';
import { getCoverImage } from '../../utils/image';
import { RoomBookingCalendar } from '../hotels/components/RoomBookingCalendar';
import { useReviews } from '../reviews/queries/useReviews';
import { useRoomDetail } from './queries/useRoomDetail';
import { RoomHeroSection } from './components/RoomHeroSection';
import { RoomBookingSummary } from './components/RoomBookingSummary';
import { RoomReviewsSection } from './components/RoomReviewsSection';

export const RoomDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: room, isLoading } = useRoomDetail(id);
    const { data: reviewsData, isLoading: isLoadingReviews } = useReviews({ roomId: id });
    const setBookingInfo = useBookingStore((state: any) => state.setBookingInfo);

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
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
            hotelId: room.hotelId, 
            hotelName: 'Khách sạn', 
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
                <RoomHeroSection room={room} roomCover={roomCover} />

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
                        <RoomBookingSummary 
                            room={room} 
                            selectionRange={selectionRange} 
                            onConfirmBooking={handleConfirmBooking} 
                        />
                    </div>
                </div>

                {/* Reviews Section */}
                <RoomReviewsSection reviewsData={reviewsData} isLoadingReviews={isLoadingReviews} />

            </div>
        </div>
    );
};
