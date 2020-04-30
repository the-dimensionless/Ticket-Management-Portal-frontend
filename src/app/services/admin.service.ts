import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  getTicketsAll() {
    return this.http.get("server/admin/");
  }

  getTicketOne(id: number) {
    return this.http.get("server/admin/" + id);
  }

  updateTicket(ticket) {
    let body = JSON.stringify(ticket);
    return this.http.put("server/admin", body, httpOptions);
  }

}
