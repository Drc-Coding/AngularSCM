import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class purchaseOrderViewService{
  handleError: any;
  headers: any;
  private viewPurchaseOrder = 'api/viewpurchaseorder';
  private deletePurchaseOrder='api/deletePurchaseOrder'

  constructor(private http: Http) {}

  viewPurchaseOrders(compid: number,brnchid: number,loc: number,locref: number) {  
    return this.http.get(this.viewPurchaseOrder+"/"+compid+"/"+brnchid+"/"+loc+"/"+locref).map(response => response.json());
  }


  
  PurchaseOrderDelete(poid: number) {  
    return this.http.get(this.deletePurchaseOrder+'/'+poid).map(response => response.json());
  }


}
