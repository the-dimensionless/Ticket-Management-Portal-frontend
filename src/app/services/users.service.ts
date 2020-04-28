import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserTicketOne(id: number) {
    return this.http.get('server/user/login');
  }

  getUserTicketsAll(id: number) {
    return this.http.get('server/user/' + id);
  }

  addUserTicket(id: number, ticket) {
    let body = JSON.stringify(ticket);
    return this.http.post('user/' + id, body, httpOptions);
  }

  updateUserTicket(uid: number, tid: number, ticket) {
    let body = JSON.stringify(ticket);
    return this.http.put('users/' + uid + "/" + tid, body, httpOptions);
  }

  loginUser(username: string, password: string) {
    let body = {
      "username": username,
      "password": password
    }
    return this.http.post("user/login/", body, httpOptions);
  }

  registerUser(userformdata) {
    let body = JSON.stringify(userformdata);
    return this.http.post("users", body, httpOptions);
  }

}
