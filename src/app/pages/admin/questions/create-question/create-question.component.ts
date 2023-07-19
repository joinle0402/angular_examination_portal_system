import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
    formValidation: FormGroup;
    ContentEditor = ClassicEditor;
    quizSlug: string = '';
    quiz!: Quiz;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly toastify: MatSnackBar,
        private readonly quizService: QuizService,
        private readonly questionService: QuestionService,
    ) {
        this.formValidation = this.formBuilder.group({
            content: ['', [Validators.required]],
            optionA: ['', [Validators.required]],
            optionB: ['', [Validators.required]],
            optionC: ['', [Validators.required]],
            optionD: ['', [Validators.required]],
            answer: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.quizSlug = this.route.snapshot.params['quizSlug'];
        this.quizService.findBySlug(this.quizSlug).subscribe({
            next: (quiz: Quiz) => {
                this.quiz = quiz;
            },
        });
    }

    onSubmit() {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                const createQuestionRequest = {
                    content: this.formValidation.value.content,
                    optionA: this.formValidation.value.optionA,
                    optionB: this.formValidation.value.optionB,
                    optionC: this.formValidation.value.optionC,
                    optionD: this.formValidation.value.optionD,
                    answer: this.formValidation.value.answer,
                    quiz: {
                        id: this.quiz.id,
                    },
                };
                this.questionService.create(createQuestionRequest).subscribe({
                    next: (_) => {
                        console.log('Create quiz response: ', _);
                        this.toastify.open('Create new quiz successfully!', 'CANCEL');
                        this.router.navigate([`/admin/quizzes/${this.quiz.slug}`]);
                    },
                    error: (error) => {
                        console.log(error);
                        Swal.fire('Error', 'Create question failed!', 'error');
                    },
                });
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info');
            }
        });
    }
}
