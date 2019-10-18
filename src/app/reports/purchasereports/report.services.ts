import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()

export class purchaseReportModule  {

   handleError: any;
   headers: any;
   private countryURL = 'api/getCountry';
 private getState = 'api/getState';
 private getCitys = 'api/getCity';
 private countryCode = 'api/getCountrycode';
   private empUrl = 'api/empcreateRecord';
   private getCompanies = '/api/getEmpCompany';
   private getBranches = '/api/getEmpBranch';
   private getdistinfo = 'api/getdistinfo';
   private prolist = 'api/getdrugval';
   private batchlist = 'api/batchname';
   private Purinvoice = 'api/purchaseinvoice';

    constructor(private http: Http) { }

   getcompany(): Promise<any> {
       return this.http.get('api/getCompany')
       .toPromise()
       .then(response => response.json() as any)
       .catch(this.handleError);

      
   }
   getProductlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.prolist + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  getbatchnamelist(val: any, cid: any, bid: any, locname: any, locrefid: any) {
    return this.http.get(this.batchlist + '/' + val + '/' + cid + '/' + bid + '/' + locname + '/'+ locrefid).map(res => res.json());
  }
  
  getpurchaseinvoice(cid:any, bid:any, locname:any, locrefid:any){
    return this.http.get(this.Purinvoice  + '/' + cid + '/' + bid + '/' + locname + '/' + locrefid).map(res => res.json());
  }
   getBranch(cid: any) {
       return this.http.get('api/userbranchlist' + '/' + cid).map(res => res.json());
     }
   

     getDistributorInfo()    {
      
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
  
}

