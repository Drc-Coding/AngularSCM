import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from "@angular/forms";
import { IOption } from 'ng-select';
import { retry } from 'rxjs/operator/retry';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
@Injectable()
export class editdrugService {
  handleError: any;
  private drugUrl = 'api/drugupdateRecord';
  private countryUrl = 'api/viewcompanypRecord';
  private genericUrl = 'api/getGeneric';
  private genericCombinationUrl = 'api/getgenericCombination';
  private dosageUrl = 'api/getDosage';
  private uomUrl = 'api/getUom';
  private therapeuticUrl = 'api/getTherapeutic';
  private subtherapeuticUrl = 'api/getsubTherapeutic';
  private formulationUrl = 'api/getFormulation';
private  getDistributorchnURL =  'api/getdistinfo';



  private scheduleUrl = 'api/getSchedule';
  private insuranceUrl = 'api/getInsurance';
  private vatUrl = 'api/getVat';
  private gstUrl = 'api/getGst';
  private cgstUrl = 'api/getCgst';
  private sgstUrl = 'api/getSgst';
  private igstUrl = 'api/getIgst';
  private druginsurUrl = 'api/savedrugInsurance';

  /** Edit values From view URL**/
  private editValURL = 'api/getdrugeditval';
  private editSubthreaURL = 'api/getEditsubthreabetic';

  private geteditInsur = 'api/getEditinsurance';


  


  constructor(private http: Http, private http1: HttpClient) { }

  updateDrug(drugcreate: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    this.http.post(this.drugUrl, drugcreate, { headers: head }).map(response => response.json())
      .subscribe(
      () => { console.log(drugcreate) }
      );
  }
  /**Get Edit values From view From **/

  getdrugEditvalues(id: number) {
    return this.http.get(this.editValURL + '/' + id).map(response => response.json());
  }

  getEditsubthreabetic(theraid: number) {
    return this.http.get(this.editSubthreaURL + '/' + theraid).map(response => response.json());
  }


  geteditGeneric1(id: number) {
    return this.http.get(this.geteditGeneric1 + '/' + id).map(response => response.json());
  }


  geteditInsurance(id: number) {
    return this.http.get(this.geteditInsur + '/' + id).map(response => response.json());
  }

  /** Get Edit values From view From**/

  getval() {
    return this.http.get(this.countryUrl).map(response => response.json());
  }

  //Get Generic 
  getGeneric(value: string) {
    return this.http.get(this.genericUrl + '/' + value).map(response => response.json());
  }

  //Get GenericCombination
  getgenericCombination() {
    return this.http.get(this.genericCombinationUrl).map(response => response.json());
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


    //Get DistributorChannel
  getDistributorChannel() {
    return this.http.get(this.getDistributorchnURL).map(response => response.json());
  }




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
    const req = new HttpRequest('POST', '/api/uploadphoto', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http1.request(req);
  }

  //Edit Drug Methods   
  geteditFormulation(id: any) {
    return this.http.get('api/geteditformulation' + '/' + id).map(response => response.json());
  }


  geteditDistributorChannel(id: any) {
    return this.http.get('api/geteditDistributorChannel' + '/' + id).map(response => response.json());
  }





  geteditSchedule(id: any) {
    return this.http.get('api/geteditschedule' + '/' + id).map(response => response.json());
  }

  geteditVat(id: any) {
    return this.http.get('api/geteditvat' + '/' + id).map(response => response.json());
  }

  geteditGst(id: any) {
    return this.http.get('api/geteditgst' + '/' + id).map(response => response.json());
  }
  geteditSgst(id: any) {
    return this.http.get('api/geteditsgst' + '/' + id).map(response => response.json());
  }
  geteditCgst(id: any) {
    return this.http.get('api/geteditcgst' + '/' + id).map(response => response.json());
  }
  geteditIgst(id: any) {
    return this.http.get('api/geteditigst' + '/' + id).map(response => response.json());
  }

  updteDrug(drugcreate: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.drugUrl, drugcreate, { headers: head }).map(response => response.json());
  }

  geteditGeneric(id: any) {
    return this.http.get('api/geteditgeneric' + '/' + id).map(response => response.json());
  }

}
