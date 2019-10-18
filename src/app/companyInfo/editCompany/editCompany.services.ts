import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {FormGroup} from "@angular/forms";

@Injectable()
export class companyeditService {
  handleError: any;
  private cmpupdateUrl = 'api/updateCompanyinfo';
  private getid = 'api/compid';
  private productinfoUrl = 'api/getproductinfo';
  private getCountries = 'api/getCountry';
  private getState = 'api/getState';
  private countryCode = 'api/getCountrycode';
  private DomainUrl = 'api/getDomain';
  private SubDomainUrl = 'api/getsubDomain';
  private editionUrl = 'api/getEdition';
  private getCitys = 'api/getCity';
  //Below Url Onload Get ID  into  vales
  private editStateUrl = 'api/geteditState';
  private editCityUrl = 'api/geteditCity';
  private editCcodeUrl = 'api/geteditCcode';
  private editProductUrl = 'api/geteditproductinfo';
  private editDomainUrl = 'api/geteditDomain';
  private editSubdomainUrl = 'api/geteditsubDomain';
  private editEditionUrl = 'api/geteditEdition';

  constructor(private http: Http) {}

  comppeditservice(id: number) {
    return this.http.get(this.getid + '/' + id).map(response => response.json());
  }


  updateCmprecord(updatecreate: String) {
    let head = new Headers({'Content-Type': 'application/json'});
    this.http.post(this.cmpupdateUrl, updatecreate, {headers: head}).map(response => response.json())
      .subscribe(
      () => {console.log(updatecreate)}
      );
  }
  getProductinfo(id: number) {
    //Get product Info
    return this.http.get(this.productinfoUrl + '/' + id).map(response => response.json());
  }

  getCountry() {
    //Get Coutries 
    return this.http.get(this.getCountries).map(response => response.json());
  }

  getDomainInfo(cid: number, pid: number) {
    //Get Domain Information 
    return this.http.get(this.DomainUrl + '/' + cid + '/' + pid).map(response => response.json());
  }

  getsubDomainInfo(cid: number, pid: number, did: number) {
    //Get Sub Domain Information 
    return this.http.get(this.SubDomainUrl + '/' + cid + '/' + pid + '/' + did).map(response => response.json());
  }

  getEdition(cid: number, pid: number, did: number, sdid: number) {
    //Get Edition Information
    return this.http.get(this.editionUrl + '/' + cid + '/' + pid + '/' + did + '/' + sdid).map(response => response.json());
  }

  getStates(countryid: number) {
    //Get States 
    return this.http.get(this.getState + '/' + countryid).map(response => response.json());
  }

  getCountrycode(countryid: number) {
    //Get Country Code
    return this.http.get(this.countryCode + '/' + countryid).map(response => response.json());
  }
  
getCity(sid: number) {
    //Get City 
    return this.http.get(this.getCitys + '/' + sid).map(response => response.json());
  }


  //Below Methods Onload Get ID  into  values

  getEditStates(id: number) {
    //Get States 
    return this.http.get(this.editStateUrl + '/' + id).map(response => response.json());
  }

  getEditProduct(id: number) {
    //Get Product Name 
    return this.http.get(this.editProductUrl + '/' + id).map(response => response.json());
  }

  getEditDomain(id: number) {
    //Get Edit Domain Name 
    return this.http.get(this.editDomainUrl + '/' + id).map(response => response.json());
  }

  getEditSubDomain(id: number) {
    //Get Edit Sub Domain Name 
    return this.http.get(this.editSubdomainUrl + '/' + id).map(response => response.json());
  }

  getEditEdition(id: number) {
    //Get Edition  Name 
    return this.http.get(this.editEditionUrl + '/' + id).map(response => response.json());
  }

  getCcode(id: number) {
    //Get States 
    return this.http.get(this.editCcodeUrl + '/' + id).map(response => response.json());
  }
  geteditCity(id:number)
  {
    //Get City 
    return this.http.get(this.editCityUrl + '/' + id).map(response => response.json());
  }
}
