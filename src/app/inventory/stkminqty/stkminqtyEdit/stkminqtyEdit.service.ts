import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stkminqtyEditService  {





  constructor(private http: Http) {}
  
    options  ;
  
      private    URL='api/stkmin/';
  
  private URL1 ='api/slsinv/';





    
    ngOnInit() {
      
          let header = new Headers({'Content-Type': 'application/json'});
           this.options = new RequestOptions({headers: header});
           
      
        }
  




    viewStkMinQty(serobj: string) {
     
           
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
        return this.http
          .post(this.URL+`viewStkMinQty`, serobj, options).map((res: Response) => res.json());
      }




    




      newprview(serobj: string) {
     
           
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
            return this.http
              .post(this.URL1+`newprview`, serobj, options).map((res: Response) => res.json());
          }
    







      viewStkMinQtyAll(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
           return this.http.post( this.URL+`viewStkMinQtyAll`, serobj, options)
      .map((res: Response) => res.json());
    }
  



    viewStkMinQtyAll1(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
           return this.http.post( this.URL1+`newprno`, serobj, options)
      .map((res: Response) => res.json());
    }
  

    updateMinProduct(serobj: string) {
     
           
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
          return this.http
            .post(this.URL+`updatestkproduct`, serobj, options).map((res: Response) => res.json());
        }




    updateNewProduct(serobj: string) {
     
           
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
          return this.http
            .post(this.URL1+`updatenewproduct`, serobj, options).map((res: Response) => res.json());
        }



}
