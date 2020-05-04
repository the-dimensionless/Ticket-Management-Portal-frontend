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
      "ticketId": (<HTMLInputElement>document.getElementById('ticketId')).value,
      "processedBy": (<HTMLSelectElement>document.getElementById('processed')).value,

      "dateCreated": (<HTMLSelectElement>document.getElementById('dateCreated')).value,
      "status": "ReSubmitted",
      "requestType": (<HTMLSelectElement>document.getElementById('requestType')).value,
      "priority": (<HTMLSelectElement>document.getElementById('priority')).value,
      "fromLocation": (<HTMLSelectElement>document.getElementById('fromcity')).value,
      "toLocation": (<HTMLSelectElement>document.getElementById('tocity')).value,
      "startDate": (<HTMLInputElement>document.getElementById('startDate')).value,
      "endDate": (<HTMLInputElement>document.getElementById('endDate')).value,
      "passportNumber": (<HTMLSelectElement>document.getElementById('passport')).value,
      "expenseBorneBy": (<HTMLSelectElement>document.getElementById('expense')).value,
      "travelApproverName": (<HTMLInputElement>document.getElementById('approver')).value,
      "durationOfTravel": (<HTMLInputElement>document.getElementById('duration')).value,
      "upperBoundAmount": (<HTMLInputElement>document.getElementById('upperBound')).value,
      "additionalDetails": (<HTMLInputElement>document.getElementById('additionalInformation')).value,
      "project": (<HTMLInputElement>document.getElementById('project')).value
      /* "dateCreated": new Date().toISOString().substring(0, 10) */
    }

    console.log(sampleTicket);

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


