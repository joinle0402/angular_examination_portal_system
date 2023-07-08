import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(private readonly storageService: StorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storageService.getToken();

        if (token != null) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            });
        }

        return next.handle(request);
    }
}
