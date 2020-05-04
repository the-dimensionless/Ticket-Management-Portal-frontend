import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

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

  constructor(private userService: UsersService, private route: ActivatedRoute) {
    this.viewEdit = false;
    this.valid = false;
    this.confirmation = false;
  }

  ngOnInit(): void {
    this.id = JSON.parse(sessionStorage.getItem("user"))["userId"];

    this.ticketForm = new FormGroup({
      requestType: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),

      tocity: new FormControl('', Validators.required),

      fromcity: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),

      passport: new FormControl('', Validators.required),
      project: new FormControl(),

      expense: new FormControl('', Validators.required),
      approver: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),

      upperBound: new FormControl('', Validators.required),
      additionalInformation: new FormControl('', Validators.required)
    });
  }

  printView(): void {
    window.print();
  }

  showView(form) {
    this.onSuccess(form);
    /* if (form.valid) {
      let sampleTicket = {
      }
      console.log(sampleTicket);
      this.userService.addUserTicket(this.id, sampleTicket);
      this.viewEdit = true;
    } else {
      this.msg = "There seems to be some error with the form";
      this.valid = true;
    } */

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
      "upperBoundAmount": form.upperBound,
      "additionalDetails": form.additionalInformation,
      /* "dateCreated": new Date().toISOString().substring(0, 10) */
    }
    console.log(sampleTicket);
    this.userService.addUserTicket(this.id, sampleTicket).subscribe(
      data => {
        console.log("success");
        this.msg = "Ticket Submitted Successfully";
        this.valid = true;
      },
      err => console.log(err)
    );
    console.log("here");
  }
}
