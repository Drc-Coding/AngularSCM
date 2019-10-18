import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class prescEditService  {


  constructor(private http: Http) {}
  
  
  
  
  
    options  ;
  
      private    URL='http://localhost:4200/api/presc/';
  
  
    
    ngOnInit() {
      
          let header = new Headers({'Content-Type': 'application/json'});
           this.options = new RequestOptions({headers: header});
      
        }
  
  
  
  
  
  
  
  
  
        savePrescription(serobj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`savePrescription`, serobj, options).map((res: Response) => res.json());
        }
  
  
  
  
  
  
        savePrescProd(serobj: string) {
          
          
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
          
              return this.http
                .post(this.URL+`savePrescProd`, serobj, options)  .map((res: Response) => res.json());
            }
  
  
  

  
         viewCustomers(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
  
            
       return this.http.post( this.URL+`viewPRCCustomers`, serobj, options)
               .map((res: Response) => res.json());
         }
             
         
         viewDoctors(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
  
            
       return this.http.post( this.URL+`viewPRCDoctors`, serobj, options)
               .map((res: Response) => res.json());
         }


  
         viewPRCProductNames(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
      
   return this.http.post( this.URL+`viewPRCProductNames`, serobj, options)
      .map((res: Response) => res.json());
         }
        
  
         viewPRCProductName(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewPRCProductName`, serobj, options)
      .map((res: Response) => res.json());
        }
  
  


        viewPresc(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewPresc`, serobj, options)
      .map((res: Response) => res.json());
        }


        viewPrescProducts(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`viewPrescProducts`, serobj, options)
      .map((res: Response) => res.json());
        }



        checkInteration(serobj: string   ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
                 return this.http.post( this.URL+`checkInteration`, serobj, options)
      .map((res: Response) => res.json());
        }


}
