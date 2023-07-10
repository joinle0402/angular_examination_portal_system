import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent {
    formValidation!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly toastify: MatSnackBar,
        private readonly router: Router,
        private readonly categoryService: CategoryService,
    ) {
        this.formValidation = this.formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', []],
        });
    }

    onSubmit() {
        if (this.formValidation.valid) {
            const { title, description } = this.formValidation.value;
            this.categoryService.create({ title, description }).subscribe({
                next: (response) => {
                    this.toastify.open('Create new category successfully!', 'CANCEL');
                    this.router.navigate(['/admin/categories']);
                },
                error: (error) => {
                    console.log(error);
                },
            });
        } else {
            this.formValidation.markAllAsTouched();
        }
    }
}
