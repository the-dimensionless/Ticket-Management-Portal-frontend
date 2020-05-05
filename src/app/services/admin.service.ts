import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  getTicketsAll(data) {
    let body = {
      "username": data["email"],
      "pass": data["password"]
    }
    return this.http.post("server/admin/getTickets", body);
  }

  getTicketOne(id: number) {
    return this.http.get("server/admin/" + id);
  }

  updateTicket(status, id) {
    let data = JSON.parse(sessionStorage.getItem('admin'));
    let body = {
      "username": data["email"],
      "pass": data["password"]
    }
    return this.http.post("server/admin/updateTicket/" + status + "/" + id, body, httpOptions);
  }

  login(form) {
    let body = {
      "username": form.value.username,
      "pass": form.value.password
    }
    return this.http.post('server/admin', body);
  }

  addData(body, id) {
    return this.http.post("server/admin/updateTicket/" + id + "/", body);
  }

}
