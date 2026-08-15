import React from 'react';
import { useSettings } from '../../hooks/useSettings';

export const PrivacyPage: React.FC = () => {
    const { data: settings } = useSettings();
    const privacyContent = settings?.privacyPolicy;

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Chính sách bảo mật</h1>
                    <p className="text-slate-300">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                    {privacyContent ? (
                        <div 
                            className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-500"
                            dangerouslySetInnerHTML={{ __html: privacyContent }} 
                        />
                    ) : (
                        <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-500">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Thu thập thông tin</h2>
                            <p>Chúng tôi thu thập các thông tin cá nhân của bạn như: Tên, địa chỉ email, số điện thoại, ngày sinh và thông tin thanh toán khi bạn tiến hành đặt dịch vụ. Thông tin này được thu thập nhằm mục đích xác nhận đặt phòng và cung cấp dịch vụ tốt nhất cho bạn.</p>
                            
                            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Bảo vệ dữ liệu cá nhân</h2>
                            <p>Bảo vệ quyền riêng tư của bạn là ưu tiên hàng đầu của chúng tôi. Chúng tôi sử dụng các công nghệ mã hóa tiêu chuẩn (SSL/TLS) để đảm bảo thông tin cá nhân và dữ liệu thanh toán của bạn luôn được an toàn trước các truy cập trái phép.</p>

                            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Chia sẻ thông tin</h2>
                            <p>Chúng tôi <strong>không bao giờ</strong> bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. Thông tin của bạn chỉ được chia sẻ với các đối tác (khách sạn, hãng hàng không, nhà cung cấp tour) ở mức độ cần thiết để hoàn tất việc đặt dịch vụ của bạn.</p>

                            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Quyền của bạn</h2>
                            <p>Bạn có toàn quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân của mình khỏi hệ thống của chúng tôi bất kỳ lúc nào. Hãy liên hệ với trung tâm hỗ trợ qua email nếu bạn có bất kỳ câu hỏi nào về quyền riêng tư.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
