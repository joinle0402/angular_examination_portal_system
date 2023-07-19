export interface Category {
    id: number;
    title: string;
    slug: string;
    description?: string;
}

export interface CreateCategoryRequest {
    title: string;
    description: string;
}
