import { Injectable } from '@angular/core';
//import {Http} from '@angular/http';
//import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DxNumberBoxModule } from 'devextreme-angular';
@Injectable()
export class DashboardService {
  private purchaseInvoicevalue = 'api/getpurchaseinvoicevalue';
  private weeklysales = 'api/weeklysalesbyshop';
  private salesInvoicevalue = 'api/getotalsalesbyshop';
    private weeklypurchase= 'api/purchasebyshop';
    private minstock='api/getminimunstock';
    private lastsale='api/SIDBoard';
  constructor(private http: Http) { }

  getMinimumQuantity(compid: number, branchid: number, locname: number, locrefid: number) {
    //Get minimum qunatity
    return this.http.get(this.minstock + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
  }

  getLastSale(compid: number, branchid: number, locname: number, locrefid: number) {
    //Get minimum qunatity
    return this.http.get(this.lastsale + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
  }

  getPurchaseValue(compid: number, branchid: number, locname: number, locrefid: number) {
    //Get getDrugList
    return this.http.get(this.purchaseInvoicevalue + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
  }
  getWeeklySales(compid: number, branchid: number, locname: number, locrefid: number, clientcdate: String) {
    return this.http.get(this.weeklysales + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + clientcdate).map(response => response.json());
  }
  getsalesValue(compid: number, branchid: number, locname: number, locrefid: number) {
    //Get getDrugList
    return this.http.get(this.salesInvoicevalue + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
  }
  
  getWeeklyPurchase(compid: number,branchid: number,locname:number,locrefid: number,clientcdate: String){
    return this.http.get(this.weeklypurchase+ '/'+compid+'/'+branchid+'/'+locname+'/'+locrefid+'/'+clientcdate).map(response => response.json());
  }
  todaypurchase(compid: number,branchid: number,locname:number,locrefid: number,clientcdate: String){
    return this.http.get('api/getpurchasechart'+ '/'+compid+'/'+branchid+'/'+locname+'/'+locrefid+'/'+clientcdate).map(response => response.json());
  }
  
  todaysales(compid: number,branchid: number,locname:number,locrefid: number,clientcdate: String){
    return this.http.get('api/getsaleschart'+ '/'+compid+'/'+branchid+'/'+locname+'/'+locrefid+'/'+clientcdate).map(response => response.json());
  }
  salesordertype(compid: number,branchid: number,locname:number,locrefid: DxNumberBoxModule){
    return this.http.get('api/getsalesordertype'+ '/'+compid+'/'+branchid+'/'+locname+'/'+locrefid).map(response => response.json());
  }
}