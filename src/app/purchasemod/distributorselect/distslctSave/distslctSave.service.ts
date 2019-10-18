import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class distslctSaveService  {




  constructor(private http: Http) {}

  options  ;
  
    private    URL='api/distslct/';


  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions({headers: header});
    
      }
      

      savePriceEnqury(serobj: string) {
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`savePriceEnqury`, serobj, options) .map((res: Response) => res.json());
      }


      saveDistSelect(serobj: string) {
        
            let header = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: header});
        
            return this.http
              .post(this.URL+`saveDistSelect`, serobj, options) .map((res: Response) => res.json());
          }


 viewPriceEnquiryNo(serobj: string ) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});


               return this.http.post( this.URL+`viewDSPriceEnquiryNo`, serobj, options)
    .map((res: Response) => res.json());
}


viewPriceEnquiry(  serobj: string  ) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

  
               return this.http.post( this.URL+`viewDSPriceEnquiry`, serobj, options)
    .map((res: Response) => res.json());
  }
  

  viewDistSelectNo(serobj: string ) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

    
               return this.http.post( this.URL+`viewDSDistSelectNo`, serobj, options)
    .map((res: Response) => res.json());
    }
    

    viewDistSelect(serobj: string) { 
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

      
               return this.http.post( this.URL+`viewDistSelect`, serobj, options)
    .map((res: Response) => res.json());
      }



}
