import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { Quiz } from 'src/app/models/quiz.model';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
    selector: 'app-view-questions',
    templateUrl: './view-questions.component.html',
    styleUrls: ['./view-questions.component.scss'],
})
export class ViewQuestionsComponent implements OnInit {
    quiz!: Quiz;
    questions: Question[] = [];
    categorySlug: string = '';
    quizSlug: string = '';

    constructor(
        private readonly route: ActivatedRoute,
        private readonly quizService: QuizService,
        private readonly questionService: QuestionService,
    ) {}

    ngOnInit() {
        this.categorySlug = this.route.snapshot.params['categorySlug'];
        this.quizSlug = this.route.snapshot.params['quizSlug'];
        this.quizService.findBySlug(this.quizSlug).subscribe({
            next: (quiz: Quiz) => {
                console.log('this.quizService.findBySlug.quiz: ', quiz);
                this.quiz = quiz;

                // this.questionService.findByQuiz(this.quiz.id).subscribe({
                //     next: (questions: Question[]) => {
                //         console.log('this.questionService.findByQuiz.questions: ', questions);
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
