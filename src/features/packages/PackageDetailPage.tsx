import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePackageDetail } from './queries/usePackageDetail';
import { useBookingStore } from '../../store/useBookingStore';
import { Loader2, MapPin, Compass, ArrowLeft, Users, Clock, ShieldCheck } from 'lucide-react';
import { FallbackImage } from '../../components/common/FallbackImage';
import { DatePicker, InputNumber, Button, Tabs, Divider } from 'antd';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import { getImageUrls } from '../../utils/image';
import { decodeHtmlEntities } from '../../utils/html';

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
    const hasPromotion = pkg.promotionalPrice && pkg.promotionalPrice < pkg.price;

    const handleBookNow = () => {
        if (!checkIn) {
            toast.error('Vui lòng chọn ngày khởi hành');
            return;
        }

        // Calculate checkout as departure date + duration (we can estimate 3 days later, or checkIn + 1 day)
        // Let's assume standard checkOut is next day, or checkIn + estimated days. Let's make it checkIn + 1
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

    const tabItems = [
        {
            key: 'overview',
            label: 'Tổng quan',
            children: (
                <div className="py-4">
                    {pkg.overviewHtml ? (
                        <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600" dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(pkg.overviewHtml) }} />
                    ) : (
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">{pkg.description || 'Chưa có thông tin tổng quan chi tiết.'}</p>
                    )}
                </div>
            )
        },
        {
            key: 'itinerary',
            label: 'Lịch trình chi tiết',
            children: (
                <div className="py-4">
                    {pkg.itinerary ? (
                        (() => {
                            try {
                                const parsed = JSON.parse(pkg.itinerary);
                                if (Array.isArray(parsed)) {
                                    return (
                                        <div className="relative border-l-2 border-primary-200 ml-4 py-2 space-y-8 mt-4">
                                            {parsed.map((item, index) => (
                                                <div key={index} className="relative pl-8">
                                                    {/* Timeline dot */}
                                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-primary-500 shadow-sm" />

                                                    {/* Content */}
                                                    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex flex-wrap items-center gap-3 mb-4 border-b border-slate-50 pb-3">
                                                            <span className="px-3 py-1.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-bold rounded-lg shadow-sm whitespace-nowrap">
                                                                Ngày {item.day}
                                                            </span>
                                                            <h4 className="text-lg font-bold text-slate-800">{item.title}</h4>
                                                        </div>

                                                        {item.activities && Array.isArray(item.activities) && (
                                                            <ul className="space-y-3">
                                                                {item.activities.map((act: string, actIdx: number) => (
                                                                    <li key={actIdx} className="flex items-start gap-3 text-slate-600">
                                                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                                                                        <span className="leading-relaxed">{act}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                                return <div className="whitespace-pre-line text-slate-600 leading-relaxed prose prose-slate max-w-none">{pkg.itinerary}</div>;
                            } catch {
                                return <div className="whitespace-pre-line text-slate-600 leading-relaxed prose prose-slate max-w-none">{pkg.itinerary}</div>;
                            }
                        })()
                    ) : (
                        <p className="text-slate-500 italic">Chưa có lịch trình chi tiết được cập nhật.</p>
                    )}
                </div>
            )
        },
        {
            key: 'includes',
            label: 'Dịch vụ bao gồm',
            children: (
                <div className="py-4 space-y-4">
                    <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-6">
                        <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Bao gồm trong chi phí
                        </h4>
                        {pkg.includes ? (
                            <div className="whitespace-pre-line text-slate-600 leading-relaxed text-sm">{pkg.includes}</div>
                        ) : (
                            <p className="text-slate-500 italic">Đã bao gồm xe đưa đón, hướng dẫn viên và vé tham quan.</p>
                        )}
                    </div>
                </div>
            )
        },
        {
            key: 'excludes',
            label: 'Không bao gồm',
            children: (
                <div className="py-4 space-y-4">
                    <div className="bg-rose-50/50 border border-rose-100/50 rounded-xl p-6">
                        <h4 className="font-bold text-rose-800 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Không bao gồm trong chi phí
                        </h4>
                        {pkg.excludes ? (
                            <div className="whitespace-pre-line text-slate-600 leading-relaxed text-sm">{pkg.excludes}</div>
                        ) : (
                            <p className="text-slate-500 italic">Không bao gồm chi phí cá nhân ngoài chương trình, thuế VAT.</p>
                        )}
                    </div>
                </div>
            )
        },
        {
            key: 'terms',
            label: 'Điều khoản & Lưu ý',
            children: (
                <div className="py-4">
                    {pkg.termsHtml ? (
                        <div className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600" dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(pkg.termsHtml) }} />
                    ) : (
                        <p className="text-slate-500 italic">Chưa có thông tin điều khoản và lưu ý.</p>
                    )}
                </div>
            )
        }
    ];

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
                    {/* Title & Info Card */}
                    <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-100 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            {pkg.destination?.name && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-lg">
                                    <MapPin size={12} /> {pkg.destination.name}
                                </span>
                            )}
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">
                                <Clock size={12} /> {pkg.duration || 'Liên hệ'}
                            </span>
                            {pkg.departureLocation && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg">
                                    <MapPin size={12} /> Khởi hành: {pkg.departureLocation}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 leading-tight">
                            {pkg.name}
                        </h1>

                        <div className="text-slate-600 whitespace-pre-line mb-4 leading-relaxed">
                            {pkg.description || 'Hành trình được chuẩn bị chu đáo mang lại trải nghiệm tuyệt vời cho quý khách.'}
                        </div>

                        {pkg.videoUrl && (
                            <div className="mb-6">
                                <a href={pkg.videoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors font-bold text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                                    Xem Video Giới Thiệu
                                </a>
                            </div>
                        )}

                        {/* Image Gallery */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-3 h-96 rounded-xl overflow-hidden shadow-sm">
                                <FallbackImage src={slideImages[0]} alt={pkg.name} className="w-full h-full object-cover" />
                            </div>
                            {slideImages.slice(1, 4).map((img, idx) => (
                                <div key={idx} className="h-32 rounded-xl overflow-hidden shadow-sm">
                                    <FallbackImage src={img} alt={`${pkg.name} ${idx + 2}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Content Tabs */}
                    <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-100 shadow-sm">
                        <Tabs defaultActiveKey="itinerary" items={tabItems} className="custom-tabs" />
                    </div>
                </div>

                {/* Right Column: Sidebar Booking */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 sticky top-24">
                        <div className="mb-6">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Giá vé từ</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-extrabold text-rose-500">
                                    {activePrice.toLocaleString()}đ
                                </span>
                                <span className="text-sm text-slate-500 font-medium">/khách</span>
                                {hasPromotion && (
                                    <span className="text-sm text-slate-400 line-through ml-2">
                                        {pkg.price.toLocaleString()}đ
                                    </span>
                                )}
                            </div>
                        </div>

                        <Divider className="my-4" />

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ngày khởi hành</label>
                                <DatePicker
                                    className="w-full rounded-xl py-2.5"
                                    size="large"
                                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                                    onChange={(date) => setCheckIn(date ? date.format('YYYY-MM-DD') : '')}
                                    placeholder="Chọn ngày đi"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Số lượng khách</label>
                                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                                    <span className="text-slate-600 font-medium flex items-center gap-2"><Users size={16} /> Số khách</span>
                                    <InputNumber
                                        min={1}
                                        max={20}
                                        value={guests}
                                        onChange={(val) => setGuests(val || 1)}
                                        size="large"
                                        className="w-24 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Real-time total calculation */}
                        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100/50">
                            <div className="flex justify-between text-sm text-slate-600 mb-2">
                                <span>Giá vé tạm tính</span>
                                <span>{activePrice.toLocaleString()}đ x {guests}</span>
                            </div>
                            <Divider className="my-2 border-slate-200" />
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-slate-800">Tổng cộng tạm tính</span>
                                <span className="text-2xl font-extrabold text-primary-600">{(activePrice * guests).toLocaleString()}đ</span>
                            </div>
                        </div>

                        <Button
                            type="primary"
                            size="large"
                            onClick={handleBookNow}
                            className="w-full bg-primary-600 hover:!bg-primary-700 h-14 text-base font-bold rounded-xl shadow-lg shadow-primary-500/20"
                        >
                            Đặt Tour Ngay
                        </Button>

                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-semibold">
                            <ShieldCheck size={14} className="text-emerald-500" /> Bảo mật thông tin & thanh toán an toàn
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
