import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class saveBulkRtService  {



  private    URL='api/receipt/';

  private    URLnew='api/';



  constructor(private http: Http) {}
  
  
  
  
  
  
       saveBulkReceipt(myObj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`saveBulkReceipt`   , myObj, options).map((res: Response) => res.json());
      }





       

           viewCustomers(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewCustomers`, serobj, options)
                   .map((res: Response) => res.json());
              }





              
        
       viewCustOutstanding(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewCustOutstanding`, serobj, options)
                   .map((res: Response) => res.json());
              }


  

}
