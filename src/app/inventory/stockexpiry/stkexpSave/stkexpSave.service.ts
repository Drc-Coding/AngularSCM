import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class stkexpSaveService {
  private getlocrefname='api/getLocreference';
  private getloctype='api/getLoctype';

  options;
  private ureURL = 'api/stockexp/';
  constructor(private http: Http) { }


  ngOnInit() {

    let header = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: header });

  }
  getLoctype(): any {
   // alert('Inside init function')
    return this.http.get(this.getloctype).map(response => response.json());
  }

  getlocrefid(locname: any): any {
    return this.http.get(this.getlocrefname + '/' + locname).map(response => response.json());
  }

  saveStockExpiry(serobj: string) {
    //let header = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: header });
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.ureURL + `saveStockExpiry`, serobj, { headers: head }).map((res: Response) => res.json());
  }

  viewMainstockExpiry(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.ureURL + `viewMainstockExpiry`, serobj, options).map((res: Response) => res.json());
  }

}
