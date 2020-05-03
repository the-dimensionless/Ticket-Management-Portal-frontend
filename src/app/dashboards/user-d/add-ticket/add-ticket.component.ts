import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  viewEdit: boolean;

  constructor(private userService: UsersService) {
    this.viewEdit = false;
  }

  ngOnInit(): void {
  }

  printView(): void {
    window.print();
  }

  showView(form: NgForm) {
    this.userService.addUserTicket(1, form);
    this.viewEdit = true;
  }

  editView() {
    this.viewEdit = false;
  }
}
