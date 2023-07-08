import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    constructor(private readonly storageService: StorageService) {}

    logout() {
        this.storageService.logout();
    }
}
