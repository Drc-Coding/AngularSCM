import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class distupdationSaveService  {
      
     options  ;
  
    private  ureURL='api/distupd/';
      private    URLindappr='api/indappr/';
    constructor(private http: Http) {}
    
      
    ngOnInit() {
      
          let header = new Headers({'Content-Type': 'application/json'});
           this.options = new RequestOptions({headers: header});
      
        }
    
    
    
    
        savePriceEnquiry(serobj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.ureURL+`updatePriceEnquiry`,serobj, options).map((res: Response) => res.json());
        }
  
  
  
          
  
        viewDUPriceEnquiry(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
        
      return this.http.post( this.ureURL+`viewDUPriceEnquiry`, serobj, options)
      .map((res: Response) => res.json());
         }
        
  
  
    viewLocName(serobj: string  ) {
    
  
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
            return this.http.post( this.URLindappr+`viewLocName`, serobj, options)
      .map((res: Response) => res.json());
    }
}
