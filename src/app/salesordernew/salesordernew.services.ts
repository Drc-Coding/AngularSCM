import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class salesOrderServicenew {


  
  private    URL='api/indreq/';
  private deviceurl='api/User/saveUserActivity';

  
  constructor(private http: Http) { }
  head = new Headers({ 'Content-Type': 'application/json' });

  autoIcrement(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get('api/salesOrderIncrement' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }
  
  searchProduct(value: any, cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get('api/searchSalesorderproduct' + '/' + value + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json()).catch(this.handleError);
  }
  patientList(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get('api/salesorderCustomerlist' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json()).catch(this.handleError);
  }
  getsalesProdcut(productID: any) {
    return this.http.get('api/getsalesProduct' + '/' + productID).map(res => res.json()).catch(this.handleError);
  }
  createSalesorder(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('api/saveSalesorder', data, { headers: head }).map(response => response.json());
  }
  createSaleRecord(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('api/saveSalesorderRecord', data, { headers: head }).map(response => response.json());
  }



  viewSalesorder(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get('api/getallSalesorderview' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json()).catch(this.handleError);
  }
  viewSalesorderRecord(id: any) {
    return this.http.get('api/getsalesorderview' + '/' + id).map(res => res.json()).catch(this.handleError);
  }

  /** EDIT SALES ORDER **/

  editSalesdata(id: any) {
    return this.http.get('api/editSalesorderdata' + '/' + id).map(res => res.json());
  }

  
  cancelSalesdata(id: any) {
    return this.http.get('api/deletesalesOrder' + '/' + id).map(res => res.json());
  }


  editSalesOrderRecord(id: any) {
    return this.http.get('api/editSalesorderRecord' + '/' + id).map(res => res.json());
  }

  updateSalesorder(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('api/updateSalesorder', data, { headers: head }).map(response => response.json());
  }
  updateSaleRecord(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('api/updateSalesorderRecord', data, { headers: head }).map(response => response.json());
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }



  getsotype(){
      
    return this.http.get('api/salesOrderType').map(response => response.json());
  }

  
  
  viewWareHouse(  serobj: string ) {
      
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});


           return this.http.post( this.URL+`viewWareHouse`, serobj, options)
.map((res: Response) => res.json());
}



viewshopinformation(serobj: string   ) {

     
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});


    
           return this.http.post( this.URL+`viewshopinformation`, serobj, options)
.map((res: Response) => res.json());
}

viewHospital(serobj: string ) {

    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
    
    return this.http.post( this.URL+`viewHospital`, serobj, options)
.map((res: Response) => res.json());
}


adddevicedetails(data){

  let head = new Headers({ 'Content-Type': 'application/json' });
  return this.http.post(this.deviceurl, data, { headers: head }).map(response => response.json());

}
 
editdevicedetails(data){

  let head = new Headers({ 'Content-Type': 'application/json' });
  return this.http.post(this.deviceurl, data, { headers: head }).map(response => response.json());

}

viewdevicedetails(data){

  let head = new Headers({ 'Content-Type': 'application/json' });
  return this.http.post(this.deviceurl, data, { headers: head }).map(response => response.json());

}

  
}
