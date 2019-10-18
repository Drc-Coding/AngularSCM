import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class crmReportService  {

   handleError: any;
   headers: any;
  //  private empUrl = 'api/empcreateRecord';
  //  private getCompanies = 'api/getEmpCompany';
  //  private getBranches = 'api/getEmpBranch';
  private getcustinfo = 'api/getcustinfo';
    constructor(private http: Http) { }

  //  getcompany(): Promise<any> {
  //      return this.http.get('api/getCompany')
  //      .toPromise()
  //      .then(response => response.json() as any)
  //      .catch(this.handleError);

      
  //  }

  //  getBranch(cid: any) {
  //      return this.http.get('api/userbranchlist' + '/' + cid).map(res => res.json());
  //    }
   
  getCustomerInfo(compid: number, branchid: number, locname: number, locrefid: number)    {
      
    return this.http.get(this.getcustinfo  + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
  }
  
}

