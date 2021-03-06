import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ledgerSaveService  {


  private    URL='api/accounts/';
  

    private    URLnew='api/purcjrnl/';
  
    constructor(private http: Http) {}
    
     
  
        
 


          viewAccountsAll(serobj: string   ) {
                  let header = new Headers({'Content-Type': 'application/json'});
                  let options = new RequestOptions({headers: header});
            
                         return this.http.post( this.URL+`viewAccountsAll`, serobj, options)
              .map((res: Response) => res.json());
                }


                

                viewLedger(serobj: string   ) {
                  let header = new Headers({'Content-Type': 'application/json'});
                  let options = new RequestOptions({headers: header});
            
                         return this.http.post( this.URL+`viewGenLedger`, serobj, options)
              .map((res: Response) => res.json());
                }



}
