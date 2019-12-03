import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DamagestockService {
 

  private getinvoice = 'api/getInvoice';
  private getloctype='api/getLoctype';
  private getlocrefname='api/getLocreference';
  private lisURL = 'api/getDatablevalues';
  private getautoid='api/getdamageautoinc';
  private getPurchaseinvoice = 'api/getinvoicedetails';
  private getPiproduct = 'api/getpiproduct';
  private saveDamages = 'api/saveDamage';
  private updateDamages= 'api/updateDamage';
  private getBoxqty = 'api/getBoxqty';
  private getSGQtyURL = 'api/getqty';
  private shopdamTaxURL = "api/getshopDamagetax";
  private hospitaldamTaxURL = "api/gethospitalDamagetax";
  private warehousedamTaxURL = "api/getwarehouseDamagetax";
  private damagetableURL = "api/createDamagetable";
  private damageedittableURL="api/updateDamagetable";
  private viewDamageUrl = "api/viewDamage";
  private viewhqDamageUrl = "api/viewhqDamage";
  private getEditURL="api/editDamage";
  private getEdittableURL="api/editdamagetable";
  private deletedamageUrl = "api/deleteDamage";
  private prolist = 'api/getDabrandlist';
  private getHeadqview ='api/hqdamageview';
  private getHeadqtableview ='api/hqdamagetableview';


  private deviceurl='api/User/saveUserActivity';


  //private purchaseUrl = 'api/purchaseinvoice';

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }
  deletedamastock(id: number) {
    return this.http.get(this.deletedamageUrl + '/' + id).map(response => response.json());
  }
  viewDamage(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.viewDamageUrl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(response => response.json());
  }

  viewhqDamage(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.viewhqDamageUrl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(response => response.json());
  }



  getInvoice(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.getinvoice + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(response => response.json());
  }

  getLoctype(): any {
    return this.http.get(this.getloctype).map(response => response.json());
  }

  getlocrefid(locname: any): any {
    return this.http.get(this.getlocrefname + '/' + locname).map(response => response.json());
  }

  getDamageautono(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.getautoid + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(response => response.json());
  }

  getBrandlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.lisURL + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  getProductlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.prolist + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }


  getpurchaseinvoice(cid: any, bid: any, locrefid: any, locname: any,invoiceid: number) {
   
    return this.http.get(this.getPurchaseinvoice+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + invoiceid).map(response => response.json());
  }

  getpiproduct(cid: any, bid: any, locrefid: any, locname: any,invoicepro: number) {
   
    return this.http.get(this.getPiproduct+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + invoicepro).map(response => response.json());
  }


  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  saveDamage(data: String) {

    let header = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.saveDamages, data, { headers: header }).map((res: Response) => {
      return { "res": res.json() };
    });
  }

  saveProducts(data: String): any {
   
    let head = new Headers({ 'Content-Type': 'application/json' });
     return this.http.post(this.damagetableURL, data, { headers: head }).map((res: Response) => { 
      return { "res": res.json() };
     });
  }

  updateProducts(data: string): any {
    let header = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.updateDamages, data, { headers: header }).map((res: Response) => {
      return { "res": res.json() };
    });
  }

  updatetableProducts(data: String): any {
    let head = new Headers({ 'Content-Type': 'application/json' });
    this.http.post(this.damageedittableURL, data, { headers: head }).map(response => { response.json() })
      .subscribe(
        () => { console.log(data) }
      );
  }

  getboxqty(value: any): any {
    
    return this.http.get(this.getBoxqty + '/' + value).map(response => response.json());
  }

  getSBQuantity(id: any) {
    return this.http.get(this.getSGQtyURL + '/' + id).map(response => response.json());
  }
  getshopDamagetax(cid: any, bid: any, shopid: any) {
    return this.http.get(this.shopdamTaxURL + '/' + cid + '/' + bid + '/' + shopid).map(res => res.json());
  }
  getshopTaxmaster(cid: any, bid: any, shopid: any) {
    return this.http.get('api/getshopTaxmaster' + '/' + cid + '/' + bid + '/' + '/' + shopid).map(res => res.json());
  }
  gethospitalDamagetax(cid: any, bid: any, hospitalid: any) {
    return this.http.get(this.hospitaldamTaxURL + '/' + cid + '/' + bid + '/' + hospitalid).map(res => res.json());
  }
  gethospitalTaxmaster(cid: any, bid: any, hospitalid: any) {
    return this.http.get('api/gethospitalTaxmaster' + '/' + cid + '/' + bid + '/' + '/' + hospitalid).map(res => res.json());
  }
  getwarehouseDamagetax(cid: any, bid: any, warehouseid: any) {
    return this.http.get(this.warehousedamTaxURL + '/' + cid + '/' + bid + '/' + warehouseid).map(res => res.json());
  }
  getwarehouseTaxmaster(cid: any, bid: any, warehouseid: any) {
    return this.http.get('api/getwarehouseTaxmaster' + '/' + cid + '/' + bid + '/' + '/' + warehouseid).map(res => res.json());
  }

  getEditdamage(cid: any, bid: any, locrefid: any, locname: any,id: number) {
    return this.http.get(this.getEditURL+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + id).map(resp => resp.json());
  }

  getEditdamagetable(cid: any, bid: any, locrefid: any, locname: any,id: number) {
    return this.http.get(this.getEdittableURL+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + id).map(resp => resp.json());
  } 
  getviewdamage(cid: any, bid: any, locrefid: any, locname: any,id: number): any {
    return this.http.get(this.getHeadqview+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + id).map(resp => resp.json());
  }
  getviewdamagetable(cid: any, bid: any, locrefid: any, locname: any,id: number): any {
    return this.http.get(this.getHeadqtableview+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + id).map(resp => resp.json());
  }


  
  devicedetails(data){

    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

    return this.http.post( this.deviceurl, data, options)
    .map((res: Response) => res.json());

  }

}