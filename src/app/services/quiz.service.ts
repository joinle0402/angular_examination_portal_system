import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateQuizRequest, Quiz, UpdateQuizRequest } from '../models/quiz.model';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    constructor(private readonly http: HttpClient) {}

    findAll(): Observable<Quiz[]> {
        return this.http.get<Quiz[]>(environment.API_URL + '/quizzes');
    }

    findById(quizId: number): Observable<Quiz> {
        return this.http.get<Quiz>(environment.API_URL + `/quizzes/${quizId}`);
    }

    create(createQuizRequest: CreateQuizRequest): Observable<Quiz> {
        return this.http.post<Quiz>(environment.API_URL + '/quizzes', createQuizRequest);
    }

    update(updateQuizRequest: UpdateQuizRequest): Observable<Quiz> {
        return this.http.post<Quiz>(environment.API_URL + '/quizzes', updateQuizRequest);
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
