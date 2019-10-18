import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class viewInvoicesessionService {
  private sesUrl = 'api/getSessionview';
  private sDetailscUrl = 'api/getpurcSessiondetails';
  private chartURL = 'api/getSessionchartdata';
  private sessURL = 'api/getsessionall';
  
  constructor(private http: Http) { }

  viewsessionPurchase(cid: any, bid: any, locname: any, locrefid: any) {
    return this.http.get(this.sesUrl + '/' + cid + '/' + bid + '/' + locname + '/' + locrefid).map(response => response.json());
  }

  viewSessionDetails(id: number) {
    return this.http.get(this.sDetailscUrl + '/' + id).map(res => res.json());
  }

  viewChart() {
    return this.http.get(this.chartURL).map(res => res.json());
  }

  viewSessionAll(cid: any, bid: any, locname: any, locrefid: any) {
    return this.http.get(this.sessURL + '/' + cid + '/' + bid + '/' + locname + '/' + locrefid).map(response => response.json());
  }
}
