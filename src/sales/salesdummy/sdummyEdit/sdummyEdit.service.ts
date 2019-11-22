import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class sdummyEditService  {


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
          .post(this.URL+`updateSalesDummy`, serobj, options)  .map((res: Response) => res.json());
          
      }



      saveSDProduct(serobj: string) {
        
        
            let header = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: header});
        
            return this.http
              .post(this.URL+`updateSDProduct`, serobj, options) .map((res: Response) => res.json());


          }






  viewSalesDummys(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

      
  return this.http.post( this.URL+`viewSalesDummys`, serobj, options)
    .map((res: Response) => res.json());
  }


  viewSalesDummy(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

      
               return this.http.post( this.URL+`viewSalesDummy`, serobj, options)
    .map((res: Response) => res.json());
  }

  viewSDProducts(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

      
               return this.http.post( this.URL+`viewSDProducts`, serobj, options)
    .map((res: Response) => res.json());
  }

  viewCustomers(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

               return this.http.post( this.URL+`viewCustomers`, serobj, options)
    .map((res: Response) => res.json());
     }
    

  viewSDProductNames(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

  
               return this.http.post( this.URL+`viewSDProductNames`, serobj, options)
    .map((res: Response) => res.json());
     }
    

    viewSDProductName(serobj: string) {
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




        viewSalesDummyAll(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let  options = new RequestOptions({headers: header});
    
            
                   return this.http.post( this.URL+`viewSalesDummyAll`, serobj, options)
        .map((res: Response) => res.json());
        }
      

        
        

  deleteSalesDummy(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
    
              
               return this.http.post( this.URL+`deleteSalesDummy`, serobj, options)
    .map((res: Response) => res.json());
    }












    viewSITaxSettings(serobj: string   ) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

             return this.http.post( this.URLnew+`viewSITaxSettings`, serobj, options)
  .map((res: Response) => res.json());
    }



}
