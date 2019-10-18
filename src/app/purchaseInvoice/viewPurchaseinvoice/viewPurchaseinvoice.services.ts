import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
@Injectable()
export class viewinvoiceService {
  handleError: any;
  private viewcPurcUrl = 'api/viewPurchasemaintance';
  private deletepurcUrl = 'api/deletepurchaseRecord';
  constructor(private http: Http) { }

  viewPurchase(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.viewcPurcUrl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(response => response.json());
  }

  deletePurc(id: number) {
    return this.http.get(this.deletepurcUrl + '/' + id).map(response => response.json());
  }

}
