import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class receiptEditService  {



  private    URL='api/receipt/';

  private    URLnew='api/';



  constructor(private http: Http) {}
  
  
  
  
  
  
       saveReceipt(myObj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`updateReceipt`   , myObj, options).map((res: Response) => res.json());
      }



      


             viewReceiptNo(serobj: string) {
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
        
            
             return this.http.post( this.URL+`viewReceiptNo`  , serobj, options)
            .map((res: Response) => res.json());
               }
              
        
               viewReceipt(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewReceipt`, serobj, options)
                   .map((res: Response) => res.json());
              }

       


              viewReceiptAll(serobj: string) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
            
                     return this.http.post( this.URL+`viewReceiptAll`, serobj, options)
                .map((res: Response) => res.json());
              }
            

              
              

               deleteReceipt(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`deleteReceipt`, serobj, options)
                   .map((res: Response) => res.json());
              }


}
