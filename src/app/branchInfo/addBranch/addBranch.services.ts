import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {FormGroup} from "@angular/forms";
@Injectable()  
export class AddbranchService {
  handleError: any;
  private saveUrl = 'api/saveBranchUrl';
  private getCompanies = 'api/getCompanies';
  private getCountries = 'api/getCountry';
  private getState = 'api/getState';
  private getCity = 'api/getCity';
  private countryCode = 'api/getCountrycode';
  private isBranchExistUrl = 'api/isBranchExist';
  private getAllCompanies = 'api/getAllCompanies';
  constructor(private http: Http) {}


  createBranch(cmpcreate: String) {
    let head = new Headers({'Content-Type': 'application/json'});
    this.http.post(this.saveUrl, cmpcreate, {headers: head}).map(response => response.json())
      .subscribe(
      () => {console.log(cmpcreate)}
      );
  }


  getCountry() {
    //Get Coutries 
    return this.http.get(this.getCountries).map(response => response.json());
  }

  getCompany(comp:number) {
    //Get Companies
    return this.http.get(this.getCompanies+'/'+comp).map(response => response.json());
  }
  
  getAllCompany() {
    //Get Companies
    return this.http.get(this.getAllCompanies).map(response => response.json());
  }


  getStates(countryid: number) {
    //Get States 
    return this.http.get(this.getState + '/' + countryid).map(response => response.json());
  }
  

  getCities(stateID: number) {
    //Get States 
    return this.http.get(this.getCity + '/' +stateID).map(response => response.json());
  }



  isExistBranch(brnchname: any,compID:any){
    //Get States 
    return this.http.get(this.isBranchExistUrl + '/' +brnchname+'/'+compID).map(response => response.json());
  }



  getCountrycode(countryid: number) {
    //Get Country Code
    return this.http.get(this.countryCode + '/' + countryid).map(response => response.json());
  }

}
