import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-primary-500 rounded flex items-center justify-center text-white font-bold text-lg">
                                TB
                            </div>
                            <span className="text-xl font-bold text-white">Travel Booking</span>
                        </Link>
                        <p className="text-slate-400 mb-6">
                            Khám phá thế giới cùng chúng tôi. Mang đến những trải nghiệm du lịch tuyệt vời nhất cho bạn.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                                {/* <Facebook size={18} /> */}
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                                {/* <Twitter size={18} /> */}
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                                {/* <Instagram size={18} /> */}
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Khám phá</h3>
                        <ul className="space-y-3">
                            <li><Link to="/destinations" className="hover:text-primary-400 transition-colors">Điểm đến yêu thích</Link></li>
                            <li><Link to="/hotels" className="hover:text-primary-400 transition-colors">Khách sạn nổi bật</Link></li>
                            <li><Link to="/packages" className="hover:text-primary-400 transition-colors">Tour du lịch</Link></li>
                            <li><Link to="/promotions" className="hover:text-primary-400 transition-colors">Khuyến mãi & Ưu đãi</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Hỗ trợ khách hàng</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="hover:text-primary-400 transition-colors">Về chúng tôi</Link></li>
                            <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Liên hệ</Link></li>
                            <li><Link to="/terms" className="hover:text-primary-400 transition-colors">Điều khoản dịch vụ</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Chính sách bảo mật</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Liên hệ</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <MapPin size={20} className="text-primary-500 shrink-0" />
                                <span>123 Đường Tôn Đức Thắng, Quận 1, TP. Hồ Chí Minh</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone size={20} className="text-primary-500 shrink-0" />
                                <span>1900 1234 (Tổng đài hỗ trợ 24/7)</span>
                            </li>
                            <li className="flex gap-3">
                                <Mail size={20} className="text-primary-500 shrink-0" />
                                <span>support@travelbooking.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Travel Booking. Đã đăng ký bản quyền.</p>
                </div>
            </div>
        </footer>
    );
};
