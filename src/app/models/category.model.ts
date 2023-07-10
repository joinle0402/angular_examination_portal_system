export interface Category {
    id: number;
    title: string;
    description?: string;
}

export interface CreateCategoryRequest {
    title: string;
    description: string;
}
