import React from 'react';
import { HeroBanner } from './components/HeroBanner';

export const Home: React.FC = () => {
    return (
        <div className="bg-white">
            <HeroBanner />
            
            {/* Future sections like Search Form, Top Destinations, Featured Hotels will go here */}
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">Các tính năng tiếp theo</h2>
                <p className="text-slate-500">Form Tìm kiếm - Điểm đến nổi bật - Khách sạn đang chờ được phát triển.</p>
            </div>
        </div>
    );
};
