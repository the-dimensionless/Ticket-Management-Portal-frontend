import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  valid: boolean;
  message: string;

  constructor(private userService: UsersService) {
    this.valid = false;
  }

  ngOnInit(): void {
  }

  remind() {
    let mail = (<HTMLInputElement>document.getElementById("email")).value;
    this.userService.remindPassword(mail).subscribe(
      data => {
        console.log("Sent");
        this.message = "Mail Sent!";
      },
      err => {
        console.log("error ", err);
        this.message = "Uh-oh! Some error has occurred. You sure the email is correct ?";
      }
    );
    this.valid = true;
  }

}
