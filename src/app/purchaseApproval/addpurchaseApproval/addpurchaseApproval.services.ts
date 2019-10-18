import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class addpurchaseApprovalService {

  private invoiceURL = 'api/getApprovalinvoice';
  private AppURl = 'api/getPurcapprovaldata';
  private saveURL = 'api/savepurchaseApprovalRecord';
  private savemaintanceURL = 'api/savepurchaseApprovaldata';
  constructor(private http: Http) { }

  getApprovalinvoices(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.invoiceURL + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  getPurcApprovaldata(id: number) {
    return this.http.get(this.AppURl + '/' + id).map(res => res.json());
  }
  /* Create purchase Invoice  Record */
  getApprovaldata(data: string): any {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.saveURL, data, { headers: head }).map(response => response.json()).catch(this._serverError);
  }

  getApprovalrecord(data: string): any {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.savemaintanceURL, data, { headers: head }).map(response => response.json()).catch(this._serverError);
  }

  private _serverError(err: any) {
    console.log('sever error:', err);  // debug
    if (err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }
}