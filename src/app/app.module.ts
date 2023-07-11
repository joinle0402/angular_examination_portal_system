import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/users/home/home.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor } from './interceptors/auth.interceptor';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { CategoryListComponent } from './pages/admin/category/category-list/category-list.component';
import { CreateCategoryComponent } from './pages/admin/category/create-category/create-category.component';
import { UpdateCategoryComponent } from './pages/admin/category/update-category/update-category.component';
import { QuizListComponent } from './pages/admin/quiz/quiz-list/quiz-list.component';
import { CreateQuizComponent } from './pages/admin/quiz/create-quiz/create-quiz.component';
import { UpdateQuizComponent } from './pages/admin/quiz/update-quiz/update-quiz.component';
import { QuestionListComponent } from './pages/admin/questions/question-list/question-list.component';
import { CreateQuestionComponent } from './pages/admin/questions/create-question/create-question.component';
import { UpdateQuestionComponent } from './pages/admin/questions/update-question/update-question.component';

export const snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: ['custom-snackbar'],
};

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        HomeComponent,
        SidebarComponent,
        ProfileComponent,
        CategoryListComponent,
        CreateCategoryComponent,
        UpdateCategoryComponent,
        QuizListComponent,
        CreateQuizComponent,
        UpdateQuizComponent,
        QuestionListComponent,
        CreateQuestionComponent,
        UpdateQuestionComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CKEditorModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatListModule,
        MatDividerModule,
        MatSelectModule,
        MatSlideToggleModule,
    ],
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: snackBarConfig },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
