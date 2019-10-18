import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()

export class vendorReportModule  {

   handleError: any;
   headers: any;
   private empUrl = 'api/empcreateRecord';
   private getCompanies = '/api/getEmpCompany';
   private getBranches = '/api/getEmpBranch';
   private getdistinfo = 'api/getdistinfo';
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
   

     getDistributorInfo()    {
      
       return this.http.get(this.getdistinfo).map(response => response.json());
     }
  
}

