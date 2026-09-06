import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { FallbackImage } from '../../../components/common/FallbackImage';
import type { BlogResponse } from '../../../types/blog';

interface BlogCardProps {
    blog: BlogResponse;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    return (
        <Link
            to={`/blogs/${blog.slug || blog.id}`}
            className="group flex flex-col bg-white rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
        >
            <div className="relative h-52 overflow-hidden shrink-0">
                <FallbackImage
                    src={blog.thumbnail || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1000'}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                {blog.categoryName && (
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-2 bg-white/95 backdrop-blur-md text-primary-600 text-xs font-bold rounded-[6px] shadow-sm">
                            {blog.categoryName}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-semibold">
                    <span className="flex items-center gap-1">
                        <Calendar size={13} /> {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                    <span className="flex items-center gap-1">
                        <User size={13} /> {blog.authorFullName || 'Admin'}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                    {blog.title}
                </h3>

                <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {blog.excerpt || 'Đọc tiếp để khám phá các thông tin du lịch cực kỳ hữu ích.'}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center text-primary-600 font-bold text-sm">
                    Xem chi tiết <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
            </div>
        </Link>
    );
};
