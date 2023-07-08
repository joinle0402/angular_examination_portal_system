import { StorageService } from 'src/app/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { LoginResponse, Role, UserPrincipal } from '../../../models/auth.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    showPassword: boolean = false;
    loginForm!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly authService: AuthService,
        private readonly toastify: MatSnackBar,
        private readonly storageService: StorageService,
        private readonly router: Router,
    ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: ({ access_token, user }: LoginResponse) => {
                    console.log('Login response: ', { access_token, user });
                    this.storageService.setToken(access_token);
                    this.storageService.setUser(user);
                    this.toastify.open('Login successfully!', 'CANCEL');

                    const role = this.storageService.getRole();
                    if (role != null) {
                        switch (role) {
                            case Role.USER:
                                this.router.navigate(['/home']);
                                break;
                            case Role.ADMIN:
                                this.router.navigate(['/admin/dashboard']);
                                break;
                            default:
                                break;
                        }
                    } else {
                        this.storageService.logout();
                    }
                },
                error: (error: HttpErrorResponse) => {
                    this.toastify.open(error.error.message, 'CANCEL');
                    console.log(error);
                },
            });
        }
    }
}
