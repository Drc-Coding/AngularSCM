import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class editIndapprService  {



  
  
  
  options  ;
  
        private    URL='api/indappr/';


  constructor(private http: Http) {}
  
  
  ngOnInit() {

    let header = new Headers({'Content-Type': 'application/json'});
     this.options = new RequestOptions({headers: header});

  }
  
  


  
  viewSelIndentproduct(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewSelIndentproduct`, serobj, options)
    .map((res: Response) => res.json());
}




viewIndentConfirmAll(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

       return this.http.post( this.URL+`viewIndentConfirmAll`, serobj, options)
  .map((res: Response) => res.json());
}

viewIndentConfirmNo(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

       return this.http.post( this.URL+`viewIndentConfirmNo`, serobj, options)
  .map((res: Response) => res.json());
}



}
