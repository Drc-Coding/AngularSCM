import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
@Injectable()
export class DataStocks {
  private pURl = 'api/stockproductdata';
  private proURL = 'api/getStockdosage';
  private formURL = 'api/getStockformulation';
  private vatUrl = 'api/getVat';
  private gstUrl = 'api/getGst';
  private cgstUrl = 'api/getCgst';
  private sgstUrl = 'api/getSgst';
  private igstUrl = 'api/getIgst';
  private utgstUrl = 'api/getutgst';
  private saveURL = 'api/saveStockdata';
  private viewUrl = 'api/viewstockdata';
  private edURL = 'api/editstockdata';
  private UpURL = 'api/updateStockdata';
  private delURL = 'api/deletestockdata';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  getProduct(searchValue: string, cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.pURl + '/' + searchValue + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }
  getDosagevalues(id: any) {
    return this.http.get(this.proURL + '/' + id).map(res => res.json());
  }
  getFormulvalues(id: any) {
    return this.http.get(this.formURL + '/' + id).map(res => res.json());
  }
  getVat() {
    return this.http.get(this.vatUrl).map(response => response.json());
  }

  getGst() {
    return this.http.get(this.gstUrl).map(response => response.json());
  }

  getSgst() {
    return this.http.get(this.sgstUrl).map(response => response.json());
  }

  getCgst() {
    return this.http.get(this.cgstUrl).map(response => response.json());
  }

  getIgst() {
    return this.http.get(this.igstUrl).map(response => response.json());
  }
  getUtgst() {
    return this.http.get(this.utgstUrl).map(response => response.json());
  }

  createStock(data: String) {
    return this.http.post(this.saveURL, data, { headers: this.headers }).map(res => res.json()).catch(this.handleError);
  }
  
  viewStock(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.viewUrl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json()).catch(this.handleError);
  }
  
  updateStock(data: String) {
    return this.http.post(this.UpURL, data, { headers: this.headers }).map(res => res.json()).catch(this.handleError);
  }
  editStock(id: any) {
    return this.http.get(this.edURL + '/' + id).map(response => response.json());
  }
  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }
  //**********************//
  editDosage(id: any) {
    return this.http.get('api/editstockdosage' + '/' + id).map(res => res.json());
  }
  editFormulation(id: any) {
    return this.http.get('api/editstockformulation' + '/' + id).map(res => res.json());
  }
  editSgst(id: any) {
    return this.http.get('api/editstocksgst' + '/' + id).map(res => res.json());
  }
  editCgst(id: any) {
    return this.http.get('api/editstockcgst' + '/' + id).map(res => res.json());
  }
  editIgst(id: any) {
    return this.http.get('api/editstockigst' + '/' + id).map(res => res.json());
  }
  editUtgst(id: any) {
    return this.http.get('api/editstockutgst' + '/' + id).map(res => res.json());
  }
  editGst(id: any) {
    return this.http.get('api/editstockgst' + '/' + id).map(res => res.json());
  }
  editVat(id: any) {
    return this.http.get('api/editstockvat' + '/' + id).map(res => res.json());
  }
  //DELETE STOCK//
  deleteStocks(id: any) {
    return this.http.get(this.delURL + '/' + id).map(res => res.json());
  }
}
