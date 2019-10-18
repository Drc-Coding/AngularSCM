import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
@Injectable()
/**@Author Ajith Kumar**/
export class shopService {
  handleError: any;
  private shopUrl = 'api/createshopRecord';
  private getCountries = 'api/getCountry';
  private getState = 'api/getState';
  private getCitys = 'api/getCity';
  private getAllCompanies = 'api/getAllCompanies';

  constructor(private http: Http) { }

  createShop(shopcreate: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    this.http.post(this.shopUrl, shopcreate, { headers: head }).map(response => response.json())
      .subscribe(
        () => { console.log("Error Occured On Shop Create") }
      );
  }

  getCountry() {
    //Get Coutries 
    return this.http.get(this.getCountries).map(response => response.json());
  }
  getStates(countryid: number) {
    //Get States 
    return this.http.get(this.getState + '/' + countryid).map(response => response.json());
  }

  getCity(sid: number) {
    //Get City 
    return this.http.get(this.getCitys + '/' + sid).map(response => response.json());
  }
  getBranch(cid: any) {
    return this.http.get('api/userbranchlist' + '/' + cid).map(res => res.json());
  }
  getAllCompany() {
    //Get Companies
    return this.http.get(this.getAllCompanies).map(response => response.json());
  }

}
