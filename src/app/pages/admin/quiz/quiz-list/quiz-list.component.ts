import { Component, OnInit } from '@angular/core';
import { Quiz, QuizPaginationResponse } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { FormControl, Validators } from '@angular/forms';
import { PaginationResponse } from 'src/app/models/pagination.mode';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
    pagination!: PaginationResponse<Quiz>;

    categories: Category[] = [];
    categoryControl: FormControl = new FormControl<number | null>(null, [Validators.required]);

    constructor(private readonly quizService: QuizService, private readonly categoryService: CategoryService) {}

    ngOnInit(): void {
        this.categoryService.findAll().subscribe({
            next: (categories: Category[]) => {
                this.categories = categories;
                this.categoryControl.setValue(Math.min(...this.categories.map((category) => category.id)));
            },
            error: (error: HttpErrorResponse) => {
                console.log(error);
                Swal.fire('Error', 'Loading quizzes fail!!', 'error');
            },
        });
        this.categoryControl.valueChanges.subscribe((categoryId: number) => {
            this.loadQuizzesByCategory(categoryId);
        });
    }

    loadQuizzesByCategory(categoryId: number, currentPage: number = 1) {
        this.quizService.findByCategory(categoryId, currentPage).subscribe({
            next: (response: PaginationResponse<Quiz>) => {
                this.pagination = response;
            },
            error: (error: HttpErrorResponse) => {
                console.log(error);
            },
        });
    }

    onChangePage(page: number) {
        this.loadQuizzesByCategory(this.categoryControl.value, page);
    }

    onToggleActivated(id: number, active: boolean) {
        this.quizService.updateActiveQuiz(id, !active).subscribe({
            next: (response) => {
                const index = this.pagination.content.findIndex((quiz) => quiz.id == id);
                this.pagination.content[index].active = response.active;
            },
        });
    }

    deleteQuiz(quizId: number) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                this.quizService.delete(quizId).subscribe({
                    next: (_) => {
                        this.loadQuizzesByCategory(this.categoryControl.value, this.pagination.currentPage);
                        Swal.fire('Deleted!', `Quiz has been deleted.`, 'success');
                    },
                    error: (error) => {
                        console.log(error);
                        Swal.fire('Error!', 'Delete quiz failed!', 'error');
                    },
                });
            }
        });
    }
}
