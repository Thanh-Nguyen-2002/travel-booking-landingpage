import React, { useState } from 'react';
import { Input, Pagination } from 'antd';
import { BookOpen, Search } from 'lucide-react';
import { BlogCardSkeleton } from '../../components/common/skeletons';
import { useBlogs } from './queries/useBlogs';
import { BlogHeaderBanner } from './components/BlogHeaderBanner';
import { BlogCard } from './components/BlogCard';

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
            <BlogHeaderBanner />

            <div className="max-w-6xl mx-auto px-4">
                {/* Search Bar */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="w-full md:w-1/3">
                        <Input
                            size="large"
                            placeholder="Tìm kiếm bài viết..."
                            prefix={<Search className="text-slate-400 mr-2" size={18} />}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(0);
                            }}
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
                                <BlogCard key={blog.id} blog={blog} />
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
