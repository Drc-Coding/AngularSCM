import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class editDistProdService {




  options  ;
  private    URL='api/distprod/';


  constructor(private http: Http) {}
  
   
    
  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
   }
 
  
  
  
  
  
    saveDistProd(serobj: string ) {
      
      
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
          return this.http
            .post(this.URL+`updateDistProd`, serobj, options)  .map((res: Response) => res.json());
        }
  
  
  

        

    viewDistProd(serobj: string ) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewDistProd`, serobj, options)
    .map((res: Response) => res.json());
    }


    viewDistProdAll(serobj: string ) {
      let header = new Headers({'Content-Type': 'application/json'});
      let  options = new RequestOptions({headers: header});

           return this.http.post( this.URL+`viewDistProdAll`, serobj, options)
  .map((res: Response) => res.json());
    }

      
    deleteDistProd(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

                   return this.http.post( this.URL+`deleteDistProd`, serobj, options)
.map((res: Response) => res.json());
  }


}
