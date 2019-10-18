import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class ViewWantedBookService {


  private URL = 'api/stkmin/';
  private URL1 = 'api/slsinv/';

  constructor(private http: Http) { }





  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }



  viewMinWantedStockRecord(serobj: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewStk1MinQtyAll`, serobj, options).map((res: Response) => res.json()).catch(this.handleError);
  }


  
  viewNewWantedStockRecord(serobj: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL1 + `viewStk1NewQtyAll`, serobj, options).map((res: Response) => res.json()).catch(this.handleError);
  }

}