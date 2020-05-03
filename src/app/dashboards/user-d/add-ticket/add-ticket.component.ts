import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  viewEdit: boolean;

  constructor() {
    this.viewEdit = false;
  }

  ngOnInit(): void {
  }

  printView(): void {
    window.print();
  }

  showView() {
    this.viewEdit = true;
  }

  editView() {
    this.viewEdit = false;
  }
}
