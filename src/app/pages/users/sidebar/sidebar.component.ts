import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

interface SidebarItem {
    name: string;
    route: string;
}

@Component({
    selector: 'app-user-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class UserSidebarComponent implements OnInit {
    categories: Category[] = [];
    sidebarItems: SidebarItem[] = [];
    selectedSidebarItem!: SidebarItem | undefined;
    routerSubscription!: Subscription;

    constructor(private readonly categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoryService.findAll().subscribe({
            next: (categories: Category[]) => {
                this.sidebarItems = categories.map((category) => ({
                    name: category.title,
                    route: `/${category.slug}`,
                }));
                this.sidebarItems.unshift({
                    name: 'All Quizzes',
                    route: '/',
                });
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
}
