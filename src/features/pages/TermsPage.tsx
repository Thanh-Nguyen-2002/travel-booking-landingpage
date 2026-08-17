import React from 'react';
import { useSettings } from '../../hooks/useSettings';

export const TermsPage: React.FC = () => {
    const { data: settings } = useSettings();
    const termsContent = settings?.termsOfService;

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary-900 via-primary-700 to-primary-800 py-24 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-12 -right-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Điều khoản dịch vụ</h1>
                    <p className="text-primary-100 text-lg">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16 -mt-8 relative z-20">
                <div className="max-w-6xl mx-auto backdrop-blur-md bg-white/95 p-8 md:p-14 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50">
                    {termsContent ? (
                        <div
                            className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-500"
                            dangerouslySetInnerHTML={{ __html: termsContent }}
                        />
                    ) : (
                        <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-500">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Chấp nhận các điều khoản</h2>
                            <p>Bằng việc truy cập và sử dụng trang web này, bạn đồng ý tuân thủ các Điều khoản Dịch vụ của chúng tôi. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.</p>

                            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Đặt phòng và Thanh toán</h2>
                            <p>Tất cả các đặt phòng và tour du lịch đều phụ thuộc vào tình trạng sẵn có. Giá cả có thể thay đổi mà không cần báo trước, nhưng mức giá bạn đã xác nhận tại thời điểm đặt sẽ luôn được giữ nguyên. Chúng tôi yêu cầu thanh toán đầy đủ hoặc đặt cọc theo tỷ lệ phần trăm được quy định tùy từng gói dịch vụ.</p>

                            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Chính sách Hủy và Hoàn tiền</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Hủy trước 14 ngày so với ngày khởi hành: Hoàn 100% số tiền đã thanh toán.</li>
                                <li>Hủy từ 7-13 ngày trước ngày khởi hành: Hoàn 50% số tiền đã thanh toán.</li>
                                <li>Hủy dưới 7 ngày trước ngày khởi hành: Không hoàn tiền.</li>
                            </ul>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded-r text-sm text-blue-800">
                                <strong>Lưu ý:</strong> Một số chương trình khuyến mãi đặc biệt có thể áp dụng chính sách hủy/hoàn tiền riêng (Không hoàn, Không hủy).
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Quyền và Trách nhiệm</h2>
                            <p>Bạn chịu trách nhiệm cung cấp thông tin chính xác khi đặt dịch vụ. Chúng tôi không chịu trách nhiệm đối với các tổn thất phát sinh do bạn cung cấp sai thông tin (như sai tên, sai ngày tháng, số hộ chiếu hết hạn...).</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
