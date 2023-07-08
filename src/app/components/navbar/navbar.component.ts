import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    constructor(public readonly storageService: StorageService) {}
}
