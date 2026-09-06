import React from 'react';
import { Input } from 'antd';
import { Search } from 'lucide-react';

interface PackageSearchBarProps {
    search: string;
    onSearchChange: (value: string) => void;
    totalCount: number;
}

export const PackageSearchBar: React.FC<PackageSearchBarProps> = ({
    search,
    onSearchChange,
    totalCount,
}) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3">
                <Input
                    size="large"
                    placeholder="Tìm kiếm tour..."
                    prefix={<Search className="text-slate-400 mr-2" size={18} />}
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="rounded-xl py-2.5"
                />
            </div>
            <div className="text-sm text-slate-500 font-medium">
                Hiển thị <span className="font-bold text-slate-800">{totalCount}</span> tour du lịch
            </div>
        </div>
    );
};
