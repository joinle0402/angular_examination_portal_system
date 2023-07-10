import { Category } from 'src/app/models/category.model';

export interface Quiz {
    id: number;
    title: string;
    description: string;
    maxMark: number;
    numberOfQuestion: number;
    active: boolean;
    category: {
        id: number;
        title: string;
        description: string;
    };
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
