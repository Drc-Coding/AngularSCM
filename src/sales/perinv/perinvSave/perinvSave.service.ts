import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class perinvSaveService  {


  constructor(private http: Http) {}
  
  
  
  
  
    options  ;
  
      private    URL='api/perinv/';
  
  
    
    ngOnInit() {
      
          let header = new Headers({'Content-Type': 'application/json'});
           this.options = new RequestOptions({headers: header});
      
        }
  
  
  
  
  
  
  
  
  
        saveSalesInvoice(serobj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`saveSalesInvoice`, serobj, options).map((res: Response) => res.json());
        }
  
  
  
  
  
  
          saveSIProducts(serobj: string) {
          
          
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
          
              return this.http
                .post(this.URL+`saveSIProduct`, serobj, options)  .map((res: Response) => res.json());
            }
  
  
  
    

  
            saveTempStock(serobj: string) {
              
              
                  let header = new Headers({'Content-Type': 'application/json'});
                  let options = new RequestOptions({headers: header});
              
             return this.http
                    .post(this.URL+`saveTempStock`, serobj, options)  .map((res: Response) => res.json());

                }
  

        


  
         viewCustomers(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
  
            
       return this.http.post( this.URL+`viewSICustomers`, serobj, options)
               .map((res: Response) => res.json());
         }
             
         
         viewDoctors(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
  
            
       return this.http.post( this.URL+`viewSIDoctors`, serobj, options)
               .map((res: Response) => res.json());
         }


  
       viewSIProductNames(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
      
   return this.http.post( this.URL+`viewSIProductNames`, serobj, options)
      .map((res: Response) => res.json());
         }
        
  
        viewSIProductName(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSIProductName`, serobj, options)
      .map((res: Response) => res.json());
        }
  
  
    
  

        viewPriceSettings(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSIPriceSettings`, serobj, options)
      .map((res: Response) => res.json());
        }
  
        
        viewDiscountSettings(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSIDiscountSettings`, serobj, options)
      .map((res: Response) => res.json());
        }
  




}
