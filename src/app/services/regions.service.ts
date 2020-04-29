import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class RegionsService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get("https://restcountries.eu/rest/v2/all");
  }

  getStates(name: string) {
    return this.http.get("");
  }

  getCities(name: string) {
    return this.http.get("");
  }
}
