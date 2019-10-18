import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class editPaymentService {





  private    URL='api/payment/';

  private    URLnew='http://localhost:4200/api/';


  constructor(private http: Http) {}
  
  
  
  
  
  
        savePayment(myObj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post( this.URL+`updatePayment`   , myObj, options).map((res: Response) => res.json());
      }




             viewPaymentNo(serobj: string) {
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
        
            
             return this.http.post( this.URL+`viewPaymentNo`  , serobj, options)
            .map((res: Response) => res.json());
               }
              
        
               viewPayment(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewPayment`, serobj, options)
                   .map((res: Response) => res.json());
              }

       

                
              viewPaymentAll(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
           return this.http.post( this.URL+`viewPaymentAll`, serobj, options)
      .map((res: Response) => res.json());
    }
  

    


            deletePayment(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`deletePayment`, serobj, options)
                   .map((res: Response) => res.json());
              }

              
}
