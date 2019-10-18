import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class saveBulkPtService  {





  private    URL='api/payment/';

  private    URLnew='api/';


  constructor(private http: Http) {}
  
  
  
  
  
  
        saveBulkPayment(myObj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post( this.URL+`saveBulkPayment`   , myObj, options).map((res: Response) => res.json());
      }


      viewDistributors(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewDistributors`, serobj, options)
                   .map((res: Response) => res.json());
                   
           }

       

           viewDistOutstanding(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewDistOutstanding`, serobj, options)
                   .map((res: Response) => res.json());
              }




}
