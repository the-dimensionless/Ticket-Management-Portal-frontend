import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthAdminServicesService } from 'src/app/auth/admin/auth-admin-services.service';

@Component({
  selector: 'app-admin-d',
  templateUrl: './admin-d.component.html',
  styleUrls: ['./admin-d.component.css']
})
export class AdminDComponent implements OnInit {

  data: any;
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      perPage: 5
    },
    columns: {
      dateUpdated: {
        title: 'Submission Date'
      },
      priority: {
        title: 'Priority',
        sort: true
      },
      project: {
        title: 'Project Name'
      },
      toLocation: {
        title: 'Travel City'
      },
      status: {
        title: 'Status'
      }
    }
  };

  constructor(private adminService: AdminService, private AdminAuthServicesService: AuthAdminServicesService) {
    this.data = JSON.parse(sessionStorage.getItem('admin'));
    console.log(this.data["pass"]);

    this.adminService.getTicketsAll(this.data).subscribe(
      loaded => {
        console.log("Collected tickets", loaded);
        this.data = loaded;
      }
    )
  }

  ngOnInit(): void {
  }

  handle(event): void {
    console.log(event.data);
    //navigate and update this ticket.
  }

  logout() {
    this.AdminAuthServicesService.logout();
  }

}
