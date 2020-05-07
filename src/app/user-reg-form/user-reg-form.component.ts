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

  country: any;
  state: any;
  city: any;

  countrySelected: string;
  stateSelected: string;
  citySelected: string;

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

    this.regionService.getCountries().subscribe(
      data => {
        this.country = Object.values(data);
      },
      err => {
        console.log(err);
      }
    )
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
        "country": this.countrySelected,
        "state": this.stateSelected,
        "city": this.citySelected,
        "zip": FormValues.zip
      };
      this.userService.registerUser(body).subscribe(
        data => {
          this.onSuccess(FormValues);
          window.scrollTo(0, 0);
          return true;
        },
        error => {
          this.validMessage = "Uh-oh.... It seems there is some error";
          return Observable.throw(error);
        })
    } else {
      window.scrollTo(0, 0);
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

  getState(event) {
    this.countrySelected = event.name;
    // let id = Number((<HTMLSelectElement>document.getElementById("country")).value);
    let id = event.id;

    this.regionService.getStates(id).subscribe(
      data => {
        console.log("States loaded");
        this.state = Object.values(data);
      },
      err => {
        console.log("err", err);
      }
    )
  }

  getCity(event) {
    this.stateSelected = event.name;
    let id = event.id;
    this.regionService.getCities(id).subscribe(
      data => {
        console.log("Cities loaded");
        this.city = Object.values(data);
      },
      err => {
        console.log("error", err);
      }
    )
  }
  getValue(event) {
    this.citySelected = event;
  }
}
