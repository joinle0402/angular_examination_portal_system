import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/users/home/home.component';
import { HomeComponent as AdminComponent } from './pages/admin/home/home.component';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';
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

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [adminGuard],
        children: [
            {
                path: 'dashboard',
                component: AdminComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'categories',
                component: CategoryListComponent,
            },
            {
                path: 'categories/create',
                component: CreateCategoryComponent,
            },
            {
                path: 'categories/update',
                component: UpdateCategoryComponent,
            },
            {
                path: 'quizzes',
                component: QuizListComponent,
            },
            {
                path: 'quizzes/create',
                component: CreateQuizComponent,
            },
            {
                path: 'quizzes/update/:id',
                component: UpdateQuizComponent,
            },
            {
                path: 'quizzes/:quizId/questions',
                component: QuestionListComponent,
            },
            {
                path: 'quizzes/:quizId/questions/create',
                component: CreateQuestionComponent,
            },
            {
                path: 'quizzes/:quizId/questions/update/:id',
                component: UpdateQuestionComponent,
            },
        ],
    },
    { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [userGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
