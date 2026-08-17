import React from 'react';
import { useSettings } from '../../hooks/useSettings';

export const AboutPage: React.FC = () => {
    const { data: settings } = useSettings();
    const siteName = settings?.siteName || 'Travel Booking';
    const aboutUsContent = settings?.aboutUs;

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary-900 via-primary-700 to-primary-800 py-24 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-12 -right-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Về {siteName}</h1>
                    <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
                        Hành trình của chúng tôi là mang thế giới đến gần bạn hơn, với những trải nghiệm tuyệt vời và đáng nhớ nhất.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16 -mt-8 relative z-20">
                <div className="max-w-6xl mx-auto backdrop-blur-md bg-white/95 p-8 md:p-14 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50">
                    {aboutUsContent ? (
                        <div
                            className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-500"
                            dangerouslySetInnerHTML={{ __html: aboutUsContent }}
                        />
                    ) : (
                        <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-500">
                            <h2 className="text-3xl font-bold text-primary-600 mb-6">Câu chuyện của chúng tôi</h2>
                            <p>Khởi nguồn từ niềm đam mê xê dịch, chúng tôi tin rằng mỗi chuyến đi không chỉ là những dấu chân để lại, mà còn là những kỷ niệm vô giá khắc sâu trong tâm trí. Sứ mệnh của chúng tôi là trở thành người bạn đồng hành tin cậy, mang đến cho bạn những trải nghiệm du lịch trọn vẹn và an tâm nhất.</p>

                            <h3 className="text-2xl font-semibold mt-8 mb-4">Tầm nhìn chiến lược</h3>
                            <p>Trở thành nền tảng đặt phòng và tour du lịch hàng đầu, nơi công nghệ kết hợp hoàn hảo cùng dịch vụ tận tâm. Chúng tôi không ngừng đổi mới để mỗi cú click chuột của bạn đều mở ra một chân trời khám phá mới mẻ, xóa nhòa ranh giới địa lý.</p>

                            <h3 className="text-2xl font-semibold mt-8 mb-4">Giá trị cốt lõi</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong className="text-primary-600">Tận tâm:</strong> Khách hàng là trung tâm trong mọi quyết định và hành động.</li>
                                <li><strong className="text-primary-600">Minh bạch:</strong> Thông tin rõ ràng, giá cả trung thực, nói không với phí ẩn.</li>
                                <li><strong className="text-primary-600">Đổi mới:</strong> Luôn tìm kiếm những điểm đến mới lạ và nâng cấp công nghệ tiện ích.</li>
                            </ul>

                            <blockquote className="border-l-4 border-primary-500 pl-4 italic text-slate-600 mt-8 bg-primary-50 p-6 rounded-r-lg">
                                "Đích đến của chúng ta không phải là một vùng đất, mà là một cách nhìn mới." - Henry Miller
                            </blockquote>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
