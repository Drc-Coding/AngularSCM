import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class prescViewService  {





  options  ;
  
      private    URL='http://localhost:4200/api/presc/';
  
  
    constructor(private http: Http) {}
    
     
      
       ngOnInit() {
      
          let header = new Headers({'Content-Type': 'application/json'});
           this.options = new RequestOptions({headers: header});
      
        }
  
  
      phcompanyView(serobj: string) {
    
        let header = new Headers({'Content-Type': 'application/json'});
        let  options = new RequestOptions({headers: header});
  
          
                 return this.http.post( this.URL+`viewPrescAll`, serobj, options)
      .map((res: Response) => res.json());
      }
    
  

}
