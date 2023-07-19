import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateQuizRequest, Quiz, QuizPaginationResponse, UpdateQuizRequest } from '../models/quiz.model';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../models/pagination.mode';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    constructor(private readonly http: HttpClient) {}

    findAll(): Observable<QuizPaginationResponse> {
        return this.http.get<QuizPaginationResponse>(environment.API_URL + '/quizzes');
    }

    findByCategory(categoryId: number, currentPage: number): Observable<PaginationResponse<Quiz>> {
        return this.http.get<PaginationResponse<Quiz>>(environment.API_URL + `/quizzes/categories/${categoryId}`, {
            params: { page: currentPage },
        });
    }

    findById(quizId: number): Observable<Quiz> {
        return this.http.get<Quiz>(environment.API_URL + `/quizzes/${quizId}`);
    }

    findBySlug(slug: string): Observable<Quiz> {
        return this.http.get<Quiz>(environment.API_URL + `/quizzes/slug/${slug}`);
    }

    create(createQuizRequest: CreateQuizRequest): Observable<Quiz> {
        return this.http.post<Quiz>(environment.API_URL + '/quizzes', createQuizRequest);
    }

    update(updateQuizRequest: UpdateQuizRequest): Observable<Quiz> {
        return this.http.post<Quiz>(environment.API_URL + '/quizzes', updateQuizRequest);
    }

    updateActiveQuiz(id: number, active: boolean): Observable<Quiz> {
        return this.http.put<Quiz>(`${environment.API_URL}/quizzes/${id}/active`, { active });
    }

    delete(id: number): Observable<string> {
        return this.http.delete<string>(environment.API_URL + `/quizzes/${id}`, {
            headers: new HttpHeaders({
                Accept: 'text/plain, */*',
                'Content-Type': 'application/json',
            }),
            responseType: 'text' as 'json',
        });
    }
}
