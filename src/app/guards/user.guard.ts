import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Role } from '../models/auth.model';

export const userGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const storageService = inject(StorageService);
    const router = inject(Router);

    if (storageService.isLoggedIn() && storageService.getRole() == Role.USER) {
        return true;
    }

    router.navigate(['login']);
    return false;
};
