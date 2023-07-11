import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { Quiz } from 'src/app/models/quiz.model';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
    questions: Question[] = [];
    quizId: number = -1;
    quiz: Quiz | null = null;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly questionService: QuestionService,
        private readonly quizService: QuizService,
    ) {}

    ngOnInit(): void {
        this.quizId = this.route.snapshot.params['quizId'];
        this.quizService.findById(this.quizId).subscribe({
            next: (quiz: Quiz) => {
                this.quiz = quiz;
            },
            error: (error) => {
                console.log(error);
            },
        });
        this.questionService.findAll(this.quizId).subscribe({
            next: (questions: Question[]) => {
                this.questions = questions;
                console.log(`Find all questions by quiz id: ${this.quizId}`, questions);
            },
            error: (error) => {
                console.log(error);
                this.router.navigate(['/admin/quizzes']);
            },
        });
    }
}
