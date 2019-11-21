import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from "@angular/forms";
import { IOption } from 'ng-select';
import { retry } from 'rxjs/operator/retry';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
@Injectable()
export class adddrugService {
  handleError: any;
  private drugUrl = 'api/drugcreateRecord';
  private countryUrl = 'api/viewcompanypRecord';
  private genericUrl = 'api/getGeneric';
  private genericCombinationUrl = 'api/getgenericCombination';
  private dosageUrl = 'api/getDosage';
  private uomUrl = 'api/getUom';
  private therapeuticUrl = 'api/getTherapeutic';
  private subtherapeuticUrl = 'api/getsubTherapeutic';
  private formulationUrl = 'api/getFormulation';
  private getDistributorchnURL =  'api/getdistinfo';
  private getManufactureUrl = 'api/getPharmacompany';

  //private manufactuereDivisionUrl = 'api/manufacturerdivision';

  private saveManufacturerURL = 'api/savemanufacturer';

  private saveMaingroupURL = 'api/savemaingroup';
  private saveSubgroup1URL = 'api/savesubgroup1';
  private saveSubgroup2URL = 'api/savesubgroup2';


  private scheduleUrl = 'api/getSchedule';
  private insuranceUrl = 'api/getInsurance';
  private vatUrl = 'api/getVat';
  private gstUrl = 'api/getGst';
  private cgstUrl = 'api/getCgst';
  private sgstUrl = 'api/getSgst';
  private igstUrl = 'api/getIgst';
  private druginsurUrl = 'api/savedrugInsurance';
  private getFileuploadedURL = 'api/getUploadfiles';



  private saveGenericnameURL = 'api/genericname';

  private mainurl = 'api/getmain';
  private subgroup1Url = 'api/getsubgroup1';
  private subgroup2Url = 'api/getsubgroup2';

  private deviceurl='api/User/saveUserActivity';

  constructor(private http: Http, private http1: HttpClient) { }



  getFieldhide(cid: any, bid: any, shopid: any, locname: any) {
    return this.http.get('api/getTaxmaster' + '/' + cid + '/' + bid + '/' + shopid + '/' + locname).map(res => res.json());
  }


  mainGroup() {

    return this.http.get(this.mainurl).map(response => response.json());
  }

  subGroup1(subgroupid1: number) {
    return this.http.get(this.subgroup1Url + '/' + subgroupid1).map(response => response.json());
  }

  subGroup2(subgroupid2: number) {
    return this.http.get(this.subgroup2Url + '/' + subgroupid2).map(response => response.json());
  }



  createDrug(drugcreate: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.drugUrl, drugcreate, { headers: head }).map(response => response.json());
  }

  getval() {
    return this.http.get(this.countryUrl).map(response => response.json());
  }

  //Get Generic 
  getGeneric(value: string) {
    return this.http.get(this.genericUrl + '/' + value).map(response => response.json());
  }

  //Get Manufacturer
  getManufacturer(value: string) {

    return this.http.get(this.getManufactureUrl + '/' + value).map(response => response.json());
  }

  //Get GenericCombination
  getgenericCombination(value: string) {
    return this.http.get(this.genericCombinationUrl + '/' + value).map(response => response.json());
  }

  //Get Dosage
  getDosage() {
    return this.http.get(this.dosageUrl).map(response => response.json());
  }

  //Get UOM
  getUom() {
    return this.http.get(this.uomUrl).map(response => response.json());
  }

  //Get getTherapeutic
  getTherapeutic() {
    return this.http.get(this.therapeuticUrl).map(response => response.json());
  }

  //Get getsubTherapeutic
  getSubthera(theraid: number) {
    return this.http.get(this.subtherapeuticUrl + '/' + theraid).map(response => response.json());
  }

  //Get Formulation
  getFormulation() {
    return this.http.get(this.formulationUrl).map(response => response.json());
  }

  getdistributorchannel(){

    return this.http.get(this.getDistributorchnURL).map(response => response.json());
  }


  // Get GetmanufactuereDivision

  // getmanufactuereDivision(mannameid: String) {

  //   return this.http.get(this.manufactuereDivisionUrl + '/' + mannameid).map(response => response.json());

  // }


  //Get getSchedule
  getSchedule() {
    return this.http.get(this.scheduleUrl).map(response => response.json());
  }

  //Get Insurance
  getInsurance() {
    return this.http.get(this.insuranceUrl).map(response => response.json());
  }

  //Get vat
  getVat() {
    return this.http.get(this.vatUrl).map(response => response.json());
  }

  //Get Gst
  getGst() {
    return this.http.get(this.gstUrl).map(response => response.json());
  }

  //Get Sgst
  getSgst() {
    return this.http.get(this.sgstUrl).map(response => response.json());
  }

  //Get Cgst
  getCgst() {
    return this.http.get(this.cgstUrl).map(response => response.json());
  }
  //Get Igst 
  getIgst() {
    return this.http.get(this.igstUrl).map(response => response.json());
  }

  insuranceSave(ins: string) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    this.http.post(this.druginsurUrl, ins, { headers: head }).map(response => response.json())
      .subscribe(
        () => { console.log(ins) }
      );
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'api/uploadphoto', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http1.request(req);
  }


  //get Upload files 
  getImage(id: number): Observable<any> {
    return this.http.get(this.getFileuploadedURL + '/' + id)
      .map((response: Response) => {
        return response.json();
      })
  }


  getATC(id: any) {
    return this.http.get('api/getATC' + '/' + id).map(res => res.json());
  }

  saveGenCobination(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('api/savecombination', data, { headers: head }).map(response => response.json())

  }


  saveGenericname(serobj: string) {


    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    //return this.http.get(this.saveGenericnameURL + '/' + serobj).map(res => res.json());



    return this.http.post(this.saveGenericnameURL, serobj, options)  .map((res: Response) => res.json());

  }


  // saveManufacturername(manuobj: string) {

  //   let header = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: header });

  //   return this.http.get(this.saveManufacturerURL + '/' + manuobj).map(res => res.json());

  // }

  saveMaingroup(maingroupobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });


    return this.http.post(this.saveMaingroupURL, maingroupobj, { headers: header }).map(response => response.json());

  }


  saveSubgroup1(subgroupobj1: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.saveSubgroup1URL, subgroupobj1, { headers: header }).map(response => response.json());
  }


  saveSubgroup2(subgroupobj2: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.saveSubgroup2URL, subgroupobj2, { headers: header }).map(response => response.json());
  }

  devicedetails(data){

    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
  
    return this.http
      .post(this.deviceurl, data, options)  .map((res: Response) => res.json());  
}

}
