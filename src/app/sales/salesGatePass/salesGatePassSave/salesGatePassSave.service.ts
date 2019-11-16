import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class salesGatePassSaveService {

  private distvalURL = 'api/getpiDistvalues';
  private lisURL = 'api/getPitablevalues';
  private purTaxURL = "api/getPurchasetax";
  private gatePassSaveURL = "api/savegatepass";
  private gatePassSaveProductURL = "api/savegatepassproduct";

  private getSGQtyURL = 'api/getproductquantity';
  
  private poURl = 'api/purchaseorderlist';
  private potableURl = 'api/purchaseordertable';
  private prolist = 'api/getPibrandlist';
  private getSalesProduct = 'api/getGatePassProduct';
  private getShops = 'api/getEmpShops';
  private getWarehouses = 'api/getEmpWareHouses';
  private getHospitals = 'api/getEmpHospitals';
  private getusershopurl = 'api/getDeliveryShopUrl';
  private getuserwarehousesurl = 'api/getuserwarehouse';
  private getuserhospitalurl = 'api/getuserhospital';
  private getSuperStockNoURL = 'api/getgatepassadminstockno';
  private getStockNoURL = 'api/getstockno';
  private getAutonIncrement = 'api/getGatePassAutoIncrements';
  private deviceurl='api/User/saveUserActivity';


  constructor(private http: Http) { }


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



  getDeliverChallan(searchValue: string, compid: number, brnchid: number, locname: number, locrefid: number, billtyperefid: number) {
    //Get Distributor
    return this.http.get(`api/getGatePassNo` + '/' + searchValue + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid + '/' + billtyperefid).map(response => response.json());
  }




  getAutoIncr(compid: any, branchid: any, locname: any, locrefid: any) {
   
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
    return this.http.post(this.gatePassSaveURL, purcData, { headers: head }).map(res => res.json());

  }

  /* Create purchase Invoice  Record */
  getDeliveryChallanProduct(purctabData: string) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.gatePassSaveProductURL, purctabData, { headers: head }).map(res => res.json());
  }

  getSBQuantity(id) {
    return this.http.get(this.getSGQtyURL + '/' + id).map(res => res.json());
  }

  getPolist(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.poURl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }





  getDeliverChallanNo(pid: number, cid: any, bid: any, locnm : any, locid: any) {
    return this.http.get(this.getSalesProduct + '/' + pid +'/'+ cid+'/'+ bid+ '/'+ locnm+'/'+ locid).map(res => res.json());
  }


  getTaxmaster(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get('api/getTaxmaster' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  getLocalstore() {
    //Get Coutries 
    return this.http.get('api/getMain').map(response => response.json());
  }


  adddevicedetails(data){
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

    return this.http
      .post(this.deviceurl, data, options)  .map((res: Response) => res.json());
  }


}