import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class prcenquirySaveService  {


  options  ;

    private    URL='api/prcenq/';


  constructor(private http: Http) {}
  
  
      
    

  ngOnInit() {
    
        let header = new Headers({'Content-Type': ' text/html'});
         this.options = new RequestOptions({headers: header});
    
      }





        
  
  savePriceEnqiry(serobj: string) {
          
          
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
          
              return this.http
                .post(this.URL+`savePriceEnquiry`, serobj, options)    .map((res: Response) => res.json());
            }
  
  
  
  


     viewPurchSession(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

               return this.http.post( this.URL+`viewPRCPurchSession`, serobj, options)
    .map((res: Response) => res.json());

    }
  

  viewPurchSessionProd(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
 
      
               return this.http.post( this.URL+`viewPurchSessionProd`, serobj, options)
    .map((res: Response) => res.json());
  }


     viewProdWiseDist(serobj: string  ) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

                
               return this.http.post( this.URL+`viewProdWiseDist`, serobj, options)
    .map((res: Response) => res.json());
     }





}
