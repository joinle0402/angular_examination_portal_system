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
        ],
    },
    { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [userGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
