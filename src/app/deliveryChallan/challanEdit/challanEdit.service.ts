import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class challanEditService {

  private distvalURL = 'api/getpiDistvalues';
  private lisURL = 'api/getPitablevalues';
  private purTaxURL = "api/getPurchasetax";
  private deliveryChallanURL = "api/saveDeliveryChallan";
  private deliveryChallanProductURL = "api/saveDeliveryProducts";
  private getSGQtyURL = 'api/getPurquantity';
  private poURl = 'api/purchaseorderlist';
  private potableURl = 'api/purchaseordertable';
  private prolist = 'api/getPibrandlist';

  private getStockTransfer = 'api/getsuperadminproduct';
  private getShops = 'api/getEmpShops';
  private getWarehouses = 'api/getEmpWareHouses';
  private getHospitals = 'api/getEmpHospitals';


  private getusershopurl = 'api/getDeliveryShopUrl';
  private getuserwarehousesurl = 'api/getuserwarehouse';
  private getuserhospitalurl = 'api/getuserhospital';


  private getSuperStockNoURL = 'api/getsuperadminstockno';
  private getStockNoURL = 'api/getstockno';
  private getAutonIncrement = 'api/getDelveryAutoIncrements';


  private EditDeliveryProduct = 'api/getEditDeliveryProduct';

  private EditDeliveryChallan = 'api/getEditDeliveryChallan';

  

  private getshid = 'api/getEditshid';

  constructor(private http: Http) { }



  getShid(shid: any) {

    return this.http.get(this.getshid + '/' + shid).map(response => response.json());



  }


  getEditDeliveryChallan(compid: any, bid: any, locid: any, locrefid: any, id: any) {

    return this.http.get(this.EditDeliveryChallan + '/' + compid + '/' + bid + '/' + locid + '/' + locrefid + '/' + id).map(response => response.json());


  }



  getEditDeliveryProduct(compid: any, bid: any, locid: any, locrefid: any, id: any) {

    return this.http.get(this.EditDeliveryProduct + '/' + compid + '/' + bid + '/' + locid + '/' + locrefid + '/' + id).map(response => response.json());


  }




  // getLocname(getlocid: any) {

  //   return this.http.get(this.locid + '/' + getlocid).map(response => response.json());

  // }




  getShop(branchid: number) {
    //Get States 
    return this.http.get(this.getShops + '/' + branchid).map(response => response.json());
  }

  getWareHouse(branchid: number) {
    //Get States 
    return this.http.get(this.getWarehouses + '/' + branchid).map(response => response.json());
  }

  getHospital(branchid: number) {
    //Get States 
    return this.http.get(this.getHospitals + '/' + branchid).map(response => response.json());
  }



  getUserShop(compid: any, locname: any) {
    //Get States 
    return this.http.get(this.getusershopurl + '/' + compid + '/' + locname).map(response => response.json());
  }

  getUserWareHouse(compid: any, locname: any) {
    //Get States 
    return this.http.get(this.getuserwarehousesurl + '/' + compid + '/' + locname).map(response => response.json());
  }

  getUserHospital(compid: any, locname: any) {
    //Get States 
    return this.http.get(this.getuserhospitalurl + '/' + compid + '/' + locname).map(response => response.json());
  }



  getSuperStockNo(searchValue: string) {
    return this.http.get(this.getSuperStockNoURL + '/' + searchValue).map(res => res.json());
  }



  getStockNo(searchValue: string, compid: number, brnchid: number, locname: number, locrefid: number) {
    //Get Distributor
    return this.http.get(this.getStockNoURL + '/' + searchValue + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid).map(response => response.json());
  }

  getAutoIncr(compid: any, branchid: any, locname: any, locrefid: any) {
    // alert("compid"+compid+"branch"+branchid+"locname"+locname+"locrefid"+locrefid);
    //Get getAutoIncrement
    return this.http.get(this.getAutonIncrement + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
  }


  //get Distributor Details
  /* getTransfer(cid: any, bid: any, locrefid: any, locname: any) {
     return this.http.get(this.distURl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(response => response.json());
   }*/

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
  getDeliveryChallan(purcData: string) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.deliveryChallanURL, purcData, { headers: head }).map(res => res.json());
  }

  /* Create purchase Invoice  Record */
  getDeliveryChallanProduct(purctabData: string) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.deliveryChallanProductURL, purctabData, { headers: head }).map(res => res.json());
  }

  getSBQuantity(id) {
    return this.http.get(this.getSGQtyURL + '/' + id).map(res => res.json());
  }

  getPolist(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.poURl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  getStockTransferProduct(pid: number) {
    return this.http.get(this.getStockTransfer + '/' + pid).map(res => res.json());
  }

  getTaxmaster(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get('api/getTaxmaster' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  getLocalstore() {
    //Get Coutries 
    return this.http.get('api/getMain').map(response => response.json());
  }




}
