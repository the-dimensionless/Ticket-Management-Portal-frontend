import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-d',
  templateUrl: './user-d.component.html',
  styleUrls: ['./user-d.component.css']
})
export class UserDComponent implements OnInit {
  public user_tickets;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userService.getUserData().subscribe(
      data => { this.user_tickets = data },
      err => console.error(err),
      () => console.log('user data has been loaded')
    );
  }

}
