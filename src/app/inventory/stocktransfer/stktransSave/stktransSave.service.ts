import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class stktransSaveService {
  options;
  private URL = 'api/stocktrans/';
  private URLnew = 'api/indreq/';
  private URLIndAppr = 'api/indappr/';
  constructor(private http: Http) { }
  ngOnInit() {
    let header = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: header });
  }
  saveStockTransfer(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http
      .post(this.URL + `saveStockTransfer`, serobj, options).map((res: Response) => res.json());
  }
  saveStkTrnfrProducts(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http
      .post(this.URL + `saveStkTrnfrProducts`, serobj, options).map((res: Response) => res.json());
  }
  viewSTIndentRequests(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewSTIndentRequests`, serobj, options)
      .map((res: Response) => res.json());
  }
  viewIndentProduct(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewSTIndentProduct`, serobj, options)
      .map((res: Response) => res.json());
  }
  viewwarehousestock(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewSTIndMainstock`, serobj, options)
      .map((res: Response) => res.json());
  }
  viewSTWareHouseStocks(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewSTMainstocks`, serobj, options)
      .map((res: Response) => res.json());
  }
  viewSTWareHouseStock(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewSTMainstock`, serobj, options)
      .map((res: Response) => res.json());
  }
  viewLocName(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URLIndAppr + `viewLocName`, serobj, options)
      .map((res: Response) => res.json());
  }
}
