import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginFormComponent } from './admin-login-form/admin-login-form.component';
import { UserRegFormComponent } from './user-reg-form/user-reg-form.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserLoginFormComponent },
  { path: 'user/registration', component: UserRegFormComponent },
  { path: 'user/fp', component: ForgotpasswordComponent },
  { path: 'admin', component: AdminLoginFormComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
