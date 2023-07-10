import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Quiz } from 'src/app/models/quiz.model';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import { numberValidator } from 'src/app/validators/quiz.validator';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-update-quiz',
    templateUrl: './update-quiz.component.html',
    styleUrls: ['./update-quiz.component.scss'],
})
export class UpdateQuizComponent implements OnInit {
    formValidation: FormGroup;
    categories: Category[] = [];
    quizId: number = -1;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly toastify: MatSnackBar,
        private readonly quizService: QuizService,
        private readonly categoryService: CategoryService,
    ) {
        this.formValidation = this.formBuilder.group({
            title: [null, [Validators.required]],
            description: [null, [Validators.maxLength(500)]],
            maxMark: [null, [Validators.required, numberValidator, Validators.min(0)]],
            numberOfQuestion: [null, [Validators.required, numberValidator, Validators.min(0)]],
            categoryId: [null, [Validators.required, numberValidator, Validators.min(0)]],
            active: [true, []],
        });
    }

    ngOnInit(): void {
        this.quizId = parseInt(this.route.snapshot.params['id']);
        this.quizService.findById(this.quizId).subscribe({
            next: (quizToUpdate: Quiz) => {
                console.log('Find quiz by id response: ', quizToUpdate);
                this.formValidation.patchValue({
                    title: quizToUpdate.title,
                    description: quizToUpdate.description,
                    maxMark: quizToUpdate.maxMark,
                    numberOfQuestion: quizToUpdate.numberOfQuestion,
                    active: quizToUpdate.active,
                    categoryId: quizToUpdate.category.id,
                });
            },
            error: (error) => {
                console.log(error);
                Swal.fire('Error', 'Find by id fail!', 'error');
            },
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
        Swal.fire({
            title: 'Do you want to update to the quiz?',
            showCancelButton: true,
            confirmButtonText: 'Update',
        }).then((result) => {
            if (result.isConfirmed) {
                this.quizService
                    .update({
                        id: this.quizId,
                        title: this.formValidation.value.title,
                        description: this.formValidation.value.description,
                        maxMark: this.formValidation.value.maxMark,
                        numberOfQuestion: this.formValidation.value.numberOfQuestion,
                        active: this.formValidation.value.active,
                        category: {
                            id: this.formValidation.value.categoryId,
                        },
                    })
                    .subscribe({
                        next: (_) => {
                            this.router.navigate(['/admin/quizzes']);
                            Swal.fire('Updated quiz successfully!', '', 'success');
                        },
                        error: (error: HttpErrorResponse) => {
                            console.log(error);
                            Swal.fire('Error', 'Update category fail!', 'error');
                        },
                    });
            }
        });
    }
}
