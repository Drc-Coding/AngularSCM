import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {FormGroup} from "@angular/forms";

@Injectable()
export class brancheditService {
  handleError: any;
  private cmpupdateUrl = 'api/updateBranchUrl';
  private getBridId = 'api/brnchId';
  private getid = 'api/branchId';
  private getCountries = 'api/getCountry';
  private getState = 'api/getState';
  private getCity = 'api/getCity';
  private countryCode = 'api/getCountrycode';
  private getCompanies = 'api/getCompanies';
  private isBranchExistUrl = 'api/isBranchUpdateExist';


  //Below Url Onload Get ID  into  vales

  private editStateUrl = 'api/geteditBranchState';
  private editCityUrl = 'api/geteditBranchCity';
  private editCcodeUrl = 'api/geteditBranchCcode';

  constructor(private http: Http) {}

   comppeditservice(id: number) {
    return this.http.get(this.getBridId + '/' + id).map(response => response.json());
  }
  
  getCompany() {
    //Get Companies
    return this.http.get(this.getCompanies).map(response => response.json());
  }
  
  brancheditservice(id: number) {
    return this.http.get(this.getid + '/' + id).map(response => response.json());
  }


  updateBranchRecord(updatecreate: String) {
    let head = new Headers({'Content-Type': 'application/json'});
    this.http.post(this.cmpupdateUrl, updatecreate, {headers: head}).map(response => response.json())
      .subscribe(
      () => {console.log(updatecreate)}
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


  getCountrycode(countryid: number) {
    //Get Country Code
    return this.http.get(this.countryCode + '/' + countryid).map(response => response.json());
  }

  

  getCities(cityId: number) {
    //Get States 
    return this.http.get(this.getCity + '/' + cityId).map(response => response.json());
  }



  //Below Methods Onload Get ID  into  values
  
 

  getEditStates(id: number) {
    //Get States 
    return this.http.get(this.editStateUrl + '/' + id).map(response => response.json());
  }

   getEditCities(id: number) {
    //Get States 
    return this.http.get(this.editCityUrl + '/' + id).map(response => response.json());
  }
  
  getCcode(id: number) {
    //Get States 
    return this.http.get(this.editCcodeUrl + '/' + id).map(response => response.json());
  }
  
  isExistBranch(brnchname: any,brnchid: number,compID: number){
    //Get States 
    return this.http.get(this.isBranchExistUrl + '/' +brnchname+'/'+brnchid+'/'+compID).map(response => response.json());
  }
}
