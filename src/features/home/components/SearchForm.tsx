import React from 'react';
import { DatePicker, Select, InputNumber } from 'antd';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;

export const SearchForm: React.FC = () => {
    const navigate = useNavigate();

    const handleSearch = () => {
        // TODO: Build search URL params
        navigate('/hotels');
    };

    return (
        <div className="relative z-30 max-w-5xl mx-auto px-4 -mt-16 md:-mt-20">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center">
                
                {/* Destination */}
                <div className="flex-1 w-full border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3 bg-white hover:border-primary-400 transition-colors shadow-sm">
                    <MapPin className="text-primary-500 shrink-0" size={24} />
                    <div className="flex flex-col flex-1 w-full overflow-hidden">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Điểm đến</label>
                        <Select 
                            bordered={false}
                            className="w-full -ml-3 font-medium text-slate-800"
                            placeholder="Bạn muốn đi đâu?"
                            options={[
                                { value: 'hanoi', label: 'Hà Nội' },
                                { value: 'hcm', label: 'Hồ Chí Minh' },
                                { value: 'danang', label: 'Đà Nẵng' },
                                { value: 'phuquoc', label: 'Phú Quốc' },
                            ]}
                        />
                    </div>
                </div>

                {/* Dates */}
                <div className="flex-1 w-full border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3 bg-white hover:border-primary-400 transition-colors shadow-sm">
                    <Calendar className="text-primary-500 shrink-0" size={24} />
                    <div className="flex flex-col flex-1 w-full overflow-hidden">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Nhận - Trả phòng</label>
                        <RangePicker 
                            bordered={false}
                            className="w-full -ml-3 font-medium text-slate-800"
                            placeholder={['Ngày nhận', 'Ngày trả']}
                            format="DD/MM/YYYY"
                        />
                    </div>
                </div>

                {/* Guests */}
                <div className="flex-1 w-full border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3 bg-white hover:border-primary-400 transition-colors shadow-sm">
                    <Users className="text-primary-500 shrink-0" size={24} />
                    <div className="flex flex-col flex-1 w-full overflow-hidden">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Số khách</label>
                        <div className="flex items-center gap-2 -ml-3">
                            <InputNumber min={1} defaultValue={2} bordered={false} className="font-medium text-slate-800 w-16" /> 
                            <span className="text-slate-600 font-medium text-sm -ml-2">người</span>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <button 
                    onClick={handleSearch}
                    className="w-full md:w-auto h-full min-h-[64px] px-8 bg-slate-900 hover:bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 hover:shadow-primary-600/30 transition-all duration-300 shrink-0"
                >
                    <Search size={20} />
                    <span className="md:hidden lg:inline">Tìm kiếm</span>
                </button>
            </div>
        </div>
    );
};
