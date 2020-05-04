import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NgForm } from '@angular/forms';

export interface LoggedinUser {
  access_token: string,
  userName: string,
  emailId: string,
  userId: number
}

@Injectable()
export class AuthAdminServicesService {

  redirectUrl: string;
  loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private userService: AdminService) { }


  public getUserDetail() {
    if (sessionStorage.getItem('admin')) {
      return JSON.parse(sessionStorage.getItem('admin'));
    } else {
      return null;
    }
  }

  public get isLoggedIn() {
    return !!sessionStorage.getItem('admin');
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public manageSession(data: LoggedinUser) {
    sessionStorage.setItem('admin', JSON.stringify(data));
  }

  public logout(): void {
    this.redirectUrl = document.location.pathname;
    sessionStorage.removeItem('admin');
    this.router.navigate(['']);
    this.loginStatus.emit(false);
  }


}
