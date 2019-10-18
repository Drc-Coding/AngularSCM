import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class saveDistProdService {



  options  ;
    private    URL='api/distprod/';


  constructor(private http: Http) {}
  
   

  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }
  

  
    saveDistProd(serobj: string ) {
     
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`saveDistProd`, serobj, options) .map((res: Response) => res.json());
        }
  
  

  
    viewProdDistributors(serobj: string ) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

                     return this.http.post( this.URL+`viewProdDistributors`, serobj, options)
    .map((res: Response) => res.json());
    }
  


      

    viewDPCustProducts(serobj: string ) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewDPCustProducts`, serobj, options)
    .map((res: Response) => res.json());
    }



    viewDPCustProduct(serobj: string ) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewDPCustProduct`, serobj, options)
    .map((res: Response) => res.json());
    }













































   viewDPPhCompanies(serobj: string ) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewDPPhCompanies`, serobj, options)
    .map((res: Response) => res.json());
    }



    viewProductPhComp(serobj: string ) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewProductPhComp`, serobj, options)
    .map((res: Response) => res.json());
    }


      

}
