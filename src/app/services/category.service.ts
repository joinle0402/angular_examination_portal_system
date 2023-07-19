import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Category, CreateCategoryRequest } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private API_CATEGORIES_PATH: string = environment.API_URL + '/categories';

    constructor(private readonly http: HttpClient) {}

    findAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.API_CATEGORIES_PATH);
    }

    findBySlug(slug: string): Observable<Category> {
        return this.http.get<Category>(this.API_CATEGORIES_PATH + `/slug/${slug}`);
    }

    create(category: CreateCategoryRequest): Observable<Category> {
        return this.http.post<Category>(this.API_CATEGORIES_PATH, category);
    }
}
