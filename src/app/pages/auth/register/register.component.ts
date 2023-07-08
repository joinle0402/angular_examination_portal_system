import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;
    registerForm!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly authService: AuthService,
        private readonly storageService: StorageService,
        private readonly toastify: MatSnackBar,
        private readonly router: Router,
    ) {}

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        });
    }

    onSubmit() {
        if (this.registerForm.valid) {
            const { fullname, username, password } = this.registerForm.value;
            this.authService.register({ fullname, username, password, roles: ['USER'] }).subscribe({
                next: (response) => {
                    this.toastify.open('Register user successfully!', 'CANCEL');
                },
                error: (error: HttpErrorResponse) => {
                    this.toastify.open(error.error.message, 'CANCEL');
                    console.log(error);
                },
            });
        } else {
            this.registerForm.markAllAsTouched();
        }
    }
}
