import React from 'react';
import { Tag, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { usePromotions, type Promotion } from '../../hooks/usePromotions';

export const PromotionsPage: React.FC = () => {
    const { data: promotions, isLoading, isError } = usePromotions();

    const renderPromoCard = (promo: Promotion) => (
        <div key={promo.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-primary-100 relative">
                <div className="absolute inset-0 flex items-center justify-center text-primary-400">
                    <Tag size={64} className="opacity-50" />
                </div>
                <div className="absolute top-4 right-4 bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                    {promo.discountType === 'PERCENTAGE' ? `Giảm ${promo.discountValue}%` : `Giảm ${promo.discountValue.toLocaleString()}đ`}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{promo.code}</h3>
                <p className="text-slate-600 mb-4 line-clamp-2">{promo.description || 'Ưu đãi đặc biệt dành cho bạn. Săn ngay kẻo lỡ!'}</p>
                <div className="flex items-center text-sm text-slate-500 gap-2 mb-4">
                    <Calendar size={16} /> Áp dụng đến: {promo.endDate ? new Date(promo.endDate).toLocaleDateString('vi-VN') : 'Không thời hạn'}
                </div>
                <button className="w-full bg-primary-50 text-primary-600 hover:bg-primary-500 hover:text-white font-medium py-2.5 rounded-lg transition-colors">
                    Sử dụng mã {promo.code}
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen pb-16">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-20 text-center text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Khuyến mãi & Ưu đãi</h1>
                    <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
                        Săn ngay các deal du lịch cực hời chỉ có tại nền tảng của chúng tôi. Chuyến đi trong mơ nay rẻ bất ngờ!
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 mt-[-40px]">
                <div className="max-w-5xl mx-auto">
                    {isLoading ? (
                        <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                            <Loader2 size={40} className="text-primary-500 animate-spin mb-4" />
                            <p className="text-slate-500">Đang tải danh sách khuyến mãi...</p>
                        </div>
                    ) : isError ? (
                        <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-red-500">
                            <AlertCircle size={48} className="mb-4 opacity-50" />
                            <h3 className="text-xl font-bold mb-2 text-slate-800">Không thể tải dữ liệu</h3>
                            <p className="text-slate-500">Đã xảy ra lỗi khi kết nối tới máy chủ. Vui lòng thử lại sau.</p>
                        </div>
                    ) : promotions && promotions.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {promotions.map(renderPromoCard)}
                        </div>
                    ) : (
                        <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                            <Tag size={48} className="text-slate-300 mb-4" />
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Chưa có khuyến mãi nào</h3>
                            <p className="text-slate-500 text-center max-w-md">Hiện tại chúng tôi đang chuẩn bị những ưu đãi mới nhất. Hãy đăng ký nhận bản tin để được thông báo khi có mã giảm giá mới nhé!</p>
                        </div>
                    )}

                    <div className="mt-12 bg-primary-50 p-8 rounded-2xl text-center border border-primary-100">
                        <h3 className="text-2xl font-bold text-primary-800 mb-3">Chưa tìm thấy ưu đãi phù hợp?</h3>
                        <p className="text-primary-600 mb-6">Đăng ký nhận bản tin ở dưới Footer để không bỏ lỡ bất kỳ mã giảm giá "độc quyền" nào từ chúng tôi.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
