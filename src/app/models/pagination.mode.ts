export interface PaginationResponse<T> {
    content: T[];
    currentPage: number;
    lastPage: boolean;
    limit: number;
    totalElements: number;
    totalPages: number;
}
