import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class schemesEditService  {




  constructor(private http: Http) {}
  
      options  ;
      private    URL='api/scheme/';

    
    ngOnInit() {
      
          let header = new Headers({'Content-Type': 'application/json'});
           this.options = new RequestOptions({headers: header});
      
        }
  
        saveScheme(serobj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`updateScheme`, serobj, options).map((res: Response) => res.json());
        }
        
      
              
            viewSchemeEdit(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
     
                         return this.http.post( this.URL+`viewSchemeEdit`, serobj, options)
             .map((res: Response) => res.json());
      
        }


        deleteScheme(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
     
                         return this.http.post( this.URL+`deleteScheme`, serobj, options)
             .map((res: Response) => res.json());
      
        }


}
