import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class receiptSaveService  {



  private    URL='api/receipt/';

  private    URLpt='api/payment/';



  constructor(private http: Http) {}
  
  
     saveReceipt(myObj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`saveReceipt`  , myObj, options).map((res: Response) => res.json());
        }



  



  


            viewSalesInvoiceNo(serobj: string) {
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
        
            
             return this.http.post( this.URL+`viewSalesInvoiceNo`  , serobj, options)
            .map((res: Response) => res.json());
               }
              
        
               viewSalesInvoice(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewSalesInvoice`, serobj, options)
                   .map((res: Response) => res.json());
              }


              
              viewPurchaseReturnNo(serobj: string) {
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
        
            
             return this.http.post( this.URL+`viewPurchaseReturnNo`, serobj, options)
            .map((res: Response) => res.json());
               }
              
        
               viewPurchaseReturn(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewPurchaseReturn`, serobj, options)
                   .map((res: Response) => res.json());
              }



            

            viewAccounts(serobj: string) {
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
        
            
             return this.http.post( this.URL+`viewRTAccounts`, serobj, options)
            .map((res: Response) => res.json());
               }
              
        
               viewAccount(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewRTAccount`, serobj, options)
                   .map((res: Response) => res.json());
              }






      viewAccountsAll(serobj: string   ) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
  return this.http.post( this.URLpt+`viewPTAccountsAll`, serobj, options)
           .map((res: Response) => res.json());
      }









              
 



 


  

}
