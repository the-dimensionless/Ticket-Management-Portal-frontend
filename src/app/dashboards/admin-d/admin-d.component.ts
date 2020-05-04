import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthAdminServicesService } from 'src/app/auth/admin/auth-admin-services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-d',
  templateUrl: './admin-d.component.html',
  styleUrls: ['./admin-d.component.css']
})
export class AdminDComponent implements OnInit {

  data: any;
  uploadForm: FormGroup;
  viewingTickets: boolean;
  ticket: any;
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

  constructor(private adminService: AdminService,
    private formBuilder: FormBuilder,
    private route: Router, private AdminAuthServicesService: AuthAdminServicesService) {
    this.data = JSON.parse(sessionStorage.getItem('admin'));
    console.log(this.data["pass"]);

    this.adminService.getTicketsAll(this.data).subscribe(
      loaded => {
        console.log("Collected tickets", loaded);
        this.data = loaded;
      }
    )

    this.viewingTickets = false;
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      file: [''],
      ticketId: '',
      comments: ''
    });
  }

  handle(event): void {
    this.ticket = event.data;
    this.viewingTickets = true;
    //navigate and update this ticket.
  }

  logout() {
    this.AdminAuthServicesService.logout();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }

  submitComment() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('ticketId', this.ticket["ticketId"]);
    formData.append('comments', this.uploadForm.get('comments').value);

    console.log(formData["file"]);
    this.adminService.addData(formData, this.ticket["ticketId"]).subscribe(
      data => {
        console.log("posted ", data);
      },
      err => {
        console.log("error", err);
      }
    );

  }

}
