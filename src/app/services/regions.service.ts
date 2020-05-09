import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class RegionsService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get('server/region/getCountryList');
  }

  getStates(stateId: number) {
    return this.http.get('server/region/getStateList/' + stateId);
  }

  getCities(stateId: number) {
    return this.http.get('server/region/getCityList/' + stateId);
  }

  getAllCities() {
    return this.http.get('server/region/getAllCities');
  }
}
