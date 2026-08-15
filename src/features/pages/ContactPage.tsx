import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import { MapPin, Phone, Mail } from 'lucide-react';

export const ContactPage: React.FC = () => {
    const { data: settings } = useSettings();
    const phone = settings?.hotline || '1900 1234';
    const email = settings?.contactEmail || 'support@travelbooking.com';
    const address = settings?.address || 'Hà Nội, Việt Nam';

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-slate-800">Liên hệ với chúng tôi</h1>
                
                <div className="grid md:grid-cols-2 gap-12 mt-12">
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Thông tin liên hệ</h2>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 shrink-0">
                                    <MapPin />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-slate-800">Địa chỉ</h3>
                                    <p className="text-slate-600">{address}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 shrink-0">
                                    <Phone />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-slate-800">Điện thoại</h3>
                                    <p className="text-slate-600">{phone}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 shrink-0">
                                    <Mail />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-slate-800">Email</h3>
                                    <p className="text-slate-600">{email}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-semibold mb-6">Gửi tin nhắn</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                                <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500" placeholder="Nhập họ và tên..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500" placeholder="Nhập email của bạn..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung</label>
                                <textarea rows={4} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500" placeholder="Nhập nội dung tin nhắn..."></textarea>
                            </div>
                            <button type="button" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 rounded-lg transition-colors">
                                Gửi tin nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
