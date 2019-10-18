import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class editPRService  {





  constructor(private http: Http) {}
  
  

  options  ;
  
    private    URL='api/pr/';


  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }
  
  

  
    savePurchReturn(serobj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`savePurchReturn`, serobj, options)     .map((res: Response) => res.json());
        }
  
        savePrProducts(serobj: string) {
          
          
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
          
              return this.http
                .post(this.URL+`updatePrProducts`, serobj, options)  .map((res: Response) => res.json());
            }
  
  


            
  
    viewMedcInvoices(serobj: string) {
               
          
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
   
                 
               return this.http.post( this.URL+`viewPurcInvoicesNo`, serobj, options)
    .map((res: Response) => res.json());
    }
  

    viewPiProduct(serobj: string) {
         
          
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

                 
               return this.http.post( this.URL+`viewPiProduct`, serobj, options)
    .map((res: Response) => res.json());
    }


    viewPurchReturnAll(serobj: string) {
       
         
          
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

                 
               return this.http.post( this.URL+`viewPurchReturnNo`, serobj, options)
    .map((res: Response) => res.json());
    }
 
  
    viewPurchaseReturn(serobj: string) {
                
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

                 
               return this.http.post( this.URL+`viewPurchaseReturn`, serobj, options)
    .map((res: Response) => res.json());
    }
  





    

    viewPrProduct(serobj: string) {
          
          
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

                 
               return this.http.post( this.URL+`viewPrProduct`, serobj, options)
    .map((res: Response) => res.json());

    }
  
  
    deletePurchReturn(serobj: string) {
          
          
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

                 
               return this.http.post( this.URL+`deletePurchReturn`, serobj, options)
    .map((res: Response) => res.json());

    }
  



}
