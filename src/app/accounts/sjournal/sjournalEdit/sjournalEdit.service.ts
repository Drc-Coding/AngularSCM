import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class sjournalEditService  {



  private    URL='api/sjournal/';


  constructor(private http: Http) {}
  
         saveSjournal(myObj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`updateSJournal`, myObj, options).map((res: Response) => res.json());
            }



            
             viewSjournalNo(serobj: string) {
              let header = new Headers({'Content-Type': 'application/json'});
              let options = new RequestOptions({headers: header});
        
            
             return this.http.post( this.URL+`viewSjournalNo`, serobj, options)
            .map((res: Response) => res.json());
               }
              
        
               viewSjournal(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`viewSjournal`, serobj, options)
                   .map((res: Response) => res.json());
              }

       

              viewSjournalAll(serobj: string) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
            
                     return this.http.post( this.URL+`viewSjournalAll`, serobj, options)
                .map((res: Response) => res.json());
              }
  
              
              
  deleteSjournal(serobj: string   ) {
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
          
          return this.http.post( this.URL+`deleteSjournal`, serobj, options)
                   .map((res: Response) => res.json());
              }


}
