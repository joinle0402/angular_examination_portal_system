import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
    categories: Category[] = [];

    constructor(private readonly categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoryService.findAll().subscribe({
            next: (categories: Category[]) => {
                this.categories = categories;
            },
            error: (error) => {
                console.log(error);
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
            },
        });
    }
}
