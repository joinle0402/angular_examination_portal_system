import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest, UserPrincipal } from './../models/auth.model';

const AUTH_API = 'http://localhost:8080/api/v1/auth/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(AUTH_API + 'login', loginRequest, httpOptions);
    }

    register(registerRequest: RegisterRequest) {
        return this.http.post(AUTH_API + 'register', registerRequest, httpOptions);
    }

    getCurrentUser(): Observable<UserPrincipal> {
        return this.http.get<UserPrincipal>(AUTH_API + 'current-user');
    }
}
