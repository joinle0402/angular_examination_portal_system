import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    CreateQuestionRequest,
    Question,
    QuestionPaginationResponse,
    UpdateQuestionRequest,
} from '../models/question.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    constructor(private readonly http: HttpClient) {}

    findByQuiz(quizId: number, currentPage: number = 1): Observable<QuestionPaginationResponse> {
        return this.http.get<QuestionPaginationResponse>(environment.API_URL + `/questions/quizzes/${quizId}`, {
            params: { page: currentPage },
        });
    }

    findByQuizSlug(quizSlug: string): Observable<Question[]> {
        return this.http.get<Question[]>(environment.API_URL + `/questions/slug/${quizSlug}`);
    }

    findById(questionId: number): Observable<Question> {
        return this.http.get<Question>(environment.API_URL + `/questions/${questionId}`);
    }

    create(createQuestionRequest: CreateQuestionRequest): Observable<Question> {
        return this.http.post<Question>(environment.API_URL + `/questions`, createQuestionRequest);
    }

    update(updateQuestionRequest: UpdateQuestionRequest): Observable<Question> {
        return this.http.put<Question>(environment.API_URL + '/questions', updateQuestionRequest);
    }

    delete(id: number): Observable<string> {
        return this.http.delete<string>(environment.API_URL + `/questions/${id}`, {
            headers: new HttpHeaders({
                Accept: 'text/plain, */*',
                'Content-Type': 'application/json',
            }),
            responseType: 'text' as 'json',
        });
    }
}
