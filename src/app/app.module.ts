import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserRegFormComponent } from './user-reg-form/user-reg-form.component';
import { UsersService } from './services/users.service';
import { RegionsService } from './services/regions.service';
import { UserDComponent } from './dashboards/user-d/user-d.component';
import { AdminDComponent } from './dashboards/admin-d/admin-d.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginFormComponent,
    UserRegFormComponent,
    UserDComponent,
    AdminDComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [UsersService, RegionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
