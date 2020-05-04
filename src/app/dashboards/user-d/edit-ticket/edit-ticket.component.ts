import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  ticket_id: number;
  user_id: number;
  ticketDetails: any;
  editable: boolean;
  ticketForm: any;
  msg: string;
  valid: boolean = false;

  constructor(private actRoute: ActivatedRoute, private userService: UsersService) {
    this.ticket_id = this.actRoute.snapshot.params.id;
    this.user_id = JSON.parse(sessionStorage.getItem('user'))["userId"];

    this.userService.getUserTicketOne(this.user_id, this.ticket_id).subscribe(
      data => {
        this.ticketDetails = data;
        this.populateFields();
      },
      err => {
        console.log("error ", err);
      }
    );

    this.editable = true;
  }

  ngOnInit(): void {

  }

  populateFields() {
    console.log(this.ticketDetails);
  }

  makeEdits() {
    this.editable = false;
  }

  cancel() {
    this.editable = true;
  }

  update() {
    let sampleTicket = {
      "ticketId": document.getElementById("ticketId").textContent,
      "processedBy": document.getElementById("processed").textContent,

      "status": "ReSubmitted",
      "requestType": document.getElementById('requestType').textContent,
      "priority": document.getElementById('priority').textContent,
      "fromLocation": document.getElementById('fromcity').innerHTML,
      "toLocation": document.getElementById('tocity').textContent,
      "startDate": document.getElementById('startDate').textContent,
      "endDate": document.getElementById('endDate').textContent,
      "passportNumber": document.getElementById('passport').textContent,
      "expenseBorneBy": document.getElementById('expense').textContent,
      "travelApproverName": document.getElementById('approver').textContent,
      "durationOfTravel": document.getElementById('duration').textContent,
      "upperBoundAmount": document.getElementById('upperBound').textContent,
      "additionalDetails": document.getElementById('additionalInformation').textContent,
      /* "dateCreated": new Date().toISOString().substring(0, 10) */
    }

    if (!this.editable) {
      this.userService.updateUserTicket(this.user_id, this.ticket_id, sampleTicket).subscribe(
        data => {
          console.log("Updated Successfully");
          this.valid = true;
          this.msg = "Well, your details have been updated!"
        },
        err => console.log(err)
      );
    }
  }

}


