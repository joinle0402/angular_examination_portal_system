import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
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

import { UserLayoutComponent } from './pages/users/layout/layout.component';
import { UserQuizzesComponent } from './pages/users/quizzes/quizzes.component';
import { ViewQuestionsComponent } from './pages/users/view-questions/view-questions.component';
import { noAuthGuard } from './guards/noauth.guard';
import { PageNotFoundComponent } from './pages/common/page-not-found/page-not-found.component';
import { StartComponent } from './pages/users/start/start.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [noAuthGuard] },
    // {
    //     path: '',
    //     component: UserLayoutComponent,
    //     canActivate: [userGuard],
    //     children: [
    //         {
    //             path: '',
    //             component: UserQuizzesComponent,
    //         },
    //         {
    //             path: ':categorySlug',
    //             component: UserQuizzesComponent,
    //         },
    //         {
    //             path: ':categorySlug/view/:quizSlug',
    //             component: ViewQuestionsComponent,
    //         },
    //     ],
    // },
    // {
    //     path: ':categorySlug/start/:quizSlug',
    //     component: StartComponent,
    //     canActivate: [userGuard],
    // },
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
                path: 'quizzes/:quizSlug',
                component: QuestionListComponent,
            },
            {
                path: 'quizzes/:quizSlug/create',
                component: CreateQuestionComponent,
            },
            {
                path: 'quizzes/:quizSlug/update/:questionId',
                component: UpdateQuestionComponent,
            },
        ],
    },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
