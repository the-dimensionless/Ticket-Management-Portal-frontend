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
  editable: boolean;
  values: any;

  public showReview: boolean;
  public submitter: boolean;
  countries: Array<any> = [];

  constructor(private userService: UsersService, private regionService: RegionsService) { this.editable = false; }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),

      email: new FormControl('', Validators.required),

      businessUnit: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),

      address1: new FormControl('', Validators.required),
      address2: new FormControl(),

      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),

      zip: new FormControl('', Validators.required),
    });
  }

  submitUserForm(FormValues) {
    if (this.userForm.valid) {
      let body = {
        "username": FormValues.email,
        "firstName": FormValues.firstName,
        "lastName": FormValues.lastName,
        "email": FormValues.email,
        "businessUnit": FormValues.businessUnit,
        "title": FormValues.title,
        "telephone": FormValues.telephone,
        "address1": FormValues.address1,
        "address2": FormValues.address2,
        "country": FormValues.country,
        "state": FormValues.state,
        "city": FormValues.city,
        "zip": FormValues.zip
      };
      this.userService.registerUser(body).subscribe(
        data => {
          this.onSuccess(FormValues);
          return true;
        },
        error => {
          this.validMessage = "Uh-oh.... It seems there is some error";
          return Observable.throw(error);
        })
    } else {
      this.validMessage = "Please enter the details correctly!"
    }

  }

  onSuccess(FormValues) {
    this.values = FormValues;
    this.editable = true;
    this.validMessage = "You have been registered successfully";
  }

  basic() {
    this.editable = false;
  }

  print() {
    window.print();
  }
}
