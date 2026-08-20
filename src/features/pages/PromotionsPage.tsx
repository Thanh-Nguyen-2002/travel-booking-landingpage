import React from 'react';
import { Tag, Calendar, AlertCircle, Sparkles } from 'lucide-react';
import { usePromotions, type Promotion } from '../../hooks/usePromotions';
import { PromoCardSkeleton } from '../../components/common/skeletons';
import { ASSETS } from '../../config/assets';


export const PromotionsPage: React.FC = () => {
    const { data: promotions, isLoading, isError } = usePromotions();

    const renderPromoCard = (promo: Promotion) => (
        <div key={promo.id} className="group bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
            <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-50 relative overflow-hidden shrink-0">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
                <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center text-primary-400/50 group-hover:text-primary-500/80 transition-colors duration-500">
                    <Tag size={80} strokeWidth={1} />
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-br from-rose-500 via-red-500 to-rose-600 p-[2px] rounded-lg shadow-[0_8px_20px_rgba(244,63,94,0.4)] transition-all duration-300">
                    <div className="bg-gradient-to-br from-rose-500 to-red-500 h-full w-full rounded-lg border border-dashed border-white/60 px-3 py-1.5 flex items-center gap-1.5">
                        <Sparkles size={16} className="text-yellow-200 animate-pulse" />
                        <span className="text-white font-bold text-sm drop-shadow-md">
                            {promo.discountType === 'PERCENTAGE' ? `GIẢM ${promo.discountValue}%` : `GIẢM ${promo.discountValue.toLocaleString()}Đ`}
                        </span>
                    </div>
                </div>
            </div>
            <div className="p-8 flex flex-col grow">
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-primary-600 transition-colors">{promo.code}</h3>
                <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed grow">{promo.description || 'Ưu đãi đặc biệt dành cho bạn. Săn ngay kẻo lỡ!'}</p>
                <div className="flex items-center text-sm font-medium text-slate-500 gap-2 mb-6 bg-slate-50 p-3 rounded-xl">
                    <Calendar size={18} className="text-primary-500" />
                    Áp dụng đến: <span className="text-slate-700">{promo.endDate ? new Date(promo.endDate).toLocaleDateString('vi-VN') : 'Không thời hạn'}</span>
                </div>
                <button className="w-full mt-auto hover:cursor-pointer bg-gradient-to-r from-primary-50 to-slate-50 text-primary-600 hover:from-primary-500 hover:to-primary-600 hover:text-white font-semibold py-3.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md">
                    Sử dụng mã {promo.code}
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen pb-16">
            {/* Hero Section */}
            <div className="relative bg-slate-900 py-32 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${ASSETS.IMAGES.HERO_PROMOTIONS})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 z-10"></div>

                <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-bold rounded-full mb-4 border border-primary-500/30 uppercase tracking-widest">
                        Ưu Đãi Đặc Quyền
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">
                        Khuyến Mãi & Ưu Đãi
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-medium leading-relaxed drop-shadow-sm">
                        Săn ngay các deal du lịch cực hời chỉ có tại nền tảng của chúng tôi. Chuyến đi trong mơ nay rẻ bất ngờ!
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 mt-[-60px] relative z-20">
                <div className="max-w-6xl mx-auto">
                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <PromoCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : isError ? (
                        <div className="backdrop-blur-md bg-white/95 p-16 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 flex flex-col items-center justify-center text-red-500 min-h-[400px]">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                                <AlertCircle size={40} className="text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-slate-800">Không thể tải dữ liệu</h3>
                            <p className="text-slate-500 text-lg">Đã xảy ra lỗi khi kết nối tới máy chủ. Vui lòng thử lại sau.</p>
                        </div>
                    ) : promotions && promotions.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {promotions.map(renderPromoCard)}
                        </div>
                    ) : (
                        <div className="backdrop-blur-md bg-white/95 p-16 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 flex flex-col items-center justify-center min-h-[400px]">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <Tag size={48} className="text-slate-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Chưa có khuyến mãi nào</h3>
                            <p className="text-slate-500 text-center max-w-md text-lg leading-relaxed">Hiện tại chúng tôi đang chuẩn bị những ưu đãi mới nhất. Hãy đăng ký nhận bản tin để được thông báo khi có mã giảm giá mới nhé!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
