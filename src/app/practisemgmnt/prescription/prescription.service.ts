import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";



@Injectable()
export class PrescriptionService {
    constructor(private http: Http) { }

    getsolist(cid: number, bid: number, loc: number, lrid: number) {
        return this.http.get('api/getprescsalesorder' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid).map(response => response.json());
      }
      getsearchproduct(cid: number, bid: number, loc: number, lrid: number,val:any) {
        return this.http.get('api/getprescprodetail' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid+'/'+val).map(response => response.json());
      }
      getprecdetails(orderid:any) {
        return this.http.get('api/getprescslsordetail' + '/' + orderid).map(response => response.json());
      }

      saveprescptionlist(data: String) {
        let head = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('api/saveprescdigi', data, { headers: head }).map(response => response.json())
      }
      saveprescptionprod(data: String) {
        let head = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('api/saveprescdigitable', data, { headers: head }).map(response => response.json())
      }
      getproduct(compid: number,val:any) {
        return this.http.get('api/getproduct' + '/' + compid+'/'+val).map(response => response.json());
      }

      getemplist(cid: number, bid: number, loc: number, lrid: number) {
        return this.http.get('api/getPrescEmpdetails' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid).map(response => response.json());
      }


      rectionservice(cid: number, bid: number, loc: number, lrid: number,orderid: number) {
        return this.http.get('api/rejectedpresc' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid+ '/' + orderid).map(response => response.json());
      }
}