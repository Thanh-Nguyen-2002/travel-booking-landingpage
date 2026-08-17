import React from 'react';
import { Tag, Calendar, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { usePromotions, type Promotion } from '../../hooks/usePromotions';

export const PromotionsPage: React.FC = () => {
    const { data: promotions, isLoading, isError } = usePromotions();

    const renderPromoCard = (promo: Promotion) => (
        <div key={promo.id} className="group bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
            <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-50 relative overflow-hidden shrink-0">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center text-primary-400/50 group-hover:scale-110 transition-transform duration-500">
                    <Tag size={80} strokeWidth={1} />
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-br from-rose-500 via-red-500 to-rose-600 p-[2px] rounded-lg shadow-[0_8px_20px_rgba(244,63,94,0.4)] group-hover:-translate-y-1 transition-transform duration-300">
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
                <button className="w-full mt-auto bg-gradient-to-r from-primary-50 to-slate-50 text-primary-600 hover:from-primary-500 hover:to-primary-600 hover:text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]">
                    Sử dụng mã {promo.code}
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen pb-16">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary-900 via-primary-700 to-primary-800 py-24 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-12 -right-24 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Khuyến mãi & Ưu đãi</h1>
                    <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
                        Săn ngay các deal du lịch cực hời chỉ có tại nền tảng của chúng tôi. Chuyến đi trong mơ nay rẻ bất ngờ!
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 mt-[-60px] relative z-20">
                <div className="max-w-6xl mx-auto">
                    {isLoading ? (
                        <div className="backdrop-blur-md bg-white/95 p-16 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 flex flex-col items-center justify-center min-h-[400px]">
                            <Loader2 size={48} className="text-primary-500 animate-spin mb-6" />
                            <p className="text-slate-500 text-lg">Đang tải danh sách khuyến mãi...</p>
                        </div>
                    ) : isError ? (
                        <div className="backdrop-blur-md bg-white/95 p-16 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 flex flex-col items-center justify-center text-red-500 min-h-[400px]">
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
