import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthServicesService, LoggedinUser } from '../auth/auth-services.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {

  isformValid: boolean;
  currentUserToken: string;

  postError: boolean = false;
  postErrorMessage: string = '';

  constructor(private userService: UsersService,
    private router: Router,
    private auth: AuthServicesService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.isformValid = form.valid;

    if (this.isformValid) {
      this.auth.login(form).subscribe(
        result => {
          if (result["backResponse"]) {
            this.postErrorMessage = "Invalid password";
            this.postError = true;
            return;
          } else {
            let resp = {} as LoggedinUser;
            resp.access_token = result["jwtToken"];
            resp.userName = result["fname"];
            resp.emailId = result["email"];
            resp.userId = result["userId"];

            this.auth.manageSession(resp);
            this.router.navigate(["user/dashboard"]);
          }

        },
        err => {
          this.postErrorMessage = "No such user exists";
          this.postError = true;
        }
      )
    }
  }
}
