import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Quiz, QuizPaginationResponse } from 'src/app/models/quiz.model';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
    selector: 'app-user-quizzes',
    templateUrl: './quizzes.component.html',
    styleUrls: ['./quizzes.component.scss'],
})
export class UserQuizzesComponent implements OnInit {
    quizzes: Quiz[] = [];
    category!: Category;
    categorySlug!: string;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly quizService: QuizService,
        private readonly categoryService: CategoryService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.categorySlug = params['categorySlug'];
            if (this.categorySlug) {
                this.categoryService.findBySlug(this.categorySlug).subscribe({
                    next: (category: Category) => {
                        console.log(`this.categoryService.findBySlug().category`, this.categorySlug, category);
                        this.category = category;
                        this.quizService.findByCategory(this.category.id, 1).subscribe({
                            next: (response: QuizPaginationResponse) => {
                                console.log(`this.quizService.findByCategory().response`, this.category.id, response);
                                this.quizzes = response.content;
                            },
                            error: (error) => {
                                console.log(error);
                            },
                        });
                    },
                    error: (error) => {
                        console.log(error);
                    },
                });
            } else {
                this.quizService.findAll().subscribe({
                    next: (response: QuizPaginationResponse) => {
                        console.log('this.quizService.findAll().response: ', response);
                        this.quizzes = response.content;
                    },
                    error: (error) => {
                        console.log(error);
                    },
                });
            }
        });
    }
}
