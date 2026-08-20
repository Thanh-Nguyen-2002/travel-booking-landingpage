import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import { Scale, ShieldCheck, CreditCard, XCircle, FileText, AlertTriangle, UserCheck } from 'lucide-react';
import { ASSETS } from '../../config/assets';

export const TermsPage: React.FC = () => {
    const { data: settings } = useSettings();
    const termsContent = settings?.termsOfService;

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Section */}
            <div className="relative bg-slate-900 py-32 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${ASSETS.IMAGES.HERO_TERMS})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 z-10"></div>

                <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-bold rounded-full mb-4 border border-primary-500/30 uppercase tracking-widest">
                        Thỏa Thuận Sử Dụng
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">
                        Điều Khoản Dịch Vụ
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-medium leading-relaxed drop-shadow-sm">
                        Quy định chi tiết về quyền lợi, trách nhiệm và nguyên tắc hoạt động nhằm mang lại trải nghiệm du lịch an toàn, minh bạch cho mọi khách hàng.
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
                    {termsContent ? (
                        <div
                            className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
                            dangerouslySetInnerHTML={{ __html: termsContent }}
                        />
                    ) : (
                        <div className="space-y-16">
                            {/* Section 1 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-primary-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-50 transition-all duration-300">
                                            <ShieldCheck className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">1. Quy định chung</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Hiệu lực và sự chấp thuận các điều khoản khi sử dụng nền tảng.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Chào mừng Quý khách đến với hệ thống đặt tour và phòng khách sạn của chúng tôi. Bằng việc truy cập, đăng ký tài khoản hoặc sử dụng bất kỳ dịch vụ nào trên website, Quý khách được xem là đã đọc, hiểu và đồng ý ràng buộc bởi toàn bộ các Điều khoản Dịch vụ này một cách vô điều kiện.</p>
                                    <p>Chúng tôi bảo lưu quyền được sửa đổi, cập nhật hoặc loại bỏ bất kỳ phần nào trong Điều khoản này vào bất kỳ lúc nào mà không cần báo trước. Các thay đổi sẽ có hiệu lực ngay lập tức khi được đăng tải. Việc Quý khách tiếp tục sử dụng dịch vụ sau đó đồng nghĩa với việc Quý khách chấp nhận hoàn toàn những sửa đổi này.</p>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 2 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-indigo-500 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-300">
                                            <UserCheck className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">2. Quyền và Nghĩa vụ</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Trách nhiệm của khách hàng khi đăng ký thông tin đặt phòng và dịch vụ.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p><strong>Cung cấp thông tin:</strong> Quý khách có trách nhiệm cung cấp thông tin cá nhân (họ tên, CCCD/Passport, số điện thoại, email) một cách chính xác và đầy đủ. Chúng tôi không chịu trách nhiệm cho bất kỳ tổn thất, chi phí phát sinh hoặc việc từ chối dịch vụ nào từ phía đối tác (hãng hàng không, khách sạn) do thông tin Quý khách cung cấp bị sai lệch.</p>
                                    <p><strong>Bảo mật tài khoản:</strong> Nếu Quý khách tạo tài khoản trên hệ thống, Quý khách phải tự bảo mật thông tin đăng nhập. Mọi giao dịch được thực hiện dưới tài khoản của Quý khách sẽ được coi là do chính Quý khách thực hiện hoặc ủy quyền.</p>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 3 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-emerald-500 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-300">
                                            <CreditCard className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">3. Giá cả & Thanh toán</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Quy định về thanh toán, đặt cọc và chính sách giá hiển thị trên website.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Tất cả các báo giá trên website đã bao gồm thuế và phí dịch vụ (trừ khi có ghi chú khác). Giá có thể biến động theo thời điểm, tuy nhiên, mức giá tại thời điểm Quý khách <strong>hoàn tất thanh toán</strong> sẽ luôn được đảm bảo giữ nguyên.</p>
                                    <ul>
                                        <li><strong>Thanh toán toàn bộ:</strong> Bắt buộc đối với các booking cận ngày (dưới 7 ngày trước khởi hành) hoặc các chương trình khuyến mãi đặc biệt (Flash Sale, Early Bird).</li>
                                        <li><strong>Đặt cọc giữ chỗ:</strong> Cho phép với các tour dài ngày, số tiền cọc tối thiểu là 30% đến 50% tổng giá trị hợp đồng tùy theo quy định của từng gói.</li>
                                    </ul>
                                    <p>Chúng tôi hỗ trợ đa dạng phương thức thanh toán qua VNPAY, Thẻ Tín Dụng, và Chuyển khoản ngân hàng. Giao dịch được mã hóa và bảo mật chuẩn quốc tế.</p>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 4 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-rose-500 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-rose-50 transition-all duration-300">
                                            <XCircle className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">4. Chính sách Hủy & Hoàn</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Quy định về thời gian hủy, chi phí bồi thường và thủ tục hoàn tiền.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Trừ khi gói dịch vụ của Quý khách thuộc diện "Không hoàn hủy", chính sách hủy dịch vụ tiêu chuẩn được áp dụng như sau:</p>
                                    <ul className="marker:text-rose-400">
                                        <li>Hủy <strong>trước 14 ngày</strong> so với ngày khởi hành: Miễn phí hủy, hoàn trả 100% số tiền.</li>
                                        <li>Hủy <strong>từ 7 đến 13 ngày</strong> trước ngày khởi hành: Phí hủy là 50% tổng giá trị dịch vụ.</li>
                                        <li>Hủy <strong>trong vòng 7 ngày</strong> hoặc không đến (No-show): Phí hủy là 100% tổng giá trị dịch vụ.</li>
                                    </ul>
                                    <div className="bg-amber-50/80 border border-amber-200 p-5 mt-6 rounded-xl flex items-start gap-4">
                                        <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                                        <div className="text-sm text-amber-800">
                                            <strong className="block text-base mb-1">Trường hợp bất khả kháng:</strong>
                                            Thiên tai, dịch bệnh, chiến tranh hoặc lệnh cấm từ cơ quan chức năng. Chúng tôi sẽ hỗ trợ bảo lưu khoản thanh toán hoặc hoàn tiền theo quy định pháp luật và chính sách của nhà cung cấp.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 5 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-slate-200 transition-all duration-300">
                                            <FileText className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">5. Sở hữu trí tuệ</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Bản quyền nội dung, hình ảnh và tài sản trí tuệ trên nền tảng.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Tất cả nội dung trên website bao gồm nhưng không giới hạn ở: văn bản, hình ảnh, đồ họa, logo, biểu tượng, video, phần mềm đều thuộc sở hữu độc quyền của chúng tôi hoặc các đối tác cung cấp nội dung, được bảo vệ bởi luật sở hữu trí tuệ của Việt Nam và quốc tế.</p>
                                    <p>Nghiêm cấm mọi hành vi sao chép, phân phối, sửa đổi hoặc sử dụng nội dung cho mục đích thương mại mà không có sự đồng ý bằng văn bản của chúng tôi.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
