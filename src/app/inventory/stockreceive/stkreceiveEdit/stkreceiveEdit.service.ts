import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stkreceiveEditService  {


  
  
  
  options  ;
  
        private    URL='api/stkrec/';


  constructor(private http: Http) {}
  
  
  ngOnInit() {

    let header = new Headers({'Content-Type': 'application/json'});
     this.options = new RequestOptions({headers: header});

  }
  
  


  
  viewStkReceiveNo(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewStkReceiveNo`, serobj, options)
    .map((res: Response) => res.json());
}




viewStkReceiveProds(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewStkReceiveProds`, serobj, options)
    .map((res: Response) => res.json());
}


viewStkReceiveAll(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

       return this.http.post( this.URL+`viewStkReceiveAll`, serobj, options)
  .map((res: Response) => res.json());
}





}
