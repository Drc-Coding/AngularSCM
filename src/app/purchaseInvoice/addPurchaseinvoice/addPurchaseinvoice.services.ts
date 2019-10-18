import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class addinvoiceService {

  private distURl = 'api/getpiDistibutor';
  private distvalURL = 'api/getpiDistvalues';
  private lisURL = 'api/getPitablevalues';
  private purTaxURL = "api/getPurchasetax";
  private purcMaintanURL = "api/createPurcrecord";
  private purctableURL = "api/createPurctablerecord";
  private getSGQtyURL = 'api/getPurquantity';
  private poURl = 'api/purchaseorderlist';
  private potableURl = 'api/purchaseordertable';
  private prolist = 'api/getPibrandlist';
  private podist = 'api/getPOdist';
  constructor(private http: Http) { }

  //get Distributor Details
  getDistributor(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.distURl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(response => response.json());
  }

  getDistvalues(distid: number) {
    return this.http.get(this.distvalURL + '/' + distid).map(res => res.json());
  }

  getBrandlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.lisURL + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }
  /*Get Tax inclusive Or Exclusive*/
  getPurchasetax(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.purTaxURL + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  getProductlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.prolist + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }
  /* Create purchase Maintanance  Record */
  getPurcmaintanance(purcData: string) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.purcMaintanURL, purcData, { headers: head }).map((res: Response) => {
      return { "res": res.json() };
    })
      .catch((e: any) => {
        console.log("Status" + e.status);
        return Observable.throw({ "Errors getPurcmaintanance(Service)": e.json() });
      });
  }

  /* Create purchase Invoice  Record */
  getPurcinvoice(purctabData: string) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    this.http.post(this.purctableURL, purctabData, { headers: head }).map(response => { response.json() })
      .subscribe(
        () => { console.log(purctabData) }
      );
  }

  getSBQuantity(id) {
    return this.http.get(this.getSGQtyURL + '/' + id).map(res => res.json());
  }

  getPolist(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.poURl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  getPotablelist(pid: number) {
    return this.http.get(this.potableURl + '/' + pid).map(res => res.json());
  }

  getTaxmaster(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get('api/getTaxmaster' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  getLocalstore() {
    //Get Coutries 
    return this.http.get('api/getMain').map(response => response.json());
  }

  /*   Purchase invoice Autoincrement  */
  autoIcrement(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get('api/purchaseIncrement' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  getposistributor(pid: number) {
    return this.http.get(this.podist + '/' + pid).map(res => res.json());
  }

}