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
    OptionAEditor = ClassicEditor;
    OptionBEditor = ClassicEditor;
    OptionCEditor = ClassicEditor;
    OptionDEditor = ClassicEditor;
    quizId: number = -1;
    quizToUpdate: Quiz | null = null;

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
        this.quizId = this.route.snapshot.params['quizId'];
        this.quizService.findById(this.quizId).subscribe({
            next: (quizToUpdate: Quiz) => {
                this.quizToUpdate = quizToUpdate;
            },
            error: (error) => {
                console.log(error);
                this.router.navigate(['/admin/quizzes']);
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
                        id: this.quizId,
                    },
                };
                this.questionService.create(createQuestionRequest).subscribe({
                    next: (_) => {
                        console.log('Create quiz response: ', _);
                        this.toastify.open('Create new quiz successfully!', 'CANCEL');
                        this.router.navigate([`/admin/quizzes/${this.quizId}/questions`]);
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
