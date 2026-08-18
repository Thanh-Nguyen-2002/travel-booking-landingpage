import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { useBlogs } from '../../blogs/queries/useBlogs';
import { Link } from 'react-router-dom';
import { FallbackImage } from '../../../components/common/FallbackImage';
import { BlogCardSkeleton } from '../../../components/common/skeletons';

export const BlogsSection: React.FC = () => {
    // Fetch 3 latest blogs for the home page
    const { data: pageData, isLoading, isError } = useBlogs(0, 3);

    if (isLoading) {
        return (
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Background Blob */}
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-800 mb-4">Cẩm nang du lịch</h2>
                            <p className="text-lg text-slate-600 max-w-2xl">Cập nhật những tin tức, bí kíp và kinh nghiệm hữu ích nhất cho chuyến đi của bạn.</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-primary-600 font-semibold opacity-50">
                            Xem tất cả bài viết <ArrowRight size={20} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <BlogCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (isError || !pageData?.data || pageData.data.length === 0) {
        return null;
    }

    const blogs = pageData.data;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Cẩm nang du lịch</h2>
                        <p className="text-lg text-slate-600 max-w-2xl">Cập nhật những tin tức, bí kíp và kinh nghiệm hữu ích nhất cho chuyến đi của bạn.</p>
                    </div>
                    <Link to="/blogs" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                        Xem tất cả bài viết <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <Link
                            key={blog.id}
                            to={`/blogs/${blog.slug}`}
                            className="group flex flex-col bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 h-full"
                        >
                            <div className="relative h-56 overflow-hidden shrink-0">
                                <FallbackImage
                                    src={blog.thumbnail || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2000'}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-40 group-hover:opacity-50 transition-opacity duration-300"></div>

                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-2 bg-white/95 backdrop-blur-md text-primary-600 text-xs font-bold rounded-[6px] shadow-sm">
                                        {blog.categoryName || 'Tin tức'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col grow">
                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} />
                                        <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <User size={14} />
                                        <span className="line-clamp-1">{blog.authorFullName || 'Admin'}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                                    {blog.title}
                                </h3>

                                <p className="text-slate-600 line-clamp-3 text-sm leading-relaxed mb-4">
                                    {blog.excerpt || 'Đọc thêm để khám phá nội dung chi tiết...'}
                                </p>

                                <div className="mt-auto pt-4 flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors">
                                    Đọc tiếp <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-10 text-center md:hidden">
                    <Link to="/blogs" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                        Xem tất cả bài viết <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};
