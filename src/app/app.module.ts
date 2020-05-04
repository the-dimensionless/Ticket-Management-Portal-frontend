import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from './services/MyInterceptor';
import { NgxPaginationModule } from 'ngx-pagination';

import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserRegFormComponent } from './user-reg-form/user-reg-form.component';
import { UsersService } from './services/users.service';
import { RegionsService } from './services/regions.service';
import { UserDComponent } from './dashboards/user-d/user-d.component';
import { AdminDComponent } from './dashboards/admin-d/admin-d.component';
import { AdminLoginFormComponent } from './admin-login-form/admin-login-form.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthServicesService } from './auth/auth-services.service';
import { AddTicketComponent } from './dashboards/user-d/add-ticket/add-ticket.component';
import { EditTicketComponent } from './dashboards/user-d/edit-ticket/edit-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginFormComponent,
    UserRegFormComponent,
    UserDComponent,
    AdminDComponent,
    AdminLoginFormComponent,
    ForgotpasswordComponent,
    AddTicketComponent,
    EditTicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    NgxPaginationModule
  ],
  providers: [UsersService, RegionsService, AuthGuardService, AuthServicesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
