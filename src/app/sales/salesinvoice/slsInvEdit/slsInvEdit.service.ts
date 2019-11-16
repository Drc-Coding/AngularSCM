import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class slsInvEditService  {




  constructor(private http: Http) {}
  
  
  
  
  
  
    options  ;
    
      private    URL='api/slsinv/';
      private deviceurl='api/User/saveUserActivity';

  
    ngOnInit() {
      
          let header = new Headers({'Content-Type': 'application/json'});
           this.options = new RequestOptions({headers: header});
      
        }
  
  
  
  
        saveSalesInvoice(serobj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`updateSalesInvoice`, serobj, options).map((res: Response) => res.json());
            
        }
  
  
  
        saveSIProducts(serobj: string) {
          
          
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
          
              return this.http
                .post(this.URL+`updateSIProduct`, serobj, options).map((res: Response) => res.json());
            }
  
  
  
  
  
  
    viewSalesInvoices(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
        
                 return this.http.post( this.URL+`viewSalesInvoices`, serobj, options)
      .map((res: Response) => res.json());
    }
  
  
    viewSISalesInvoice(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
        
                 return this.http.post( this.URL+`viewSISalesInvoice`, serobj, options)
      .map((res: Response) => res.json());
    }
  
    viewSIProducts(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
        
                 return this.http.post( this.URL+`viewSIProducts`, serobj, options)
      .map((res: Response) => res.json());
    }
  
    viewCustomers(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
                 return this.http.post( this.URL+`viewCustomers`, serobj, options)
      .map((res: Response) => res.json());
       }
      
  
    viewSIProductNames(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
    
                 return this.http.post( this.URL+`viewSIProductNames`, serobj, options)
      .map((res: Response) => res.json());
       }
      
  
      viewSIProductName(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
      
                
                 return this.http.post( this.URL+`viewSIProductName`, serobj, options)
      .map((res: Response) => res.json());
      }
  

  
        viewBarCodeProd(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSIBarCodeProd`, serobj, options)
      .map((res: Response) => res.json());
        }



        viewSalesInvoiceAll(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let  options = new RequestOptions({headers: header});
    
            
                   return this.http.post( this.URL+`viewSalesInvoiceAll`, serobj, options)
        .map((res: Response) => res.json());
        }
      

        

        viewSITaxSettings(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSITaxSettings`, serobj, options)
      .map((res: Response) => res.json());
        }



        
        

  
      deleteSalesInvoice(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
      
                
                 return this.http.post( this.URL+`deleteSalesInvoice`, serobj, options)
      .map((res: Response) => res.json());
      }


      editdevicedetails(data){

        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.deviceurl, data, options)  .map((res: Response) => res.json());
      }
      


}
