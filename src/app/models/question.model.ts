export interface Question {
    id: number;
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
}

export interface QuestionPaginationResponse {
    content: Question[];
    currentPage: number;
    lastPage: boolean;
    limit: number;
    totalElements: number;
    totalPages: number;
}

export interface CreateQuestionRequest {
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
    quiz: {
        id: number;
    };
}

export interface UpdateQuestionRequest {
    id: number;
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
    quiz: {
        id: number;
    };
}
