import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stkretViewService  {

  constructor(private http: Http) {}
  
    options  ;
  
      private    URL='api/stkretn/';
  
  
    
    ngOnInit() {
      
          let header = new Headers({'Content-Type': 'application/json'});
           this.options = new RequestOptions({headers: header});
           
      
        }
  
  
    viewAll(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'} );
      let options = new RequestOptions({headers: header});
  
           return this.http.post( this.URL+`viewStkReturnAll`, serobj, options)
      .map((res: Response) => res.json());
    }
  
    save(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'   });
      let options = new RequestOptions({headers: header});
  
           return this.http.post(`https://pguat.paytm.com/oltp-web/processTransaction`, serobj, options)
      .map((res: Response) => res.json());
    }
  


}
