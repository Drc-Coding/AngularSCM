import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stkretEditService  {




  
  
  
  options  ;
  
        private    URL='api/stkretn/';


  constructor(private http: Http) {}
  
  
  ngOnInit() {

    let header = new Headers({'Content-Type': 'application/json'});
     this.options = new RequestOptions({headers: header});

  }
  
  



viewStkReturnProds(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewStkReturnProds`, serobj, options)
    .map((res: Response) => res.json());
}




viewStkReturnAll(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'} );
  let options = new RequestOptions({headers: header});

       return this.http.post( this.URL+`viewStkReturnAll`, serobj, options)
  .map((res: Response) => res.json());
}




deleteStockExpiry(serobj: string) {
          
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});
  
     
return this.http.post( `api/stockexp/deleteStockExpiry`, serobj, options)
.map((res: Response) => res.json());
}



deleteStockExpiry1(serobj: string) {
          
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});
  
     
return this.http.post( this.URL+ `deleteStockReturn`, serobj, options)
.map((res: Response) => res.json());
}








}
