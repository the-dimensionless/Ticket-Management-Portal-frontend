import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { AuthAdminServicesService } from '../auth/admin/auth-admin-services.service';

@Component({
  selector: 'app-admin-login-form',
  templateUrl: './admin-login-form.component.html',
  styleUrls: ['./admin-login-form.component.css']
})
export class AdminLoginFormComponent implements OnInit {

  postError: boolean;
  postErrorMessage: string;

  constructor(private adminService: AdminService, private route: Router,
    private AdminAuthServicesService: AuthAdminServicesService) { }

  ngOnInit(): void {
  }


  login(form: NgForm) {

    if (form.valid) {
      this.adminService.login(form).subscribe(
        data => {
          console.log("Success");
          sessionStorage.setItem('admin', JSON.stringify(data));
          this.route.navigate(["admin/dashboard"]);
        },
        err => {
          console.log("error");
          this.postErrorMessage = "Invalid Credentials";
          this.postError = true;

        }
      )
    }

  }

}
