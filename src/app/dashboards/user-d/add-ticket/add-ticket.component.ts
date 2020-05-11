import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { AuthServicesService } from 'src/app/auth/auth-services.service';
import { RegionsService } from 'src/app/services/regions.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  viewEdit: boolean;
  id: number;
  msg: string = "hello";
  valid: boolean;
  ticketForm: FormGroup;
  confirmation: boolean;
  values: any;
  finallySubmitted: boolean;
  date: Date;
  endDate: Date;

  constructor(private userService: UsersService, private regionService: RegionsService, private auth: AuthServicesService, private route: ActivatedRoute) {
    this.viewEdit = false;
    this.valid = false;
    this.confirmation = false;
    this.finallySubmitted = true;

    this.endDate = new Date(new Date(new Date().getTime() + 1000 * 60 * 60 * 24));
    this.date = new Date();
  }

  ngOnInit(): void {
    this.id = JSON.parse(sessionStorage.getItem("user"))["userId"];

    this.ticketForm = new FormGroup({
      requestType: new FormControl(''),
      priority: new FormControl(''),

      tocity: new FormControl(''),

      fromcity: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),

      passport: new FormControl(''),
      project: new FormControl(''),

      expense: new FormControl(''),
      approver: new FormControl(''),
      duration: new FormControl(''),

      upperBound: new FormControl(''),
      additionalInformation: new FormControl('', Validators.required)
    });

  }

  printView(): void {
    window.print();
  }

  showView(form) {
    if (this.isFormValid(form)) {
      this.onSuccess(form);
    } else {
      console.log("INvalid", form);
      this.msg = "Please fill in all the details correctly";
      window.scrollTo(0, 0);
      this.valid = true;
    }
  }

  editView() {
    this.viewEdit = false;
  }

  onSuccess(form) {
    this.values = form;
    this.confirmation = true;
  }

  print() {
    window.print();
  }

  basic() {
    this.confirmation = false;
  }

  logout() {
    this.auth.logout();
  }

  addTicket() {
    let form = this.ticketForm.value;
    let sampleTicket = {
      "status": "Submitted",
      "requestType": form.requestType,
      "priority": form.priority,
      "fromLocation": form.fromcity,
      "toLocation": form.tocity,
      "startDate": form.startDate,
      "endDate": form.endDate,
      "passportNumber": form.passport,
      "expenseBorneBy": form.expense,
      "travelApproverName": form.approver,
      "durationOfTravel": form.duration,
      "upperBoundOnAmount": form.upperBound,
      "project": form.project,
      "additionalDetails": form.additionalInformation,
      /* "dateCreated": new Date().toISOString().substring(0, 10) */
    }
    this.userService.addUserTicket(this.id, sampleTicket).subscribe(
      data => {
        console.log("success");
        this.msg = "Ticket Submitted Successfully";
        this.valid = true;
        this.finallySubmitted = false;
      },
      err => console.log(err)
    );
  }

  isFormValid(form): boolean {
    if (form.requestType == '' || form.priority == '' || form.fromcity == '' || form.tocity == '' || form.passport == '' ||
      form.expense == '' || form.project == '' || form.additionalInformation == '' || form.approver == '' || form.duration == '') {
      return false;
    } else {
      return true;
    }
  }

  getDate() {
    let d = (<HTMLInputElement>document.getElementById("startDate")).value;
    this.endDate = new Date((new Date(d).getTime() + 1000 * 60 * 60 * 24));
  }

}
