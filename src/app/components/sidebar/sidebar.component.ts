import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    constructor(private readonly storageService: StorageService, private readonly router: Router) {}

    logout() {
        this.storageService.logout();
        this.router.navigate(['/login']);
    }
}
