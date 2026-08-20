import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import { Database, LockKeyhole, Share2, UserCog, BadgeCheck, AlertCircle } from 'lucide-react';
import { ASSETS } from '../../config/assets';

export const PrivacyPage: React.FC = () => {
    const { data: settings } = useSettings();
    const privacyContent = settings?.privacyPolicy;

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Section */}
            <div className="relative bg-slate-900 py-32 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${ASSETS.IMAGES.HERO_PRIVACY})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 z-10"></div>

                <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-bold rounded-full mb-4 border border-primary-500/30 uppercase tracking-widest">
                        Quyền Riêng Tư
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">
                        Chính Sách Bảo Mật
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-medium leading-relaxed drop-shadow-sm">
                        Cam kết tuyệt đối trong việc bảo vệ thông tin cá nhân của bạn. Mọi dữ liệu đều được mã hóa chuẩn quốc tế và quản lý minh bạch.
                    </p>
                    <div className="mt-8 flex items-center gap-4 text-sm font-semibold text-slate-300 bg-black/20 py-2.5 px-6 rounded-lg border border-white/10 backdrop-blur-md">
                        <span>Cập nhật lần cuối: 15/08/2026</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        <span>Phiên bản: 2.1.0</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 relative z-20 -mt-16">
                <div className="max-w-5xl mx-auto bg-white p-8 md:p-16 rounded-lg shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-slate-100">
                    {privacyContent ? (
                        <div
                            className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
                            dangerouslySetInnerHTML={{ __html: privacyContent }}
                        />
                    ) : (
                        <div className="space-y-16">
                            {/* Section 1 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-primary-600 rounded-lg flex items-center justify-center mb-5  group-hover:bg-primary-50 transition-all duration-300">
                                            <Database className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">1. Thu thập thông tin</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Phạm vi, mục đích và các loại dữ liệu cá nhân mà chúng tôi lưu trữ.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Khi Quý khách truy cập, đăng ký tài khoản hoặc sử dụng dịch vụ đặt tour/phòng khách sạn trên nền tảng của chúng tôi, hệ thống sẽ yêu cầu cung cấp một số thông tin định danh nhất định.</p>
                                    <ul>
                                        <li><strong>Thông tin định danh:</strong> Họ và tên, Ngày tháng năm sinh, Số CMND/CCCD hoặc Hộ chiếu (Passport).</li>
                                        <li><strong>Thông tin liên lạc:</strong> Địa chỉ Email, Số điện thoại, Địa chỉ thường trú.</li>
                                        <li><strong>Dữ liệu giao dịch:</strong> Lịch sử đặt phòng, Lịch sử tìm kiếm chuyến đi, Các đánh giá (Review) và phản hồi.</li>
                                    </ul>
                                    <p>Tất cả thông tin này được thu thập một cách tự nguyện nhằm mục đích xác thực danh tính, xử lý đơn đặt hàng, và cung cấp cho Quý khách trải nghiệm dịch vụ cá nhân hóa tốt nhất.</p>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 2 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-indigo-500 rounded-lg flex items-center justify-center mb-5  group-hover:bg-indigo-50 transition-all duration-300">
                                            <LockKeyhole className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">2. Bảo vệ dữ liệu</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Các biện pháp công nghệ và quy trình mã hóa bảo mật thông tin.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Bảo vệ quyền riêng tư của Quý khách là ưu tiên sống còn của chúng tôi. Chúng tôi áp dụng các tiêu chuẩn an ninh mạng khắt khe nhất để ngăn chặn rò rỉ dữ liệu.</p>
                                    <p>Toàn bộ thông tin truyền tải giữa trình duyệt của Quý khách và máy chủ của chúng tôi được mã hóa <strong>100% bằng giao thức SSL/TLS 256-bit</strong>. Thông tin thẻ tín dụng/tài khoản ngân hàng của Quý khách không bao giờ được lưu trữ trực tiếp trên máy chủ của chúng tôi, mà được xử lý qua cổng thanh toán đạt chuẩn PCI-DSS (Chuẩn bảo mật thanh toán quốc tế).</p>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 3 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-emerald-500 rounded-lg flex items-center justify-center mb-5  group-hover:bg-emerald-50 transition-all duration-300">
                                            <Share2 className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">3. Chia sẻ đối tác</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Điều kiện và giới hạn trong việc chia sẻ dữ liệu cho bên thứ ba.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Chúng tôi cam kết tuyệt đối <strong>không bán, cho thuê hoặc trao đổi</strong> thông tin cá nhân của Quý khách cho bất kỳ bên thứ ba nào vì mục đích quảng cáo hoặc trục lợi.</p>
                                    <p>Thông tin của Quý khách chỉ được cung cấp (với mức độ tối thiểu cần thiết) cho các đối tác trực tiếp thực hiện dịch vụ, bao gồm:</p>
                                    <ul className="marker:text-emerald-500">
                                        <li>Khách sạn, Hãng hàng không, Đơn vị vận chuyển liên quan trực tiếp đến chuyến đi.</li>
                                        <li>Cổng thanh toán điện tử (nhằm xử lý giao dịch).</li>
                                        <li>Cơ quan quản lý Nhà nước có thẩm quyền khi có yêu cầu bằng văn bản hợp pháp.</li>
                                    </ul>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 4 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-rose-500 rounded-lg flex items-center justify-center mb-5  group-hover:bg-rose-50 transition-all duration-300">
                                            <UserCog className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">4. Quyền của bạn</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Quyền tự quyết về việc chỉnh sửa, lưu trữ hoặc xóa bỏ dữ liệu cá nhân.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Với tư cách là chủ sở hữu dữ liệu, Quý khách luôn có toàn quyền kiểm soát thông tin cá nhân của mình:</p>
                                    <ul>
                                        <li>Quyền được xem, sao chép hoặc trích xuất toàn bộ dữ liệu cá nhân mà chúng tôi đang lưu trữ.</li>
                                        <li>Quyền chỉnh sửa, bổ sung nếu thông tin bị sai sót trực tiếp từ trang Quản lý Hồ Sơ.</li>
                                        <li>Quyền <strong>Yêu cầu xóa toàn bộ dữ liệu (Right to be Forgotten)</strong>: Quý khách có thể yêu cầu xóa vĩnh viễn tài khoản và thông tin cá nhân khỏi hệ thống của chúng tôi bất kỳ lúc nào.</li>
                                    </ul>
                                    <div className="bg-slate-50 border border-slate-200 p-5 mt-6 rounded-lg flex items-start gap-4">
                                        <AlertCircle className="w-6 h-6 text-slate-500 shrink-0 mt-0.5" />
                                        <div className="text-sm text-slate-700">
                                            Lưu ý: Một số thông tin liên quan đến Hóa đơn, Chứng từ thanh toán vẫn phải được lưu trữ trong một khoảng thời gian nhất định theo Luật Kế toán của Việt Nam ngay cả khi Quý khách đã xóa tài khoản.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 5 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-teal-600 rounded-lg flex items-center justify-center mb-5  group-hover:bg-teal-50 transition-all duration-300">
                                            <BadgeCheck className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">5. Cookie & Theo dõi</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Cách thức website sử dụng Cookie để cải thiện trải nghiệm người dùng.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Trang web sử dụng "Cookies" – các tệp văn bản nhỏ được lưu trên thiết bị của Quý khách – để ghi nhớ phiên đăng nhập, tùy chọn ngôn ngữ và thống kê lượng người truy cập ẩn danh nhằm nâng cấp chất lượng dịch vụ.</p>
                                    <p>Quý khách hoàn toàn có thể cấu hình trình duyệt để từ chối Cookies. Tuy nhiên, điều này có thể làm giảm trải nghiệm hoặc vô hiệu hóa một số tính năng tiện ích trên nền tảng của chúng tôi.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
