import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

export interface LoggedinUser {
  access_token: string,
  userName: string,
  emailId: string,
  userId: number
}

@Injectable()
export class AuthServicesService {

  redirectUrl: string;
  loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private userService: UsersService) { }

  public login(form: NgForm): Observable<Object> {
    return this.userService.loginUser(form.value.username, form.value.password);
  }

  public getUserDetail() {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user'));
    } else {
      return null;
    }
  }

  public get isLoggedIn() {
    return !!sessionStorage.getItem('token');
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public manageSession(data: LoggedinUser) {
    sessionStorage.setItem('token', data.access_token);
    sessionStorage.setItem('user', JSON.stringify(data));
  }

  public logout(): void {
    this.redirectUrl = document.location.pathname;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
    this.loginStatus.emit(false);
  }


}
