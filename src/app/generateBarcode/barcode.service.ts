import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
@Injectable()
export class BarcodeService {
  // URL to web API
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private saveUrl = 'api/savebarcode';
  private isExist = 'api/productexist';
  private genBarcodeUrl = 'api/GenBarcode';
  private mbarcode = 'api/mfbarcode'
  constructor(private http: Http) { }
  getSuperProduct(searchValue:any){
    return this.http.get('api/loadsuperproduct'+'/'+searchValue).map(response => response.json());
  }
  getproduct(searchValue: any,compid: any, branchid: any, locname: any, locrefid){
    return this.http.get('api/loadproduct'+'/'+searchValue+'/'+ compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
     
  }
 
  superViewProduct(): Promise<any> {
    return this.http.get('api/superviewbarcodeproduct')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
  
  viewProduct(compid: any, branchid: any, locname: any, locrefid): Promise<any> {
    return this.http.get('api/viewbarcodeproduct'+'/' + compid + '/' + branchid + '/' + locname + '/' + locrefid)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
  createBarcode(barcode: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.saveUrl, barcode, { headers: head }).map(res => res.json());
  }
  //  Raja 10/06/19
  genBarcode(barcode1: String){
  
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.genBarcodeUrl, barcode1, { headers: head })
    .map(res => res.json());


  }
  // getMbarcode(Mbarcode:any,companyid:any,branchrefid:any,locname:any,locrefid:any){
  //   return this.http.get(this.mbarcode +'/'+ Mbarcode + '/' + companyid + '/' + branchrefid + '/' + locname + '/' + locrefid).map(response => response.json());
  // }
  
  
  
  isExistProduct(cid: number, pname: String) {
    return this.http.get(this.isExist + '/' + cid + '/' + pname).map(response => response.json());
  }
  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
