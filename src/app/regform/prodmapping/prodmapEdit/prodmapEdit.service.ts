import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class prodmapEditService  {




  options  ;
  private    URL='api/prodmap/';


  constructor(private http: Http) {}
  
   
    
  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
   }
 
  
  
  
  
  
   saveProdMap(serobj: string ) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`updateProdMap`, serobj, options)     .map((res: Response) => res.json());
        }
  
  
        viewPMCustProducts1(serobj: string ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
       return this.http.post( this.URL+`viewPMCustProducts1`, serobj, options)
        .map((res: Response) => res.json());
        }
    
    
    
        viewPMCustProduct1(serobj: string ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
       return this.http.post( this.URL+`viewPMCustProduct1`, serobj, options)
        .map((res: Response) => res.json());
        }



        viewProdMap(serobj: string ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
    
       return this.http.post( this.URL+`viewProdMap`, serobj, options)
        .map((res: Response) => res.json());
        }



        viewProdMapAll(serobj: string ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let  options = new RequestOptions({headers: header});
  
               return this.http.post( this.URL+`viewProdMapAll`, serobj, options)
      .map((res: Response) => res.json());
        }
  

        
        

}
