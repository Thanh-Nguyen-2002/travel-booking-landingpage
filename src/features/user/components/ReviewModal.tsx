import React, { useState, useEffect } from 'react';
import { Modal, Rate, Input, Button } from 'antd';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateReview } from '../queries/useCreateReview';

interface ReviewModalProps {
    open: boolean;
    onCancel: () => void;
    booking: any;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ open, onCancel, booking }) => {
    const { mutate: createReview, isPending: isSubmittingReview } = useCreateReview();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (open) {
            setRating(5);
            setComment('');
        }
    }, [open]);

    const handleSubmitReview = () => {
        if (!comment.trim()) {
            toast.warning('Vui lòng nhập nội dung đánh giá!');
            return;
        }

        const hotelId = booking?.rooms?.[0]?.hotelId;
        if (!hotelId) {
            toast.error('Không tìm thấy thông tin khách sạn để đánh giá!');
            return;
        }

        createReview({
            hotelId,
            roomId: booking.rooms[0].roomId,
            rating,
            comment
        }, {
            onSuccess: () => {
                toast.success('Gửi đánh giá thành công, đang chờ duyệt!');
                onCancel();
            },
            onError: (err: any) => {
                const msg = err.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá!';
                toast.error(msg);
            }
        });
    };

    return (
        <Modal
            title={
                <div className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                    Đánh giá Trải nghiệm
                </div>
            }
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            width={520}
            className="custom-review-modal"
            styles={{
                body: { borderRadius: '24px', padding: '32px' }
            }}
        >
            {booking && (
                <div className="py-2">
                    <div className="flex items-center gap-4 mb-8 p-5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-primary-200 transition-colors">
                        <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 z-10 border border-slate-100">
                            <Calendar className="text-primary-500" size={24} />
                        </div>
                        <div className="z-10">
                            <h4 className="font-bold text-slate-800 text-lg line-clamp-1 mb-1">{booking.packageName || 'Phòng Khách sạn'}</h4>
                            <div className="text-sm text-primary-600 font-semibold">{booking.rooms && booking.rooms.length > 0 ? booking.rooms[0].roomName : 'Phòng tiêu chuẩn'}</div>
                        </div>
                    </div>

                    <div className="mb-8 text-center">
                        <div className="text-slate-500 mb-4 font-medium text-base">Bạn đánh giá chuyến đi này bao nhiêu sao?</div>
                        <Rate
                            value={rating}
                            onChange={setRating}
                            className="text-5xl text-amber-400"
                        />
                    </div>

                    <div className="mb-8">
                        <div className="text-slate-700 mb-3 font-semibold flex items-center gap-2">
                            <span>Chia sẻ thêm</span>
                            <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Tùy chọn</span>
                        </div>
                        <Input.TextArea
                            rows={4}
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Trải nghiệm của bạn về dịch vụ, không gian, vị trí..."
                            className="rounded-2xl border-slate-200 hover:border-primary-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 text-base py-4 px-5 bg-slate-50/50 transition-all resize-none shadow-sm"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                        <Button
                            onClick={onCancel}
                            className="rounded-xl font-semibold px-6 h-12 border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            type="primary"
                            loading={isSubmittingReview}
                            onClick={handleSubmitReview}
                            className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 rounded-xl font-bold px-8 h-12 border-none shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
                        >
                            Gửi Đánh Giá
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};
