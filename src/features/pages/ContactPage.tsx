import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { CmsForm, CmsInput, CmsButton } from '../../components/common';
import { toast } from 'sonner';

export const ContactPage: React.FC = () => {
    const { data: settings } = useSettings();
    const phone = settings?.hotline || '1900 1234';
    const email = settings?.contactEmail || 'support@travelbooking.com';
    const address = settings?.address || 'Hà Nội, Việt Nam';
    const [form] = CmsForm.useForm();

    const onFinish = () => {
        toast.success("Cảm ơn bạn! Lời nhắn của bạn đã được gửi đi. Chúng tôi sẽ phản hồi sớm nhất có thể.");
        form.resetFields();
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-16">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary-900 via-primary-700 to-primary-800 py-24 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-12 -right-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Liên hệ với chúng tôi</h1>
                    <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
                        Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn mọi lúc, mọi nơi để đảm bảo bạn có chuyến đi hoàn hảo nhất.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-[-60px] relative z-20">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-2 md:p-3 overflow-hidden border border-slate-100">
                        <div className="grid md:grid-cols-5 gap-0 md:gap-4 h-full">
                            {/* Info Column (Dark/Primary Gradient) */}
                            <div className="md:col-span-2 relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-10 rounded-xl text-white overflow-hidden shadow-inner">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold mb-2">Thông tin liên hệ</h2>
                                    <p className="text-primary-100 mb-10 text-sm md:text-base leading-relaxed">Luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ với chúng tôi qua các kênh dưới đây.</p>

                                    <ul className="space-y-8">
                                        <li className="flex items-start gap-5 group">
                                            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                                                <MapPin className="w-5 h-5 text-primary-50 group-hover:text-white transition-colors" />
                                            </div>
                                            <div className="pt-1">
                                                <h3 className="font-semibold text-lg mb-1">Địa chỉ</h3>
                                                <p className="text-primary-100 leading-relaxed text-sm">{address}</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-5 group">
                                            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                                                <Phone className="w-5 h-5 text-primary-50 group-hover:text-white transition-colors" />
                                            </div>
                                            <div className="pt-1">
                                                <h3 className="font-semibold text-lg mb-1">Điện thoại</h3>
                                                <p className="text-primary-100 leading-relaxed text-sm">{phone}</p>
                                                <p className="text-primary-300 text-xs mt-1">Hỗ trợ 24/7</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-5 group">
                                            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                                                <Mail className="w-5 h-5 text-primary-50 group-hover:text-white transition-colors" />
                                            </div>
                                            <div className="pt-1">
                                                <h3 className="font-semibold text-lg mb-1">Email</h3>
                                                <p className="text-primary-100 leading-relaxed text-sm">{email}</p>
                                                <p className="text-primary-300 text-xs mt-1">Sẽ phản hồi trong 24h</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Form Column */}
                            <div className="md:col-span-3 p-8 md:p-12 relative">
                                {/* Decorative subtle background pattern */}
                                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>

                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold mb-2 text-slate-800">Gửi lời nhắn</h2>
                                    <p className="text-slate-500 mb-8 text-base">Bạn có câu hỏi hoặc cần tư vấn? Hãy để lại thông tin, đội ngũ của chúng tôi sẽ liên hệ lại ngay.</p>

                                    <CmsForm form={form} layout="vertical" onFinish={onFinish}>
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                            <CmsForm.Item
                                                name="name"
                                                label={<span className="text-slate-700 font-medium">Họ và tên</span>}
                                                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                            >
                                                <CmsInput placeholder="Ví dụ: Nguyễn Văn A" className="h-12 rounded-lg hover:border-primary-400 focus:border-primary-500 transition-colors" />
                                            </CmsForm.Item>
                                            <CmsForm.Item
                                                name="phone"
                                                label={<span className="text-slate-700 font-medium">Số điện thoại</span>}
                                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                            >
                                                <CmsInput placeholder="Ví dụ: 0912 345 678" className="h-12 rounded-lg hover:border-primary-400 focus:border-primary-500 transition-colors" />
                                            </CmsForm.Item>
                                        </div>
                                        <CmsForm.Item
                                            name="email"
                                            label={<span className="text-slate-700 font-medium">Địa chỉ Email</span>}
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập email!' },
                                                { type: 'email', message: 'Email không hợp lệ!' }
                                            ]}
                                        >
                                            <CmsInput placeholder="Ví dụ: email@domain.com" className="h-12 rounded-lg hover:border-primary-400 focus:border-primary-500 transition-colors" />
                                        </CmsForm.Item>
                                        <CmsForm.Item
                                            name="message"
                                            label={<span className="text-slate-700 font-medium">Nội dung</span>}
                                            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                                        >
                                            <CmsInput.TextArea rows={4} placeholder="Nhập nội dung cần tư vấn..." className="rounded-lg hover:border-primary-400 focus:border-primary-500 transition-colors resize-none py-3" />
                                        </CmsForm.Item>

                                        <div className="pt-2">
                                            <CmsButton
                                                type="primary"
                                                htmlType="submit"
                                                className="w-full md:w-auto px-8 h-12 text-base font-semibold bg-slate-900 hover:!bg-primary-600 !border-none shadow-lg shadow-slate-200 hover:shadow-primary-500/30 transition-all duration-300 rounded-xl flex items-center justify-center gap-2 text-white"
                                                icon={<Send size={18} />}
                                            >
                                                Gửi tin nhắn ngay
                                            </CmsButton>
                                        </div>
                                    </CmsForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
