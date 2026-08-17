export type BlogStatus = "DRAFT" | "PUBLISHED";

export interface TagResponse {
    id: string;
    name: string;
    slug: string;
}

export interface CategoryResponse {
    id: string;
    name: string;
    slug: string;
}

export interface BlogResponse {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    excerpt: string;
    content: string;
    authorId: string;
    authorFullName: string;
    categoryId: string;
    categoryName: string;
    tags: TagResponse[];
    seoTitle: string;
    seoDescription: string;
    status: BlogStatus;
    publishedAt?: string;
    createdAt: string;
}
