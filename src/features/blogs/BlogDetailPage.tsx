import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlogDetail } from './queries/useBlogDetail';
import { Loader2, Calendar, User, ArrowLeft, BookOpen, Tag } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
    const { idOrSlug } = useParams<{ idOrSlug: string }>();
    const { data: blog, isLoading, isError } = useBlogDetail(idOrSlug);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex justify-center items-center py-24">
                <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
            </div>
        );
    }

    if (isError || !blog) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-24 text-center">
                <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Không tìm thấy bài viết</h3>
                <p className="text-slate-500 mb-6">Có vẻ bài viết này đã bị xóa hoặc không khả dụng.</p>
                <Link to="/blogs" className="px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 transition-colors">
                    Quay lại cẩm nang
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Header section with back link */}
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Link to="/blogs" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 font-medium mb-8 transition-colors">
                    <ArrowLeft size={16} /> Quay lại danh sách bài viết
                </Link>
            </div>

            <article className="max-w-4xl mx-auto px-4">
                {/* Meta details */}
                <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm overflow-hidden space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {blog.categoryName && (
                            <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-lg">
                                {blog.categoryName}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-slate-400 font-semibold border-b border-slate-100 pb-6">
                        <div className="flex items-center gap-1.5">
                            <User size={16} className="text-slate-300" />
                            <span>Đăng bởi: {blog.authorFullName || 'Admin'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={16} className="text-slate-300" />
                            <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                    </div>

                    {/* Thumbnail */}
                    {blog.thumbnail && (
                        <div className="rounded-2xl overflow-hidden h-[400px] shadow-sm">
                            <img 
                                src={blog.thumbnail} 
                                alt={blog.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content body */}
                    <div className="prose prose-slate max-w-none prose-lg prose-headings:font-bold prose-a:text-primary-600 pt-4">
                        <div 
                            className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-line"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
                            <span className="text-sm text-slate-400 font-bold flex items-center gap-1"><Tag size={14} /> Tags:</span>
                            {blog.tags.map((tag) => (
                                <span key={tag.id} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};
