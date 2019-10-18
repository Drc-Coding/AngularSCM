import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class genjournalSaveService  {






  private URL = 'api/genjrnl/';
  
    private URLnew = 'api/payment/';
  
    constructor(private http: Http) { }
  
  
  
    saveGenJournal(myObj: string) {
  
  
      let header = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: header });
  
      return this.http
        .post(this.URL + `saveGenJournal`, myObj, options).map((res: Response) => res.json());
    }
  
  

    viewAccountsAll(serobj: string) {
      let header = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: header });
  
      return this.http.post(this.URLnew + `viewPTAccountsAll`, serobj, options)
        .map((res: Response) => res.json());
    }
  
  


}
