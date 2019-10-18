import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class sdummySaveService  {




  constructor(private http: Http) {}





     options  ;

    private    URL='api/slsdum/';

    private    URLnew='api/slsinv/';
  
  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }









      saveSalesDummy(serobj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`saveSalesDummy`, serobj, options) .map((res: Response) => res.json());
      }






      saveSDProducts(serobj: string) {
        
        
            let header = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: header});
        
            return this.http
              .post(this.URL+`saveSDProduct`, serobj, options) .map((res: Response) => res.json());

              
          }



                savePresImage(serobj: FormData) {
                  let header = new Headers();
                  let options = new RequestOptions({headers: header});
             
                       return this.http.post( this.URL+`saveSDPresImage`, serobj, options) 
                       .map((res: Response) => res.text() ) ;
                  
                }



       viewCustomers(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});

          
               return this.http.post( this.URL+`viewSDCustomers`, serobj, options)
    .map((res: Response) => res.json());
       }
            

       viewDoctors(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});

          
     return this.http.post( this.URL+`viewSDDoctors`, serobj, options)
             .map((res: Response) => res.json());
       }


     viewSDProductNames(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

    
               return this.http.post( this.URL+`viewSDProductNames`, serobj, options)
    .map((res: Response) => res.json());
       }
      

      viewSDProductName(serobj: string   ) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
               return this.http.post( this.URL+`viewSDProductName`, serobj, options)
    .map((res: Response) => res.json());
      }


  
  
        viewBarCodeProd(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewSDBarCodeProd`, serobj, options)
      .map((res: Response) => res.json());
        }




      viewPriceSettings(serobj: string   ) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
               return this.http.post( this.URL+`viewSDPriceSettings`, serobj, options)
    .map((res: Response) => res.json());
      }


      viewInvoiceNoInc(serobj: string   ) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
               return this.http.post( this.URL+`viewInvoiceNoInc`, serobj, options)
    .map((res: Response) => res.text());
      }















      viewSITaxSettings(serobj: string   ) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
               return this.http.post( this.URLnew+`viewSITaxSettings`, serobj, options)
    .map((res: Response) => res.json());
      }




}
