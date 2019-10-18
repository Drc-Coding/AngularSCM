import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class editCreditNoteService  {



  private    URL='api/crnote/';

  constructor(private http: Http) {}
  
  
  
  
  
  
      saveCreditNote(myObj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post( this.URL+`updateCreditNote`  , myObj, options).map((res: Response) => res.json());
      }






             viewCreditNoteNo(serobj: string) {
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
        
            
             return this.http.post( this.URL+`viewCreditNoteNo`  , serobj, options)
            .map((res: Response) => res.json());
               }
              
        
               viewCreditNote(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewCreditNote`, serobj, options)
                   .map((res: Response) => res.json());
              }



                
  
        viewCreditNoteAll(serobj: string) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});
      
               return this.http.post( this.URL+`viewCreditNoteAll`, serobj, options)
          .map((res: Response) => res.json());
        }


        
          deleteCreditNote(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`deleteCreditNote`, serobj, options)
                   .map((res: Response) => res.json());
              }

 

}
