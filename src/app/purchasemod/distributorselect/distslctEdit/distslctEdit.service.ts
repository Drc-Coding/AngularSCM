import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class distslctEditService  {


  
  
  
  options  ;
  
        private    URL='api/distslct/';


  constructor(private http: Http) {}
  
  
  ngOnInit() {

    let header = new Headers({'Content-Type': 'application/json'});
     this.options = new RequestOptions({headers: header});

  }
  
  

  saveDistSelect(serobj: string) {
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`saveDistSelect`, serobj, options) .map((res: Response) => res.json());
      }

      

viewDistSelect(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewDistSelect`, serobj, options)
    .map((res: Response) => res.json());
}


viewDistSelectAll(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

       return this.http.post( this.URL+`viewDistSelectAll`, serobj, options)
  .map((res: Response) => res.json());
}




}
