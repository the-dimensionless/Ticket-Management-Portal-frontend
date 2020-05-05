import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tick } from '@angular/core/testing';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
interface Ticket {
  ticketId: number,
  requestType: string,
  status: string,
  dateCreated: string
}
@Injectable()
export class UsersService {

  private userToken: string;
  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem('token');
    this.userToken = token;
    /*  httpOptions.headers.append("Authorization", "Basic " + token); */
  }

  getUserTicketOne(uid: number, tid: number) {
    return this.http.get('server/user/' + uid + "/" + tid);
  }

  getUserTicketsAll(id: number) {
    return this.http.get('server/user/' + id, httpOptions);
    /* return this.http.get('server/user/' + id, httpOptions); */
  }

  addUserTicket(id: number, ticket) {
    let body = JSON.stringify(ticket);
    console.log("about to send on id", id);
    return this.http.post('server/user/' + id, body, httpOptions);
  }

  updateUserTicket(uid: number, tid: number, ticket) {
    console.log("about to send on id", ticket);
    return this.http.put('server/user/' + uid + "/" + tid, ticket, httpOptions);
  }

  loginUser(username: string, password: string) {
    let body = {
      "username": username,
      "pass": password
    }
    return this.http.post("server/user/login", body, httpOptions);
  }

  registerUser(userformdata) {
    let body = JSON.stringify(userformdata);
    return this.http.post("server/user", body, httpOptions);
  }

  getCoronaData(link: string) {
    return this.http.get(link);
  }

  getAdminResponses(id: number) {
    return this.http.get('server/user/getAdminResponses/' + id);
  }
}
