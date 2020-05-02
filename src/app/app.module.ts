import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';

import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserRegFormComponent } from './user-reg-form/user-reg-form.component';
import { UsersService } from './services/users.service';
import { RegionsService } from './services/regions.service';
import { UserDComponent } from './dashboards/user-d/user-d.component';
import { AdminDComponent } from './dashboards/admin-d/admin-d.component';
import { AdminLoginFormComponent } from './admin-login-form/admin-login-form.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginFormComponent,
    UserRegFormComponent,
    UserDComponent,
    AdminDComponent,
    AdminLoginFormComponent,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [UsersService, RegionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
