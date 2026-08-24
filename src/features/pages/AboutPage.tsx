import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import { HeartHandshake, Map, Quote, Target, Telescope, Users } from 'lucide-react';
import { ASSETS } from '../../config/assets';
import { useBanners } from '../home/queries/useBanners';

export const AboutPage: React.FC = () => {
    const { data: settings } = useSettings();
    const siteName = settings?.siteName || 'Travel Booking';
    const aboutUsContent = settings?.aboutUs;

    const { data: banners } = useBanners('ABOUT_HEADER');
    const banner = banners && banners.length > 0 ? banners[0] : null;
    const bannerUrl = banner?.imageUrl || ASSETS.IMAGES.HERO_ABOUT;
    const bannerTitle = banner?.title || `Về ${siteName}`;
    const bannerDesc = banner?.description || 'Hành trình của chúng tôi là mang thế giới đến gần bạn hơn, biến mỗi chuyến đi thành một kỷ niệm vô giá khắc sâu trong tâm trí.';

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Section */}
            <div className="relative bg-slate-900 py-32 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-1000" style={{ backgroundImage: `url(${bannerUrl})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 z-10"></div>

                <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-bold rounded-full mb-4 border border-primary-500/30 uppercase tracking-widest">
                        Câu Chuyện Thương Hiệu
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm transition-all duration-500">
                        {bannerTitle}
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-medium leading-relaxed drop-shadow-sm transition-all duration-500">
                        {bannerDesc}
                    </p>
                    <div className="mt-8 flex items-center gap-4 text-sm font-semibold text-slate-300 bg-black/20 py-2.5 px-6 rounded-lg border border-white/10 backdrop-blur-md">
                        <span>Thành lập: 2026</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        <span>Sứ mệnh: Vươn tầm thế giới</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 relative z-20 -mt-16">
                <div className="max-w-5xl mx-auto bg-white p-8 md:p-16 rounded-lg shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-slate-100">
                    {aboutUsContent ? (
                        <div
                            className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
                            dangerouslySetInnerHTML={{ __html: aboutUsContent }}
                        />
                    ) : (
                        <div className="space-y-16">
                            {/* Section 1 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-primary-600 rounded-lg flex items-center justify-center mb-5  group-hover:bg-primary-50 transition-all duration-300">
                                            <Map className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">1. Câu chuyện khởi nguồn</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Nguồn cảm hứng đằng sau sự ra đời của {siteName}.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Khởi nguồn từ niềm đam mê xê dịch bất tận của những người trẻ tuổi, chúng tôi tin rằng mỗi chuyến đi không chỉ đơn thuần là sự di chuyển giữa các tọa độ địa lý, mà còn là hành trình tìm kiếm, khám phá bản thân và kết nối với những nền văn hóa đa dạng trên toàn cầu.</p>
                                    <p>Được thành lập với khao khát phá vỡ những rào cản cản trở đam mê du lịch – như rào cản thông tin, rào cản ngôn ngữ và rào cản về sự tin cậy – {siteName} ra đời nhằm mang đến một nền tảng du lịch số toàn diện, thân thiện và minh bạch tuyệt đối.</p>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 2 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-indigo-500 rounded-lg flex items-center justify-center mb-5  group-hover:bg-indigo-50 transition-all duration-300">
                                            <Telescope className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">2. Tầm nhìn chiến lược</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Định hướng phát triển dài hạn trong thập kỷ tới.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Trở thành nền tảng hệ sinh thái đặt dịch vụ du lịch (Online Travel Agency - OTA) hàng đầu khu vực Châu Á, nơi mà công nghệ tối tân kết hợp hoàn hảo cùng sự tận tâm của con người.</p>
                                    <p>Chúng tôi không ngừng đổi mới công nghệ AI, phân tích dữ liệu lớn (Big Data) để cá nhân hóa hóa trải nghiệm, đảm bảo mỗi cú click chuột của bạn đều mở ra một chân trời khám phá mới mẻ, dễ dàng và tiết kiệm thời gian nhất.</p>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 3 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-emerald-500 rounded-lg flex items-center justify-center mb-5  group-hover:bg-emerald-50 transition-all duration-300">
                                            <Target className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">3. Sứ mệnh cốt lõi</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Giá trị thực tế chúng tôi mang lại cho cộng đồng.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Sứ mệnh của chúng tôi là trao quyền để bất kỳ ai cũng có thể xách ba lô lên và đi một cách tự tin nhất. Chúng tôi cam kết mang lại:</p>
                                    <ul className="marker:text-emerald-500">
                                        <li><strong>Chất lượng dịch vụ hoàn hảo:</strong> Hợp tác độc quyền với các mạng lưới khách sạn, hàng không đạt chuẩn.</li>
                                        <li><strong>Giao dịch an toàn:</strong> 100% thanh toán được bảo vệ, chính sách hoàn hủy linh hoạt.</li>
                                        <li><strong>Hỗ trợ không giới hạn:</strong> Đội ngũ tư vấn trực tuyến 24/7 luôn sẵn sàng gỡ rối mọi tình huống phát sinh.</li>
                                    </ul>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 4 */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                                <div className="md:w-1/3 shrink-0">
                                    <div className="">
                                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-rose-500 rounded-lg flex items-center justify-center mb-5  group-hover:bg-rose-50 transition-all duration-300">
                                            <HeartHandshake className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">4. Giá trị văn hóa</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Kim chỉ nam cho mọi hành động và quyết định của tổ chức.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:border-rose-200 transition-colors">
                                            <h4 className="text-lg font-bold text-slate-800 mb-2 mt-0">Khách hàng là trọng tâm</h4>
                                            <p className="text-sm m-0">Lắng nghe thấu cảm và hành động vì lợi ích cao nhất của khách hàng.</p>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:border-rose-200 transition-colors">
                                            <h4 className="text-lg font-bold text-slate-800 mb-2 mt-0">Minh bạch tuyệt đối</h4>
                                            <p className="text-sm m-0">Cam kết không phí ẩn, mọi thông tin đều rõ ràng, trung thực.</p>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:border-rose-200 transition-colors">
                                            <h4 className="text-lg font-bold text-slate-800 mb-2 mt-0">Phát triển bền vững</h4>
                                            <p className="text-sm m-0">Thúc đẩy du lịch xanh, tôn trọng môi trường và văn hóa bản địa.</p>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:border-rose-200 transition-colors">
                                            <h4 className="text-lg font-bold text-slate-800 mb-2 mt-0">Tinh thần đổi mới</h4>
                                            <p className="text-sm m-0">Dám nghĩ lớn, dám thử thách những khuôn mẫu cũ kỹ.</p>
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
                                            <Users className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">5. Lời kết</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Thông điệp từ đội ngũ sáng lập của {siteName}.</p>
                                    </div>
                                </div>
                                <div className="md:w-2/3 prose prose-slate prose-lg text-slate-600">
                                    <p>Mỗi thành viên tại {siteName} đều mang trong mình trái tim rực lửa của một lữ khách. Chúng tôi xây dựng sản phẩm này bằng chính những trăn trở và khát khao của mình trên những chặng đường đã qua.</p>

                                    <div className="bg-slate-800 text-white p-8 mt-8 rounded-lg flex flex-col gap-4 relative overflow-hidden shadow-xl">
                                        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10">
                                            <Quote className="w-32 h-32" />
                                        </div>
                                        <Quote className="w-8 h-8 text-teal-400 relative z-10" />
                                        <p className="text-xl font-light italic leading-relaxed m-0 relative z-10">
                                            "Đích đến của chúng ta không phải là một vùng đất, mà là một cách nhìn mới."
                                        </p>
                                        <div className="mt-2 text-sm text-slate-400 font-medium tracking-wider uppercase relative z-10">
                                            — Henry Miller
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
