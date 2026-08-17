import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, User, Search } from 'lucide-react';
import { Dropdown, Avatar } from 'antd';
import { useSettings } from '../../hooks/useSettings';
import { useScroll } from '../../hooks/useScroll';
import { useAuthStore } from '../../store/useAuthStore';

export const Header: React.FC = () => {
    const { data: settings } = useSettings();
    const { isScrolled } = useScroll(20);
    const { user, isAuthenticated, logout } = useAuthStore();

    const phone = settings?.hotline || '1900 1234';
    const email = settings?.contactEmail || 'contact@travelbooking.com';
    const siteName = settings?.siteName || 'Travel Booking';
    const logoUrl = settings?.logoUrl;

    return (
        <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md border-transparent' : 'shadow-sm border-b border-slate-100'}`}>
            {/* Top Bar */}
            <div className="bg-primary-500 text-white py-2 text-sm">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex space-x-6">
                        <span className="flex items-center gap-2">
                            <Phone size={14} /> {phone}
                        </span>
                        <span className="hidden md:inline">{email}</span>
                    </div>
                    <div className="flex space-x-4 items-center">
                        {isAuthenticated && user ? (
                            <Dropdown menu={{
                                items: [
                                    { key: 'profile', label: <Link to="/profile">Thông tin cá nhân</Link> },
                                    { key: 'bookings', label: <Link to="/bookings">Lịch sử đặt phòng</Link> },
                                    { type: 'divider' },
                                    { key: 'logout', label: <span onClick={() => { logout(); window.location.href = '/'; }}>Đăng xuất</span>, danger: true }
                                ]
                            }} placement="bottomRight">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-primary-100 transition-colors">
                                    <Avatar size="small" src={user.avatar} icon={!user.avatar && <User size={14} />} className="bg-primary-400" />
                                    <span className="font-medium text-sm hidden md:inline">{user.fullName}</span>
                                </div>
                            </Dropdown>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-primary-100 flex items-center gap-1 transition-colors">
                                    <User size={14} /> Đăng nhập
                                </Link>
                                <span className="text-primary-300">|</span>
                                <Link to="/register" className="hover:text-primary-100 transition-colors">
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    {logoUrl ? (
                        <img src={logoUrl} alt={siteName} className="h-10 w-auto object-contain" />
                    ) : (
                        <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-xl uppercase">
                            {siteName.charAt(0)}
                        </div>
                    )}
                    <span className="text-2xl font-bold text-slate-800">{siteName}</span>
                </Link>

                <nav className="hidden md:flex space-x-8">
                    <Link to="/destinations" className="text-slate-600 hover:text-primary-500 font-medium transition-colors">Điểm đến</Link>
                    <Link to="/hotels" className="text-slate-600 hover:text-primary-500 font-medium transition-colors">Khách sạn</Link>
                    <Link to="/packages" className="text-slate-600 hover:text-primary-500 font-medium transition-colors">Tour du lịch</Link>
                    <Link to="/about" className="text-slate-600 hover:text-primary-500 font-medium transition-colors">Về chúng tôi</Link>
                    <Link to="/contact" className="text-slate-600 hover:text-primary-500 font-medium transition-colors">Liên hệ</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-600 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-colors">
                        <Search size={20} />
                    </button>
                    {/* Mobile menu button could go here */}
                </div>
            </div>
        </header>
    );
};
