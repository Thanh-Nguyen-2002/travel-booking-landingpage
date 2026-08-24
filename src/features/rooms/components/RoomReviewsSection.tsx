import React from 'react';
import { format } from 'date-fns';
import { Star } from 'lucide-react';
import { FallbackImage } from '../../../components/common/FallbackImage';
import type { PageResponse } from '../../../types/common';
import type { ReviewResponse } from '../../reviews/queries/useReviews';

interface RoomReviewsSectionProps {
    reviewsData?: PageResponse<ReviewResponse>;
    isLoadingReviews: boolean;
}

export const RoomReviewsSection: React.FC<RoomReviewsSectionProps> = ({ reviewsData, isLoadingReviews }) => {
    return (
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
    );
};
