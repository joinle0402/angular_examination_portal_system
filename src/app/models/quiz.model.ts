export interface Quiz {
    id: number;
    title: string;
    slug: string;
    description: string;
    maxMark: number;
    numberOfQuestion: number;
    active: boolean;
    category: {
        id: number;
        title: string;
        slug: string;
        description: string;
    };
}

export interface QuizPaginationResponse {
    content: Quiz[];
    currentPage: number;
    lastPage: boolean;
    limit: number;
    totalElements: number;
    totalPages: number;
}

export interface CreateQuizRequest {
    title: string;
    description: string;
    maxMark: number;
    numberOfQuestion: number;
    active: boolean;
    category: {
        id: number;
    };
}

export interface UpdateQuizRequest {
    id: number;
    title: string;
    description: string;
    maxMark: number;
    numberOfQuestion: number;
    active: boolean;
    category: {
        id: number;
    };
}
