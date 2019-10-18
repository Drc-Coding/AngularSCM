import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class editDebitNoteService  {




  private    URL='api/drnote/';


  constructor(private http: Http) {}
  
  
  
  
  
  
        saveDebitNote(myObj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`updateDebitNote`  , myObj, options).map((res: Response) => res.json());
          }


  

             viewDebitNoteNo(serobj: string) {
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
        
            
             return this.http.post( this.URL+`viewDebitNoteNo`  , serobj, options)
            .map((res: Response) => res.json());
               }
              
        
               viewDebitNote(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewDebitNote`, serobj, options)
                   .map((res: Response) => res.json());
              }


                
              viewDebitNoteAll(serobj: string) {
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
  
           return this.http.post( this.URL+`viewDebitNoteAll`, serobj, options)
      .map((res: Response) => res.json());
    }

    
       
             deleteDebitNote(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`deleteDebitNote`, serobj, options)
                   .map((res: Response) => res.json());
              }

}
