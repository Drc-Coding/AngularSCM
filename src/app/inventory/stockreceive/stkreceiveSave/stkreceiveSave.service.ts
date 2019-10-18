import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stkreceiveSaveService  {


  
  
  
       options  ;
  
        private    URL='api/stkrec/';

        private    URLIndAppr='api/indappr/';
        


  constructor(private http: Http) {}
  
  
  ngOnInit() {

    let header = new Headers({'Content-Type': 'application/json'});
     this.options = new RequestOptions({headers: header});

  }
  
  
  
  saveStockReceive(serobj: string) {
     
           
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
        return this.http
          .post(this.URL+`saveStockReceive`, serobj, options).map((res: Response) => res.json());
      }



      

      saveStkRecProducts(serobj: string) {
        
        
            let header = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: header});
        
            return this.http
              .post(this.URL+`saveStkRecProducts`, serobj, options)  .map((res: Response) => res.json());
          }

          saveGenJournal(serobj: string) {
            
            
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
            
                return this.http
                  .post(this.URL+`saveSRCGenJournal`, serobj, options)  .map((res: Response) => res.json());
              }





viewStkTransfer(  serobj: string  ) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

  return this.http.post( this.URL+`viewStkTransfer`, serobj, options)
    .map((res: Response) => res.json());
}


viewStkTransfProducts(serobj: string) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

   return this.http.post( this.URL+`viewStkTransfProducts`, serobj, options)
    .map((res: Response) => res.json());
}









  

    viewLocName(serobj: string  ) {
    
  
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
            return this.http.post( this.URLIndAppr+`viewLocName`, serobj, options)
      .map((res: Response) => res.json());
    }



          

}
