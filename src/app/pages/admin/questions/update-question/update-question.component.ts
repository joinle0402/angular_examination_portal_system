import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Question } from 'src/app/models/question.model';
import { Quiz } from 'src/app/models/quiz.model';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-update-question',
    templateUrl: './update-question.component.html',
    styleUrls: ['./update-question.component.scss'],
})
export class UpdateQuestionComponent implements OnInit {
    formValidation!: FormGroup;
    ContentEditor = ClassicEditor;
    quizSlug: string = '';
    quiz!: Quiz;
    questionId!: number;
    question!: Question;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly toastify: MatSnackBar,
        private readonly quizService: QuizService,
        private readonly questionService: QuestionService,
    ) {}

    ngOnInit(): void {
        this.formValidation = this.formBuilder.group({
            content: ['', [Validators.required]],
            optionA: ['', [Validators.required]],
            optionB: ['', [Validators.required]],
            optionC: ['', [Validators.required]],
            optionD: ['', [Validators.required]],
            answer: ['', [Validators.required]],
        });

        this.quizSlug = this.route.snapshot.params['quizSlug'];
        this.quizService.findBySlug(this.quizSlug).subscribe({
            next: (quiz: Quiz) => {
                this.quiz = quiz;
            },
        });

        this.questionId = this.route.snapshot.params['questionId'];
        this.questionService.findById(this.questionId).subscribe({
            next: (question: Question) => {
                this.question = question;
                this.formValidation.patchValue(this.question);
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
                const updateQuestionRequest = {
                    id: this.question.id,
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
                this.questionService.create(updateQuestionRequest).subscribe({
                    next: (_) => {
                        this.toastify.open('Update question successfully!', 'CANCEL');
                        this.router.navigate([`/admin/quizzes/${this.quiz.slug}`]);
                    }
                });
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info');
            }
        });
    }
}
