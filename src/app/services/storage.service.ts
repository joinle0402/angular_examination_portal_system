import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { UserPrincipal } from '../models/auth.model';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() {}

    setToken(token: string) {
        localStorage.removeItem(environment.ACCESS_TOKEN_KEY);
        localStorage.setItem(environment.ACCESS_TOKEN_KEY, token);
    }

    getToken() {
        return localStorage.getItem(environment.ACCESS_TOKEN_KEY);
    }

    setUser(user: UserPrincipal) {
        localStorage.removeItem(environment.USER_KEY);
        localStorage.setItem(environment.USER_KEY, JSON.stringify(user));
    }

    getUser() {
        const user = localStorage.getItem(environment.USER_KEY);
        return user != null ? (JSON.parse(user) as UserPrincipal) : null;
    }

    isLoggedIn() {
        return this.getToken() != null;
    }

    logout() {
        localStorage.removeItem(environment.ACCESS_TOKEN_KEY);
        localStorage.removeItem(environment.USER_KEY);
    }

    getRole() {
        const user = this.getUser();
        return user != null ? user.roles[0] : null;
    }
}
