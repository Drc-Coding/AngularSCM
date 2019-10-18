import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class purjrnlEditService  {



  
  private    URL='api/purcjrnl/';

  constructor(private http: Http) {}
  
  
  
  
  
  
      savePurJrnlNo(myObj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post( this.URL+`updatePrcJournal` , myObj, options).map((res: Response) => res.json());
      }



      


             viewPurJrnlNo(serobj: string) {
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
        
            
             return this.http.post( this.URL+`viewPurJrnlNo`  ,   serobj, options)
            .map((res: Response) => res.json());
               }
              
        
               viewPurJrnl(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewPurJrnl`, serobj, options)
                   .map((res: Response) => res.json());
              }

       


              viewPurJrnlAll(serobj: string) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
            
                     return this.http.post( this.URL+`viewPurJrnlAll`, serobj, options)
                .map((res: Response) => res.json());
              }
  
              
              


               deletePurJrnl(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`deletePurJrnl`, serobj, options)
                   .map((res: Response) => res.json());
              }



}
