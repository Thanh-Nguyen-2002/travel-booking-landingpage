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
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-20 text-center text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Liên hệ với chúng tôi</h1>
                    <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
                        Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn mọi lúc, mọi nơi để đảm bảo bạn có chuyến đi hoàn hảo nhất.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-[-40px]">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-8">
                        {/* Info Column */}
                        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold mb-8 text-slate-800">Thông tin liên hệ</h2>
                            <ul className="space-y-8">
                                <li className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 shrink-0">
                                        <MapPin />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-slate-800 mb-1">Địa chỉ</h3>
                                        <p className="text-slate-600 leading-relaxed">{address}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 shrink-0">
                                        <Phone />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-slate-800 mb-1">Điện thoại</h3>
                                        <p className="text-slate-600 leading-relaxed">{phone}</p>
                                        <p className="text-sm text-slate-500 mt-1">Hỗ trợ 24/7</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 shrink-0">
                                        <Mail />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-slate-800 mb-1">Email</h3>
                                        <p className="text-slate-600 leading-relaxed">{email}</p>
                                        <p className="text-sm text-slate-500 mt-1">Sẽ phản hồi trong 24h</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Form Column */}
                        <div className="md:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold mb-6 text-slate-800">Gửi lời nhắn</h2>
                            <p className="text-slate-500 mb-8">Bạn có câu hỏi hoặc cần tư vấn? Hãy để lại thông tin, đội ngũ của chúng tôi sẽ liên hệ lại ngay.</p>
                            
                            <CmsForm form={form} layout="vertical" onFinish={onFinish}>
                                <div className="grid grid-cols-2 gap-4">
                                    <CmsForm.Item 
                                        name="name" 
                                        label="Họ và tên" 
                                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                    >
                                        <CmsInput placeholder="Ví dụ: Nguyễn Văn A" />
                                    </CmsForm.Item>
                                    <CmsForm.Item 
                                        name="phone" 
                                        label="Số điện thoại" 
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                    >
                                        <CmsInput placeholder="Ví dụ: 0912 345 678" />
                                    </CmsForm.Item>
                                </div>
                                <CmsForm.Item 
                                    name="email" 
                                    label="Địa chỉ Email" 
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: 'email', message: 'Email không hợp lệ!' }
                                    ]}
                                >
                                    <CmsInput placeholder="Ví dụ: email@domain.com" />
                                </CmsForm.Item>
                                <CmsForm.Item 
                                    name="message" 
                                    label="Nội dung" 
                                    rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                                >
                                    <CmsInput.TextArea rows={4} placeholder="Nhập nội dung cần tư vấn..." />
                                </CmsForm.Item>
                                <CmsButton 
                                    type="primary" 
                                    htmlType="submit" 
                                    className="w-full !bg-primary-500 hover:!bg-primary-600 !border-none mt-4"
                                    icon={<Send size={18} />}
                                >
                                    Gửi thông tin
                                </CmsButton>
                            </CmsForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
