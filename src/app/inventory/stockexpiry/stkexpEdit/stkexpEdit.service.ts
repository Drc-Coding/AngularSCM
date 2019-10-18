import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stkexpEditService  {
 
 

  options  ;

  
  private  ureURL='api/stockexp/';
  private getlocrefname='api/getLocreference';
  private getloctype='api/getLoctype';


  constructor(private http: Http) {}
  
  
  
    
  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }
  
  
      saveStockExpiry(serobj: string ) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.ureURL+`updateStockExpiry`, serobj, options).map((res: Response) => res.json());
        }

        getlocrefid(locname: any): any {
          return this.http.get(this.getlocrefname + '/' + locname).map(response => response.json());
        }

        getLoctype(): any {
          // alert('Inside init function')
           return this.http.get(this.getloctype).map(response => response.json());
         }




       viewStockExpiry(serobj: string ) {
                
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
             return this.http.post(this.ureURL+`viewStockExpiry`, serobj, options)
             .map((res: Response) => res.json());
        }



        viewStockExpAll(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
               return this.http.post( this.ureURL+`viewStockExpAll`, serobj, options)
          .map((res: Response) => res.json());
        }

        

    deleteStockExpiry(serobj: string ) {
                
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
             return this.http.post(this.ureURL+`deleteStockExpiry`, serobj, options)
             .map((res: Response) => res.json());
        }



}
