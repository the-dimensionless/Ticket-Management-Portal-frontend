import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Router, NavigationExtras } from '@angular/router';
import { AuthServicesService } from 'src/app/auth/auth-services.service';

interface Ticket {
  id: number;
  dateCreated: string;
  status: string;
  requestType: string;
}

@Component({
  selector: 'app-user-d',
  templateUrl: './user-d.component.html',
  styleUrls: ['./user-d.component.css']
})

export class UserDComponent implements OnInit {

  public id: number;
  public fname: string;
  public email: string;
  public target: string;
  public user_tickets = [];
  page: number = 1;
  totalRec: number;

  constructor(private userService: UsersService,
    private auth: AuthServicesService, private route: Router) {
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit(): void {
    let userData = JSON.parse(sessionStorage.getItem('user'));
    this.id = userData["userId"];
    this.fname = userData["userName"];
    this.email = userData["emailId"];

    this.getData();
    var x = document.getElementById("chart");
    x.style.display = "none";
  }

  getData() {
    this.userService.getUserTicketsAll(this.id).toPromise().then(
      data => {
        for (let key in data)
          if (data.hasOwnProperty(key))
            this.user_tickets.push(data[key]);
      }
    );
    this.totalRec = this.user_tickets.length;

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

    let country = (<HTMLInputElement>document.getElementById('corona-target')).value;
    this.target = country;
    let url = "https://api.covid19api.com/live/country/" + country + "/status/confirmed/date/2020-03-21T13:13:30Z";

    this.userService.getCoronaData(url).subscribe(
      data => {
        this.onLoad(data);
        var x = document.getElementById("chart");
        x.style.display = "block";
      },
      err => {
        console.log("error", err);
      }
    )
  }

  onLoad(data) {
    let barHeights = [];
    let labels = [];
    data.forEach(element => {
      barHeights.push(element["Active"]);
      labels.push(element["Date"].substring(0, 10));
    });
    this.barChartData = [
      { data: barHeights, label: 'Corona Active Cases in ' + this.target }
    ]
    this.barChartLabels = labels;
  }

  view(ticket) {

  }
}
