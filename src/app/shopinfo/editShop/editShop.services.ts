import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";

@Injectable()
export class shopeditService {
  handleError: any;
  private shopUrl = 'api/updateshopRecord';
  private getid = 'api/shopid';
  private getCountries = 'api/getCountry';
  private geteditState = 'api/geteditshopState';
  private geteditCitys = 'api/geteditshopCity';
  private getState = 'api/getState';
  private getCitys = 'api/getCity';
  private geteditState1 = 'api/geteditshopsState';
  private geteditCitys1 = 'api/geteditshopsCity';
  private geteditCompany1 = 'api/geteditcompany1';
  private geteditBranch1 = 'api/geteditbranch1';
  private getAllCompanies = 'api/getAllCompanies';
  constructor(private http: Http) { }

  shopeditservice(id: number) {
    return this.http.get(this.getid + '/' + id).map(response => response.json());
  }


  updateShoprecord(updatecreate: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    this.http.post(this.shopUrl, updatecreate, { headers: head }).map(response => response.json())
      .subscribe(
        () => { console.log("Error Occured On update Record") }
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


  geteditStates(id: number) {
    //Get EditStates 
    return this.http.get(this.geteditState + '/' + id).map(response => response.json());
  }

  geteditCity(id: number) {
    //Get Edit City 
    return this.http.get(this.geteditCitys + '/' + id).map(response => response.json());
  }

  geteditStates1(id: number) {
    //Get EditStates 
    return this.http.get(this.geteditState1 + '/' + id).map(response => response.json());
  }

  geteditCity1(id: number) {
    //Get Edit City 
    return this.http.get(this.geteditCitys1 + '/' + id).map(response => response.json());
  }

  geteditCompany(id: number) {
    //Get Edit company
    return this.http.get(this.geteditCompany1 + '/' + id).map(response => response.json());
  }

  geteditBranch(id: number) {
    //Get Edit Branch
    return this.http.get(this.geteditBranch1 + '/' + id).map(response => response.json());
  }
  getBranch(cid: any) {
    return this.http.get('api/userbranchlist' + '/' + cid).map(res => res.json());
  }
  getAllCompany() {
    //Get Companies
    return this.http.get(this.getAllCompanies).map(response => response.json());
  }

}
