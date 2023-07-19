import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionPaginationResponse } from 'src/app/models/question.model';
import { Quiz } from 'src/app/models/quiz.model';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
    questions: Question[] = [];
    quizSlug: string = '';
    quiz!: Quiz;
    pagination!: QuestionPaginationResponse;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly questionService: QuestionService,
        private readonly quizService: QuizService,
    ) {}

    ngOnInit(): void {
        this.quizSlug = this.route.snapshot.params['quizSlug'];
        this.loadQuestionByQuizSlug();
    }

    loadQuestionByQuizSlug(currentPage: number = 1) {
        this.quizService.findBySlug(this.quizSlug).subscribe({
            next: (quiz: Quiz) => {
                this.quiz = quiz;
                this.questionService.findByQuiz(this.quiz.id, currentPage).subscribe({
                    next: (response: QuestionPaginationResponse) => {
                        this.pagination = response;
                    },
                });
            },
        });
    }

    onChangePage(page: number) {
        console.log(page);
        this.loadQuestionByQuizSlug(page);
    }

    deleteQuestion(questionId: number) {
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
                this.questionService.delete(questionId).subscribe({
                    next: (_) => {
                        Swal.fire('Deleted!', `Quiz has been deleted.`, 'success');
                        this.loadQuestionByQuizSlug();
                    },
                });
            }
        });
    }
}
