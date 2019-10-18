import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class savePaymentService {

  private URL = 'api/payment/';

  private URLnew = 'api/payment';

  constructor(private http: Http) { }


  savePayment(myObj: string) {


    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http
      .post(this.URL + `savePayment`, myObj, options).map((res: Response) => res.json());
  }



  viewPurchaseInvoiceNo(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });


    return this.http.post(this.URL + `viewPurchaseInvoiceNo`, serobj, options)
      .map((res: Response) => res.json());
  }


  viewPurchaseInvoice(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `viewPurchaseInvoice`, serobj, options)
      .map((res: Response) => res.json());
  }




  viewSalesReturnNo(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });


    return this.http.post(this.URL + `viewSalesReturnNo`, serobj, options)
      .map((res: Response) => res.json());
  }


  viewSalesReturn(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `viewSalesReturn`, serobj, options)
      .map((res: Response) => res.json());
  }




  viewAccounts(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });


    return this.http.post(this.URL + `viewPTAccounts`, serobj, options)
      .map((res: Response) => res.json());
  }


  viewAccount(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `viewPTAccount`, serobj, options)
      .map((res: Response) => res.json());
  }



  viewAccountsAll(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `viewPTAccountsAll`, serobj, options)
      .map((res: Response) => res.json());
  }

























}
