import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Role } from '../models/auth.model';

export const noAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const storageService = inject(StorageService);
    const router = inject(Router);

    if (!storageService.isLoggedIn()) {
        return true;
    }
    console.log('noAuthGuard.getRole: ' + storageService.getRole());
    if (storageService.getRole() == Role.USER) {
        router.navigate(['/']);
    }

    if (storageService.getRole() == Role.ADMIN) {
        router.navigate(['/admin/dashboard']);
    }

    return false;
};
