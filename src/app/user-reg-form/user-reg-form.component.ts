import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-reg-form',
  templateUrl: './user-reg-form.component.html',
  styleUrls: ['./user-reg-form.component.css']
})
export class UserRegFormComponent implements OnInit {

  public showReview: boolean;
  public submitter: boolean;

  constructor() { }

  ngOnInit(): void {
    // this.showReview = false;
    // this.submitter = true;
    document.getElementById("reviewContainer").style.display = "none";
    document.getElementById("registerButton").style.display = "block";
  }

  review(): void {
    // this.showReview = true;
    // this.submitter = false;
    document.getElementById("registerButton").style.display = "none";
    document.getElementById("reviewContainer").style.display = "block";

    console.log("Now value ", this.showReview);
  }

}
