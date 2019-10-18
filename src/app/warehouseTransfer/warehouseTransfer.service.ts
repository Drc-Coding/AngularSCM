
import { AddwarehProduct } from './addwarehProduct';
import { AddwarehTransfer } from './addwarehTransfer';
import { Injectable} from '@angular/core';
import {Headers, Http } from '@angular/http';
@Injectable()
export class DatawarehTransfer {
deletetransUrl = 'deletetrans';
 batchstockUrl = 'batchstockid';
 // productUrl = 'postwhouseproducts';
  private headers = new Headers({'Content-Type': 'application/json'});
   constructor(private http: Http) {}
// create
   create(warehousetrans: AddwarehTransfer): Promise<AddwarehTransfer> {
    return this.http
      .post('posttransfer', JSON.stringify(warehousetrans), {headers : this.headers})
      .toPromise()
      .then(res => res.json() as AddwarehTransfer)
      .catch(this.handleError);
  }
// create products  angular
 createpro(warehouseproduct: AddwarehProduct): Promise<AddwarehProduct> {
    return this.http
      .post('postwhouseproducts', JSON.stringify(warehouseproduct), {headers : this.headers})
      .toPromise()
      .then(res => res.json() as AddwarehProduct)
        .catch(this.handleError);
  }

  

  //createpro(productlist: String) {
 //   const url = `${this.productUrl}/${productlist}`;
// return this.http.get(url).map(response => response.json());
 //   }

// from warehouse list
 getwarehouselists(): Promise<any> {
    return this.http.get('/warehouseinfos')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
// to stock lists
getstorelists(): Promise<any> {
    return this.http.get('/shopinfos')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
// to company
getcompanylists(): Promise<any> {
    return this.http.get('/companyinfos')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
// to hospital
gethospitallist(): Promise<any> {
    return this.http.get('/hospitalinfos')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
// get product view
getviewproduct(): Promise<any> {
    return this.http.get('/productmaster')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
// stock list
getwarehousestocks(): Promise<any> {
    return this.http.get('/showstocks')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
// stock batch
 getbatchstockid(batchstock: number) {
   const url = `${this.batchstockUrl}/${batchstock}`;
     return this.http.get(url).map(response => response.json());
   }

// gettransrefid
gettransrefid(): Promise<any> {
    return this.http.get('/refertransid')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
// delete stock
   delete(id: number): Promise<void> {
    const url = `${this.deletetransUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


   private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
