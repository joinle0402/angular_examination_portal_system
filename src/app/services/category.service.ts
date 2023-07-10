import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Category, CreateCategoryRequest } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private readonly http: HttpClient) {}

    findAll(): Observable<Category[]> {
        return this.http.get<Category[]>(environment.API_URL + '/categories');
    }

    create(category: CreateCategoryRequest): Observable<Category> {
        return this.http.post<Category>(environment.API_URL + '/categories', category);
    }
}
