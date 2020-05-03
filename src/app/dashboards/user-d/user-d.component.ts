import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-d',
  templateUrl: './user-d.component.html',
  styleUrls: ['./user-d.component.css']
})
export class UserDComponent implements OnInit {

  public id: number;
  public fname: string;
  public email: string;
  public user_tickets;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    let userData = JSON.parse(sessionStorage.getItem('user'));
    this.id = userData["userId"];
    this.fname = userData["userName"];
    this.email = userData["emailId"];

    this.getData();
    console.log(this.user_tickets);
  }

  getData() {
    this.userService.getUserTicketsAll(this.id).subscribe(
      data => { this.user_tickets = data },
      err => console.error(err),
      () => console.log('user data has been loaded')
    );
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Corona Active Cases' }
  ];

  display() {
    var x = document.getElementById("chart");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}
