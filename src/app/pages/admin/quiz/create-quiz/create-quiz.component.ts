import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CreateQuizRequest, Quiz } from 'src/app/models/quiz.model';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import { numberValidator } from 'src/app/validators/quiz.validator';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-quiz',
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
    formValidation!: FormGroup;
    categories: Category[] = [];

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly toastify: MatSnackBar,
        private readonly quizService: QuizService,
        private readonly categoryService: CategoryService,
    ) {}

    ngOnInit(): void {
        this.formValidation = this.formBuilder.group({
            title: [null, [Validators.required]],
            description: [null, [Validators.maxLength(500)]],
            maxMark: [null, [Validators.required, numberValidator, Validators.min(0)]],
            numberOfQuestion: [null, [Validators.required, numberValidator, Validators.min(0)]],
            categoryId: [null, [Validators.required, numberValidator, Validators.min(0)]],
            active: [true, []],
        });
        this.categoryService.findAll().subscribe({
            next: (categories) => {
                this.categories = categories;
            },
            error: (error) => {
                console.log(error);
                Swal.fire('Error', 'Error in loading categories', 'error');
            },
        });
    }

    onSubmit() {
        if (this.formValidation.valid) {
            const createQuizRequest: CreateQuizRequest = {
                title: this.formValidation.value.title,
                description: this.formValidation.value.description,
                maxMark: this.formValidation.value.maxMark,
                numberOfQuestion: this.formValidation.value.numberOfQuestion,
                active: this.formValidation.value.active,
                category: {
                    id: this.formValidation.value.categoryId,
                },
            };
            this.quizService.create(createQuizRequest).subscribe({
                next: (response: Object) => {
                    console.log('Create quiz response: ', response);
                    this.toastify.open('Create new quiz successfully!', 'CANCEL');
                    this.router.navigate(['/admin/quizzes']);
                },
                error: (error: HttpErrorResponse) => {
                    console.log(error);
                    Swal.fire('Error!!', 'Create quiz fail!!', 'error');
                },
            });
        } else {
            this.formValidation.markAllAsTouched();
        }
    }
}
