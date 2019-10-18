import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()

export class hqReportServices {

  handleError: any;
  headers: any;
  private empUrl = 'api/empcreateRecord';
  private getCompanies = 'api/getEmpCompany';
  private getBranches = 'api/getEmpBranch';
  private getShops = 'api/getEmpShop';
  private getAllCompanies = 'api/getAllCompanies';
  private getcustinfo = 'api/getcustinfo';
  private getdistinfo = 'api/getdistinfo';
  private getState = 'api/getState';
  private getCitys = 'api/getCity';
  private countryCode = 'api/getCountrycode';
  private countryURL = 'api/getCountry';


  constructor(private http: Http) { }


  getcompany(): Promise<any> {
    return this.http.get('api/getCompany')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);


  }

  getBranch(cid: any) {
    return this.http.get('api/userbranchlist' + '/' + cid).map(res => res.json());
  }

  getShopName(bid: any) {
    return this.http.get('api/getshopname' + '/' + bid).map(res => res.json());
  }

  getAllCompany() {
    //Get Companies
    return this.http.get(this.getAllCompanies).map(response => response.json());
  }

  getCustomerInfo() {

    return this.http.get(this.getcustinfo).map(response => response.json());
  }


  getDistributorInfo() {

    return this.http.get(this.getdistinfo).map(response => response.json());
  }


  getCountry() {
    return this.http.get(this.countryURL).map(response => response.json());
  }

  getStates(countryid: number) {
    return this.http.get(this.getState + '/' + countryid).map(response => response.json());
  }

  getCountrycode(countryid: number) {
    return this.http.get(this.countryCode + '/' + countryid).map(response => response.json());
  }

  getCity(sid: number) {
    return this.http.get(this.getCitys + '/' + sid).map(response => response.json());
  }

  getshop(cid: number,bid: number){
    return this.http.get('api/getshopname1' + '/' + cid + '/' + bid).map(res => res.json());

  }

  getdist(cid: number,bid: number){
    return this.http.get('api/getshopname1' + '/' + cid + '/' + bid).map(res => res.json());

  }
}