import React from 'react';
import { Tabs } from 'antd';
import { decodeHtmlEntities } from '../../../utils/html';
import type { PackageResponse } from '../../../types/package';

interface PackageDetailTabsProps {
    pkg: PackageResponse;
}

interface ItineraryItem {
    day: number | string;
    title: string;
    activities?: string[];
}

export const PackageDetailTabs: React.FC<PackageDetailTabsProps> = ({ pkg }) => {
    const tabItems = [
        {
            key: 'overview',
            label: 'Tổng quan',
            children: (
                <div className="py-4">
                    {pkg.overviewHtml ? (
                        <div
                            className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600"
                            dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(pkg.overviewHtml) }}
                        />
                    ) : (
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {pkg.description || 'Chưa có thông tin tổng quan chi tiết.'}
                        </p>
                    )}
                </div>
            )
        },
        {
            key: 'itinerary',
            label: 'Lịch trình chi tiết',
            children: (
                <div className="py-4">
                    {pkg.itinerary ? (
                        (() => {
                            try {
                                const parsed = JSON.parse(pkg.itinerary);
                                if (Array.isArray(parsed)) {
                                    return (
                                        <div className="relative border-l-2 border-primary-200 ml-4 py-2 space-y-8 mt-4">
                                            {parsed.map((item: ItineraryItem, index: number) => (
                                                <div key={index} className="relative pl-8">
                                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-primary-500 shadow-sm" />

                                                    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex flex-wrap items-center gap-3 mb-4 border-b border-slate-50 pb-3">
                                                            <span className="px-3 py-1.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-bold rounded-lg shadow-sm whitespace-nowrap">
                                                                Ngày {item.day}
                                                            </span>
                                                            <h4 className="text-lg font-bold text-slate-800">{item.title}</h4>
                                                        </div>

                                                        {item.activities && Array.isArray(item.activities) && (
                                                            <ul className="space-y-3">
                                                                {item.activities.map((act: string, actIdx: number) => (
                                                                    <li key={actIdx} className="flex items-start gap-3 text-slate-600">
                                                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                                                                        <span className="leading-relaxed">{act}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                                return <div className="whitespace-pre-line text-slate-600 leading-relaxed prose prose-slate max-w-none">{pkg.itinerary}</div>;
                            } catch {
                                return <div className="whitespace-pre-line text-slate-600 leading-relaxed prose prose-slate max-w-none">{pkg.itinerary}</div>;
                            }
                        })()
                    ) : (
                        <p className="text-slate-500 italic">Chưa có lịch trình chi tiết được cập nhật.</p>
                    )}
                </div>
            )
        },
        {
            key: 'includes',
            label: 'Dịch vụ bao gồm',
            children: (
                <div className="py-4 space-y-4">
                    <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-6">
                        <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Bao gồm trong chi phí
                        </h4>
                        {pkg.includes ? (
                            <div className="whitespace-pre-line text-slate-600 leading-relaxed text-sm">{pkg.includes}</div>
                        ) : (
                            <p className="text-slate-500 italic">Đã bao gồm xe đưa đón, hướng dẫn viên và vé tham quan.</p>
                        )}
                    </div>
                </div>
            )
        },
        {
            key: 'excludes',
            label: 'Không bao gồm',
            children: (
                <div className="py-4 space-y-4">
                    <div className="bg-rose-50/50 border border-rose-100/50 rounded-xl p-6">
                        <h4 className="font-bold text-rose-800 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Không bao gồm trong chi phí
                        </h4>
                        {pkg.excludes ? (
                            <div className="whitespace-pre-line text-slate-600 leading-relaxed text-sm">{pkg.excludes}</div>
                        ) : (
                            <p className="text-slate-500 italic">Không bao gồm chi phí cá nhân ngoài chương trình, thuế VAT.</p>
                        )}
                    </div>
                </div>
            )
        },
        {
            key: 'terms',
            label: 'Điều khoản & Lưu ý',
            children: (
                <div className="py-4">
                    {pkg.termsHtml ? (
                        <div
                            className="prose prose-slate max-w-none prose-img:rounded-xl prose-headings:text-slate-800 prose-a:text-primary-600"
                            dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(pkg.termsHtml) }}
                        />
                    ) : (
                        <p className="text-slate-500 italic">Chưa có thông tin điều khoản và lưu ý.</p>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-100 shadow-sm">
            <Tabs defaultActiveKey="itinerary" items={tabItems} className="custom-tabs" />
        </div>
    );
};
