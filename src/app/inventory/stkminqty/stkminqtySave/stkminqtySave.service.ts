import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stkminqtySaveService {


  constructor(private http: Http) { }

  options;

  private URL = 'api/stkmin/';
  private URL1 = 'api/slsinv/';
  private deviceurl='api/User/saveUserActivity';


  ngOnInit() {

    let header = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: header });


  }


  saveStkMinQty(serobj: string) {


    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http
      .post(this.URL + `saveStkMinQty`, serobj, options).map((res: Response) => res.json());
  }



  oneProduct(serobj: string) {


    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http
      .post(this.URL1 + `oneProduct`, serobj, options).map((res: Response) => res.json());
  }





  saveStkMinQty1(serobj: string) {


    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http
      .post(this.URL1 + `savenewprodminqty`, serobj, options).map((res: Response) => res.json());
  }


  saveNewprod(serobj: string) {


    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http
      .post(this.URL1 + `savenewprod`, serobj, options).map((res: Response) => res.json());
  }



  viewMinimumStock(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `viewMinimumStock`, serobj, options)
      .map((res: Response) => res.json());
  }



  viewMinimumProdNew(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `viewMinimumProdNew`, serobj, options)
      .map((res: Response) => res.json());
  }



  viewAll(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `viewStockExpAll`, serobj, options)
      .map((res: Response) => res.json());
  }

adddevicedetails(data){

  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

  return this.http
    .post(this.deviceurl, data, options)  .map((res: Response) => res.json());

}



}
