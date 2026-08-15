import React from 'react';

export const PromotionsPage: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-rose-500 to-rose-700 py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Khuyến mãi & Ưu đãi</h1>
                    <p className="text-rose-100 text-lg max-w-2xl mx-auto">
                        Cập nhật những chương trình ưu đãi mới nhất và hấp dẫn nhất từ chúng tôi.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <p className="text-lg text-slate-500">
                        Chưa có chương trình khuyến mãi nào đang diễn ra. Hãy quay lại sau nhé!
                    </p>
                </div>
            </div>
        </div>
    );
};
