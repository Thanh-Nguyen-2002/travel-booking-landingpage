import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, User, Search, MapPin, Building, Package } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-100">
            {/* Top Bar */}
            <div className="bg-primary-500 text-white py-2 text-sm">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex space-x-6">
                        <span className="flex items-center gap-2">
                            <Phone size={14} /> 1900 1234
                        </span>
                        <span className="hidden md:inline">contact@travelbooking.com</span>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <Link to="/login" className="hover:text-primary-100 flex items-center gap-1">
                            <User size={14} /> Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        TB
                    </div>
                    <span className="text-2xl font-bold text-slate-800">Travel Booking</span>
                </Link>

                <nav className="hidden md:flex space-x-8">
                    <Link to="/" className="text-primary-500 font-medium">Trang chủ</Link>
                    <Link to="/destinations" className="text-slate-600 hover:text-primary-500 flex items-center gap-1">
                        <MapPin size={16} /> Điểm đến
                    </Link>
                    <Link to="/hotels" className="text-slate-600 hover:text-primary-500 flex items-center gap-1">
                        <Building size={16} /> Khách sạn
                    </Link>
                    <Link to="/packages" className="text-slate-600 hover:text-primary-500 flex items-center gap-1">
                        <Package size={16} /> Tour & Package
                    </Link>
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
