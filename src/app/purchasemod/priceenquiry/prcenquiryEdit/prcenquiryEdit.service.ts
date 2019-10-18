import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class prcenquiryEditService  {




  
  
  
  options  ;
  
        private    URL='api/prcenq/';


  constructor(private http: Http) {}
  
  
  ngOnInit() {

    let header = new Headers({'Content-Type': 'application/json'});
     this.options = new RequestOptions({headers: header});

  }
  


viewPriceEnquiryProd(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewPriceEnquiryProd`, serobj, options)
    .map((res: Response) => res.json());
}


viewPriceEnquiryAll(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

       return this.http.post( this.URL+`viewPriceEnquiryAll`, serobj, options)
  .map((res: Response) => res.json());
}



}
