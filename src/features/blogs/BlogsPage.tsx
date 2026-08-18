import { Input, Pagination } from 'antd';
import { ArrowRight, BookOpen, Calendar, Search, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FallbackImage } from '../../components/common/FallbackImage';
import { BlogCardSkeleton } from '../../components/common/skeletons';
import { useBlogs } from './queries/useBlogs';


export const BlogsPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const pageSize = 9;

    const { data: pageData, isLoading, isError } = useBlogs(page, pageSize, search);

    const blogs = pageData?.data || [];
    const totalElements = pageData?.totalElements || 0;

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Banner Section */}
            <div className="relative bg-slate-900 text-white py-20 overflow-hidden mb-12">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2000')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-10"></div>
                <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
                    <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 text-sm font-bold rounded-full mb-4 border border-teal-500/30 uppercase tracking-widest">Blog & Cẩm Nang</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Cẩm Nang Du Lịch</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">Chia sẻ kinh nghiệm hành trình, bí kíp đặt phòng và tin tức du lịch mới nhất dành cho bạn.</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                {/* Search Bar */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="w-full md:w-1/3">
                        <Input
                            size="large"
                            placeholder="Tìm kiếm bài viết..."
                            prefix={<Search className="text-slate-400 mr-2" size={18} />}
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                            className="rounded-xl py-2.5"
                        />
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                        Có <span className="font-bold text-slate-800">{totalElements}</span> bài viết
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <BlogCardSkeleton key={index} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-24 bg-white rounded-xl border border-slate-100">
                        <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Đã xảy ra lỗi</h3>
                        <p className="text-slate-500">Vui lòng quay lại sau.</p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-xl border border-slate-100">
                        <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy bài viết</h3>
                        <p className="text-slate-500">Vui lòng thay đổi từ khóa tìm kiếm.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <Link
                                    key={blog.id}
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
                                            <span className="flex items-center gap-1"><Calendar size={13} /> {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('vi-VN')}</span>
                                            <span className="flex items-center gap-1"><User size={13} /> {blog.authorFullName || 'Admin'}</span>
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
                            ))}
                        </div>

                        {totalElements > pageSize && (
                            <div className="mt-12 flex justify-center">
                                <Pagination
                                    current={page + 1}
                                    total={totalElements}
                                    pageSize={pageSize}
                                    onChange={(p) => {
                                        setPage(p - 1);
                                        window.scrollTo(0, 0);
                                    }}
                                    showSizeChanger={false}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
