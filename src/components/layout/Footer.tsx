import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useSettings } from '../../hooks/useSettings';
import { useSubscribe } from '../../hooks/useSubscribe';
import { toast } from 'sonner';
import { CmsInput, CmsButton, CmsForm } from '../common';

interface SubscribeFormInputs {
    email: string;
}

export const Footer: React.FC = () => {
    const { data: settings } = useSettings();
    const { mutate: subscribe, isPending } = useSubscribe();
    const [form] = CmsForm.useForm<SubscribeFormInputs>();

    const phone = settings?.hotline || '1900 1234 (Tổng đài hỗ trợ 24/7)';
    const email = settings?.contactEmail || 'support@travelbooking.com';
    const address = settings?.address || 'Hà Nội, Việt Nam';
    const siteName = settings?.siteName || 'Travel Booking';
    const logoUrl = settings?.logoUrl;

    const fbLink = settings?.facebookUrl || '#';
    const twLink = settings?.social_twitter || '#';
    const igLink = settings?.social_instagram || '#';

    const onSubscribe = (data: SubscribeFormInputs) => {
        subscribe({ email: data.email }, {
            onSuccess: () => {
                toast.success('Đăng ký nhận bản tin thành công!');
                form.resetFields();
            },
            onError: () => {
                toast.error('Đăng ký thất bại, thử lại sau.');
            }
        });
    };

    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            {logoUrl ? (
                                <img src={logoUrl} alt={siteName} className="h-8 w-auto object-contain bg-white rounded" />
                            ) : (
                                <div className="w-8 h-8 bg-primary-500 rounded flex items-center justify-center text-white font-bold text-lg uppercase">
                                    {siteName.charAt(0)}
                                </div>
                            )}
                            <span className="text-xl font-bold text-white">{siteName}</span>
                        </Link>
                        <p className="text-slate-400 mb-6">
                            Khám phá thế giới cùng chúng tôi. Mang đến những trải nghiệm du lịch tuyệt vời nhất cho bạn.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href={fbLink || '#'}
                                target={fbLink && fbLink !== '#' ? "_blank" : undefined}
                                rel={fbLink && fbLink !== '#' ? "noreferrer" : undefined}
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                            >
                                <FaFacebookF size={18} />
                            </a>
                            <a
                                href={twLink || '#'}
                                target={twLink && twLink !== '#' ? "_blank" : undefined}
                                rel={twLink && twLink !== '#' ? "noreferrer" : undefined}
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
                            >
                                <FaTwitter size={18} />
                            </a>
                            <a
                                href={igLink || '#'}
                                target={igLink && igLink !== '#' ? "_blank" : undefined}
                                rel={igLink && igLink !== '#' ? "noreferrer" : undefined}
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
                            >
                                <FaInstagram size={18} />
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

                    {/* Contact & Newsletter */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Liên hệ</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3">
                                <MapPin size={20} className="text-primary-500 shrink-0" />
                                <span>{address}</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone size={20} className="text-primary-500 shrink-0" />
                                <span>{phone}</span>
                            </li>
                            <li className="flex gap-3">
                                <Mail size={20} className="text-primary-500 shrink-0" />
                                <span>{email}</span>
                            </li>
                        </ul>

                        <h3 className="text-white font-bold text-lg mb-4">Nhận bản tin</h3>
                        <CmsForm form={form} onFinish={onSubscribe} layout="vertical" className="w-full">
                            <CmsForm.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Email không hợp lệ!' }
                                ]}
                                style={{ marginBottom: '8px' }}
                            >
                                <CmsInput
                                    placeholder="Email của bạn..."
                                    className="footer-input"
                                />
                            </CmsForm.Item>
                            <CmsButton
                                type="primary"
                                htmlType="submit"
                                loading={isPending}
                                className="w-full mt-2 !bg-primary-500 hover:!bg-primary-600 !border-none"
                                icon={<Send size={18} />}
                            >
                                Đăng ký
                            </CmsButton>
                        </CmsForm>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} {siteName}. Đã đăng ký bản quyền.</p>
                </div>
            </div>
        </footer>
    );
};
