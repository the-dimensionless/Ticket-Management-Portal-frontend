import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServicesService } from 'src/app/auth/auth-services.service';
import * as FileSaver from 'file-saver';


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
  comments: any;

  constructor(private actRoute: ActivatedRoute,
    private auth: AuthServicesService, private userService: UsersService) {
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

    this.getResponses();

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
          window.scrollTo(0, 0);
        },
        err => console.log(err)
      );
    }
  }

  logout() {
    this.auth.logout();
  }

  getResponses() {
    this.userService.getAdminResponses(this.ticket_id).subscribe(
      data => {
        this.comments = data;
      },
      err => {
        console.log("error ", err);
      }
    );
  }

  display(comment) {
    fetch(`data:application/pdf;base64,${comment.file}`)
      .then(res => res.blob())
      .then(blob => FileSaver.saveAs(blob, "adminResponse.pdf"))
  }
}


