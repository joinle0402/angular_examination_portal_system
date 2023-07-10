import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
    quizzes: Quiz[] = [];

    constructor(private readonly quizService: QuizService) {}

    ngOnInit(): void {
        this.quizService.findAll().subscribe({
            next: (data: Quiz[]) => {
                console.log('Find all quiz response: ', data);
                this.quizzes = data;
            },
            error: (error: HttpErrorResponse) => {
                console.log(error);
                Swal.fire('Error', 'Loading quizzes fail!!', 'error');
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
                        this.quizzes = this.quizzes.filter((quiz: Quiz) => quiz.id != quizId);
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
