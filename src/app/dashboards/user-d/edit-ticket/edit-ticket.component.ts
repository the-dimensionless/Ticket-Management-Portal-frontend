import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { timingSafeEqual } from 'crypto';

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

}


