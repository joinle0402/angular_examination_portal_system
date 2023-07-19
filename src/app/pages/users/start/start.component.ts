import { LocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { Quiz } from 'src/app/models/quiz.model';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
    categorySlug: string = '';
    quizSlug: string = '';
    quiz!: Quiz;
    questions: Question[] = [];

    constructor(
        private readonly locationStrategy: LocationStrategy,
        private readonly route: ActivatedRoute,
        private readonly quizService: QuizService,
        private readonly questionService: QuestionService,
    ) {}

    ngOnInit(): void {
        this.categorySlug = this.route.snapshot.params['categorySlug'];
        this.quizSlug = this.route.snapshot.params['quizSlug'];
        this.quizService.findBySlug(this.quizSlug).subscribe({
            next: (quiz: Quiz) => {
                this.quiz = quiz;

                // this.questionService.findByQuiz(this.quiz?.id).subscribe({
                //     next: (questions: Question[]) => {
                //         this.questions = questions;
                //     },
                //     error: (error: HttpErrorResponse) => {
                //         console.log(error);
                //     },
                // });
            },
            error: (error: HttpErrorResponse) => {
                console.log(error);
            },
        });
    }
}
