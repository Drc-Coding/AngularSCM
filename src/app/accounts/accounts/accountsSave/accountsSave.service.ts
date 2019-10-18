import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class accountsSaveService  {


  private    URL='api/accounts/';
  
  
    constructor(private http: Http) {}
    
    

          saveAccount(serobj: string   ) {
                  let header = new Headers({'Content-Type': 'application/json'});
                  let options = new RequestOptions({headers: header});
            
                return this.http.post( this.URL+`saveAccount`, serobj, options)
                     .map((res: Response) => res.json());
           }



           saveAccBalance(serobj: string   ) {
                  let header = new Headers({'Content-Type': 'application/json'});
                  let options = new RequestOptions({headers: header});
            
                return this.http.post( this.URL+`saveAccBalance`, serobj, options)
                     .map((res: Response) => res.json());
           }


           saveTempAccTrnsfer(serobj: string   ) {
            let header = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: header});
      
          return this.http.post( this.URL+`saveTempAccTrnsfer`, serobj, options)
               .map((res: Response) => res.json());
          }


                

          
       viewAccountType(serobj: string   ) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
      return this.http.post( this.URL+`viewAccountType`, serobj, options)
           .map((res: Response) => res.json());
    }



       

       viewBalanceSheet(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
  
      
       return this.http.post( this.URL+`viewBalanceSheet`, serobj, options)
      .map((res: Response) => res.json());
         }



}
