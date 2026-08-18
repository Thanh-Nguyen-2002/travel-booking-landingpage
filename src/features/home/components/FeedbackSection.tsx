import React from 'react';
import { Star, Quote } from 'lucide-react';
import { FeedbackImage } from '../../../components/common/FeedbackImage';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    avatarUrl?: string;
    rating: number;
    comment: string;
    destination: string;
}

const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Nguyễn Văn Nam',
        role: 'Khách du lịch',
        destination: 'Tour Phú Quốc - 3 Ngày 2 Đêm',
        rating: 5,
        comment: 'Chuyến đi Phú Quốc thật sự tuyệt vời! Khách sạn 5 sao có phòng view biển cực đẹp, dịch vụ xe đưa đón của GoTravel rất chuyên nghiệp và đúng giờ. Gia đình tôi rất hài lòng!',
        // No avatarUrl to demonstrate the dynamic gradient initials
    },
    {
        id: '2',
        name: 'Trần Thị Mai',
        role: 'Doanh nhân',
        destination: 'Khách sạn Vinpearl Resort Nha Trang',
        rating: 5,
        comment: 'Tôi và gia đình đã có kỳ nghỉ dưỡng trọn vẹn tại Nha Trang. Đặt phòng resort nhanh chóng, giá tốt hơn so với các bên khác. Đội ngũ hỗ trợ nhiệt tình 24/7 khi tôi cần đổi giờ bay.',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200'
    },
    {
        id: '3',
        name: 'Lê Minh Hoàng',
        role: 'Nhiếp ảnh gia',
        destination: 'Tour Hà Giang mùa hoa Tam Giác Mạch',
        rating: 5,
        comment: 'Giao diện website cực kỳ dễ sử dụng, đặt tour nhanh chóng. Hướng dẫn viên địa phương am hiểu văn hóa và chụp ảnh rất đẹp. Chắc chắn tôi sẽ tiếp tục lựa chọn GoTravel cho các hành trình tới.',
        // No avatarUrl to demonstrate the dynamic gradient initials
    }
];

export const FeedbackSection: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
            
            {/* Soft background glow */}
            <div className="absolute top-10 right-10 w-96 h-96 bg-primary-100/30 rounded-full filter blur-3xl opacity-60"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-100/50 rounded-full filter blur-3xl opacity-60"></div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary-600 font-extrabold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full">Đánh giá thực tế</span>
                    <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight mt-4">
                        Khách Hàng Nói Gì Về Chúng Tôi
                    </h2>
                    <p className="text-lg text-slate-600 mt-3 leading-relaxed">
                        Sự hài lòng của quý khách là niềm hạnh phúc lớn nhất của GoTravel. Cùng lắng nghe chia sẻ từ những người đã trải nghiệm dịch vụ của chúng tôi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item) => (
                        <div 
                            key={item.id}
                            className="group bg-white rounded-xl p-8 border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-primary-100 transition-all duration-300 flex flex-col justify-between relative"
                        >
                            {/* Quote Icon overlay */}
                            <Quote className="absolute top-6 right-8 w-12 h-12 text-slate-100/80 group-hover:text-primary-50 transition-colors duration-300 pointer-events-none" />

                            <div className="space-y-4 relative z-10">
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-slate-600 leading-relaxed text-sm italic">
                                    "{item.comment}"
                                </p>
                            </div>

                            {/* Author details */}
                            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                                <FeedbackImage 
                                    src={item.avatarUrl} 
                                    name={item.name}
                                    type="avatar"
                                    className="w-12 h-12 rounded-full object-cover ring-4 ring-slate-50 group-hover:ring-primary-50 transition-all"
                                />
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-slate-800 text-sm truncate">{item.name}</h4>
                                    <span className="text-slate-400 text-xs block mb-0.5">{item.role}</span>
                                    <span className="text-primary-600 font-semibold text-xs truncate block">{item.destination}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
