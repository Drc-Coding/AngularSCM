import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stktransEditService  {




  
  
  
  options  ;
  
        private    URL='api/stocktrans/';


  constructor(private http: Http) {}
  
  
  ngOnInit() {

    let header = new Headers({'Content-Type': 'application/json'});
     this.options = new RequestOptions({headers: header});

  }
  
  


  viewStkTransferNo(  serobj: string  ) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

  return this.http.post( this.URL+`viewStkTransferNo`, serobj, options)
    .map((res: Response) => res.json());
}


viewStkTransfProducts(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewStkTransfProducts`, serobj, options)
    .map((res: Response) => res.json());
}



viewStkTrnfrAll(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});
    
           return this.http.post( this.URL+`viewStkTrnfrAll`, serobj, options)
.map((res: Response) => res.json());
}





}
