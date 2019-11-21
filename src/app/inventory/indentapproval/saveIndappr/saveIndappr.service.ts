import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class saveIndapprService {



  options  ;

  
  private URL='api/indappr/';
  private deviceurl='api/User/saveUserActivity';
 

  constructor(private http: Http) {}
  
   
  
  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }
  
  
  
    saveIndentConfirm(serobj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post( this.URL+`saveIndentConfirm`, serobj, options) .map((res: Response) => res.json());
        }


          
  
        saveIndentConfirmProd(serobj: string) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post( this.URL+`saveIndentConfirmProd`, serobj, options).map((res: Response) => res.json());
        }
  
        viewIndentRequests(serobj: string) {

          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});        
    return this.http.post( this.URL+`viewIndentreq`, serobj, options)
    .map((res: Response) => res.json());
  }
  
  
  
  viewIndentProduct(serobj: string  ) {
  
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
          return this.http.post( this.URL+`viewSelIndentproduct`, serobj, options)
    .map((res: Response) => res.json());
  }


    viewLocName(serobj: string  ) {
    
  
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
            return this.http.post( this.URL+`viewLocName`, serobj, options)
      .map((res: Response) => res.json());
    }

    adddevicedetails(data){
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
            return this.http.post( this.deviceurl, data, options)
      .map((res: Response) => res.json());

    }
      


}
