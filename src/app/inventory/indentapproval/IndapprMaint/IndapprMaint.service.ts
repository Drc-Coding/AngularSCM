import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class IndapprMaintService  {

  options  ;

    private    URLapproval='api/indappr/';
    private    URL='api/indreq/';

  constructor(private http: Http) {}
  



  viewIndentreq(serobj: string) {
  
      let header = new Headers({'Content-Type': 'application/json'});
      let  options = new RequestOptions({headers: header});

        
               return this.http.post( this.URLapproval+`viewIndentreq`, serobj, options)
    .map((res: Response) => res.json());
    }
  



  

  

  
  
  
    viewWareHouse(  serobj: string ) {
      
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
    
               return this.http.post( this.URL+`viewWareHouse`, serobj, options)
    .map((res: Response) => res.json());
    }




    

    viewshopinformation(serobj: string   ) {
  
         
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    

        
               return this.http.post( this.URL+`viewshopinformation`, serobj, options)
    .map((res: Response) => res.json());
    }

    viewHospital(serobj: string ) {
   
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    

        
               return this.http.post( this.URL+`viewHospital`, serobj, options)
    .map((res: Response) => res.json());
    }

    



      
    viewIndentReqSelect(  serobj: string ) {
        
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
      
                 return this.http.post( this.URLapproval+`viewIndentReqSelect`, serobj, options)
      .map((res: Response) => res.json());
      }




}
