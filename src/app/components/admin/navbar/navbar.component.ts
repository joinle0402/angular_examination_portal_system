import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    constructor(private readonly storageService: StorageService, private readonly router: Router) {}

    isLoggedIn(): boolean {
        return this.storageService.isLoggedIn();
    }

    isAdmin(): boolean {
        return this.storageService.isAdmin();
    }

    logout(): void {
        this.storageService.logout();
        this.router.navigateByUrl('/login');
    }
}
