import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";



@Injectable()
export class PrescriptionApprovalService {
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

      getprescriptionlist(cid: number, bid: number, loc: number, lrid: number) {
        return this.http.get('api/prescdigino' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid).map(response => response.json());
      }   

      getprescriptionapprlist(cid: number, bid: number, loc: number, lrid: number) {
        return this.http.get('api/prescdiginoapprv' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid).map(response => response.json());
      }  

      getprescripfield(cid: number, bid: number, loc: number, lrid: number, pres: number) {
        return this.http.get('api/prescdigichecking' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid + '/' +pres).map(response => response.json());
      } 

      getprescrippro(cid: number, bid: number, loc: number, lrid: number, pres: number) {
        return this.http.get('api/presccheckingpro' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid + '/' +pres).map(response => response.json());
      } 

      getemplist(cid: number, bid: number, loc: number, lrid: number) {
        return this.http.get('api/getPrescEmpdetails' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid).map(response => response.json());
      }
      checkprescptionlist(data: String) {
        let head = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('api/checkprescdigi', data, { headers: head }).map(response => response.json())
      }
      checkprescptionprod(data: String) {
        let head = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('api/checkprescdigitable', data, { headers: head }).map(response => response.json())
      }
      viewprescription(cid: number, bid: number, loc: number, lrid: number) {
        return this.http.get('api/viewprescriptio' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid).map(response => response.json());
      }
}