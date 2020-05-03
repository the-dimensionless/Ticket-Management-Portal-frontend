import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { NgForm } from '@angular/forms';

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

  public login(form: NgForm): string {
    let res = "";
    this.userService.loginUser(form.value.username, form.value.password).subscribe(
      result => {
        let resp = {} as LoggedinUser;

        resp.access_token = result["jwtToken"];
        resp.userName = result["fname"];
        resp.emailId = result["email"];
        resp.userId = result["userId"];

        this.manageSession(resp);
        this.router.navigate(["user/dashboard"]);
      },
      err => {
        res = err["statusText"] + " code: " + err["status"];
      }
    )
    return res;

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
    console.log("data before going in ", data);
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
