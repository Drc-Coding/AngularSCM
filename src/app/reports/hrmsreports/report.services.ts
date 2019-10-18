import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()

export class hrmsReportModule  {

   handleError: any;
   headers: any;
   private empUrl = 'api/empcreateRecord';
   private getCompanies = '/api/getEmpCompany';
   private getBranches = '/api/getEmpBranch';
   private getShops = '/api/getEmpShop';

   constructor(private http: Http) { }

   getcompany(): Promise<any> {
       return this.http.get('api/getCompany')
       .toPromise()
       .then(response => response.json() as any)
       .catch(this.handleError);

      
   }

 
}

