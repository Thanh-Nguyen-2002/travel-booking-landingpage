import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, User, UserCircle, History, LogOut } from 'lucide-react';
import { Dropdown, Avatar } from 'antd';
import { useSettings } from '../../hooks/useSettings';
import { useScroll } from '../../hooks/useScroll';
import { useAuthStore } from '../../store/useAuthStore';

export const Header: React.FC = () => {
    const { data: settings } = useSettings();
    const { isScrolled } = useScroll(20);
    const { user, isAuthenticated, logout } = useAuthStore();
    const location = useLocation();

    const phone = settings?.hotline || '1900 1234';
    const email = settings?.contactEmail || 'contact@travelbooking.com';
    const siteName = settings?.siteName || 'Travel Booking';
    const logoUrl = settings?.logoUrl;

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const getLinkClass = (path: string) => {
        return `font-semibold text-sm transition-all duration-200 relative pb-1.5 ${isActive(path)
            ? 'text-primary-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600'
            : 'text-slate-600 hover:text-primary-600'
            }`;
    };

    return (
        <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md border-transparent' : 'shadow-sm border-b border-slate-100'}`}>
            {/* Top Bar */}
            <div className="bg-primary-500 text-white py-2 text-sm">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
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
                                    { key: 'profile', icon: <UserCircle size={18} className="text-slate-500" />, label: <Link to="/profile">Thông tin cá nhân</Link>, className: "py-2 h-12" },
                                    { key: 'bookings', icon: <History size={18} className="text-slate-500" />, label: <Link to="/bookings">Lịch sử đặt phòng</Link>, className: "py-2 h-12" },
                                    { type: 'divider' },
                                    { key: 'logout', icon: <LogOut size={18} />, label: <span onClick={() => { logout(); window.location.href = '/'; }}>Đăng xuất</span>, danger: true, className: "py-2 h-12" }
                                ],
                                className: "w-52 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl p-2 font-medium text-slate-700"
                            }} placement="bottomRight">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-primary-100 transition-colors">
                                    <Avatar size="small" src={user.avatarUrl} icon={!user.avatarUrl && <User size={14} />} className="bg-primary-400" />
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
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
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
                    <Link to="/" className={getLinkClass('/')}>Trang chủ</Link>
                    <Link to="/destinations" className={getLinkClass('/destinations')}>Điểm đến</Link>
                    <Link to="/hotels" className={getLinkClass('/hotels')}>Khách sạn</Link>
                    <Link to="/packages" className={getLinkClass('/packages')}>Tour du lịch</Link>
                    <Link to="/promotions" className={getLinkClass('/promotions')}>Khuyến mãi</Link>
                    <Link to="/blogs" className={getLinkClass('/blogs')}>Cẩm nang</Link>
                    <Link to="/about" className={getLinkClass('/about')}>Về chúng tôi</Link>
                    <Link to="/contact" className={getLinkClass('/contact')}>Liên hệ</Link>
                </nav>
            </div>
        </header>
    );
};
