import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePackageDetail } from './queries/usePackageDetail';
import { useBookingStore } from '../../store/useBookingStore';
import { Loader2, Compass, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import { getImageUrls } from '../../utils/image';
import { PackageDetailHero } from './components/PackageDetailHero';
import { PackageDetailTabs } from './components/PackageDetailTabs';
import { PackageBookingSidebar } from './components/PackageBookingSidebar';

export const PackageDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { setBookingInfo } = useBookingStore();
    const { data: pkg, isLoading, isError } = usePackageDetail(id);

    const [checkIn, setCheckIn] = useState<string>('');
    const [guests, setGuests] = useState<number>(2);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex justify-center items-center py-24">
                <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
            </div>
        );
    }

    if (isError || !pkg) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-24 text-center">
                <Compass className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Không tìm thấy thông tin tour</h3>
                <p className="text-slate-500 mb-6">Đã xảy ra lỗi hoặc tour du lịch này không tồn tại.</p>
                <Link to="/packages" className="px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 transition-colors">
                    Quay lại danh sách tour
                </Link>
            </div>
        );
    }

    const imagesList = getImageUrls(pkg.images);
    const slideImages = imagesList.length > 0 ? imagesList : ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200'];
    const activePrice = pkg.promotionalPrice && pkg.promotionalPrice < pkg.price ? pkg.promotionalPrice : pkg.price;
    const hasPromotion = Boolean(pkg.promotionalPrice && pkg.promotionalPrice < pkg.price);

    const handleBookNow = () => {
        if (!checkIn) {
            toast.error('Vui lòng chọn ngày khởi hành');
            return;
        }

        const checkInDate = dayjs(checkIn);
        const checkOut = checkInDate.add(1, 'day').format('YYYY-MM-DD');

        setBookingInfo({
            packageId: pkg.id,
            packageName: pkg.name,
            type: 'package',
            price: activePrice,
            checkIn: checkIn,
            checkOut: checkOut,
            guests: guests,
            coverImage: slideImages[0]
        });

        toast.success('Đang chuyển đến trang thanh toán...');
        navigate('/checkout');
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Header section with back link */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                <Link to="/packages" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 font-medium mb-6 transition-colors">
                    <ArrowLeft size={16} /> Quay lại danh sách tour
                </Link>
            </div>

            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">
                    <PackageDetailHero pkg={pkg} slideImages={slideImages} />
                    <PackageDetailTabs pkg={pkg} />
                </div>

                {/* Right Column: Sidebar Booking */}
                <div className="lg:col-span-1">
                    <PackageBookingSidebar
                        pkg={pkg}
                        activePrice={activePrice}
                        hasPromotion={hasPromotion}
                        checkIn={checkIn}
                        setCheckIn={setCheckIn}
                        guests={guests}
                        setGuests={setGuests}
                        handleBookNow={handleBookNow}
                    />
                </div>
            </div>
        </div>
    );
};
