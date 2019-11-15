import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class slsRetEditService  {






  constructor(private http: Http) {}
  
  

  options  ;
  
    private    URL='api/slsretn/';
    private deviceURL='api/User/saveUserActivity';


  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }
  
  

  
      saveSalesReturn(serobj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`updateSalesReturn`, serobj, options )   .map((res: Response) => res.json());
        }
  
        saveSrProducts(serobj: string) {
          
          
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
          
              return this.http
                .post(this.URL+`updateSrProducts`, serobj, options)  .map((res: Response) => res.json());
            }
  
  


    viewSalesReturnNo(serobj: string) {
       
         
          
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

                 
               return this.http.post( this.URL+`viewSalesReturnNo`, serobj, options)
    .map((res: Response) => res.json());
    }
 
  
    viewSalesReturn(serobj: string) {
                
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

                 
               return this.http.post( this.URL+`viewSalesReturn`, serobj, options)
    .map((res: Response) => res.json());
    }
  

    viewSrProduct(serobj: string) {
          
          
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

                 
               return this.http.post( this.URL+`viewSrProduct`, serobj, options)
    .map((res: Response) => res.json());

    }
  
  
    viewSrProductRemain(serobj: string) {
      
       
   let header = new Headers({'Content-Type': 'application/json'});
   let options = new RequestOptions({headers: header});

    return this.http.post( this.URL+`viewSrProductRemain`, serobj, options)
                .map((res: Response) => res.json());
 }



 viewSalesReturnAll(serobj: string ) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

           
         return this.http.post( this.URL+`viewSalesReturnAll`, serobj, options)
.map((res: Response) => res.json());
}




    deleteSalesRetn(serobj: string) {
      
       
   let header = new Headers({'Content-Type': 'application/json'});
   let options = new RequestOptions({headers: header});

    return this.http.post( this.URL+`deleteSalesRetn`, serobj, options)
                .map((res: Response) => res.json());
 }


 
 editdevicedetails(data) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

   return this.http.post( this.deviceURL, data, options)
    .map((res: Response) => res.json());
}


deletedevicedetails(data) {
  
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

   return this.http.post( this.deviceURL, data, options)
    .map((res: Response) => res.json());
}

}
