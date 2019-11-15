import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class slsRetSaveService  {


  constructor(private http: Http) {}
  
    options  ;
      private    URL='api/slsretn/';
      private deviceurl='api/User/saveUserActivity';



    ngOnInit() {
      
          let header = new Headers({'Content-Type': 'application/json'});
           this.options = new RequestOptions({headers: header});
      
        }
  
  
        saveSalesReturn(serobj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`saveSalesReturn`, serobj, options).map((res: Response) => res.json());
        }
  
        saveSrProducts(serobj: string) {
          
          
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
          
              return this.http
                .post(this.URL+`saveSrProducts`, serobj, options)  .map((res: Response) => res.json());
            }
  
  

     saveCreditNote(serobj: string) {
          
          
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
          
              return this.http
                .post(this.URL+`saveCreditNote`, serobj, options)  .map((res: Response) => res.json());
            }

  
    viewSalesInvoiceNo(serobj: string) {
            
          
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
                 
                 return this.http.post( this.URL+`viewSalesInvoiceNo`, serobj, options)
      .map((res: Response) => res.json());
    }
  
    viewSalesInvoice(serobj: string) {
        
          
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
                 
                 return this.http.post( this.URL+`viewSalesInvoice`, serobj, options)
      .map((res: Response) => res.json());
    }
  
  
    viewSIProduct(serobj: string) {
        
          
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
                 
                 return this.http.post( this.URL+`viewSIProduct`, serobj, options)
      .map((res: Response) => res.json());
    }
  
  
    adddevicedetails(data) {
          
          
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
      return this.http
        .post(this.deviceurl, data, options)  .map((res: Response) => res.json());
    }



}
