import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { RegionsService } from '../services/regions.service';

@Component({
  selector: 'app-user-reg-form',
  templateUrl: './user-reg-form.component.html',
  styleUrls: ['./user-reg-form.component.css']
})
export class UserRegFormComponent implements OnInit {
  userForm: FormGroup;
  validMessage: string;

  public showReview: boolean;
  public submitter: boolean;
  countries: Array<any> = [];

  constructor(private userService: UsersService, private regionService: RegionsService) { }

  ngOnInit(): void {
    // this.showReview = false;
    // this.submitter = true;
    document.getElementById("reviewContainer").style.display = "none";
    document.getElementById("registerButton").style.display = "block";

    this.regionService.getCountries().toPromise()
      .then(i =>
        // this.countries = Object.keys(i)
        Object.keys(i).forEach(j => {
          // console.log(i[j]["name"])
          this.countries.push({ j: i[j]["names"] })
        })
      );

    this.countries.forEach(i => {
      console.log(i);
    })
    this.userForm = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),

      email: new FormControl('', Validators.required),

      bUnit: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),

      add1: new FormControl('', Validators.required),
      add2: new FormControl(),

      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),

      zip: new FormControl('', Validators.required),
    });

  }

  submitUserForm() {

    if (this.userForm.valid) {
      this.validMessage = "Your registration form has been submitted. Thank You!";
      this.userService.registerUser(this.userForm.value).subscribe(
        data => {
          this.userForm.disable();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    } else {
      this.validMessage = "Please fill out the form correctly before submitting!";
    }
  }

  review(): void {
    // this.showReview = true;
    // this.submitter = false;
    document.getElementById("registerButton").style.display = "none";
    document.getElementById("reviewContainer").style.display = "block";

    console.log("Now value ", this.showReview);
  }
}
