import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';

@Injectable()
export class salesreportService {
 private countryURL = 'api/getCountry';
 private getcustinfo = 'api/getcustinfo';
 private getState = 'api/getState';
 private getCitys = 'api/getCity';
 private countryCode = 'api/getCountrycode';
 private deviceurl='api/User/saveUserActivity';


 private headers = new Headers({ 'Content-Type': 'application/json' });

 constructor(private http: Http) { }
 private handleError(error: any): Promise<any> {
   return Promise.reject(error.message || error);
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

 getCustomerInfo(compid: number, branchid: number, locname: number, locrefid: number)    {
      
   return this.http.get(this.getcustinfo  + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
 }

 getsotype(){
      
  return this.http.get('api/salesOrderType').map(response => response.json());
}
getManufacturer(value: string) {

  return this.http.get('api/getPharmacompany' + '/' + value).map(response => response.json());
}

viewdevicedetails(data){
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

  return this.http
    .post(this.deviceurl, data, options)  .map((res: Response) => res.json());
}


}


