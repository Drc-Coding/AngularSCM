import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stkretSaveService  {


  options  ;

  private    URL='api/stkretn/';
  private    URLIndAppr='api/indappr/';


  constructor(private http: Http) {}
  
  
    
  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }
  


      

      saveStockRetProducts(serobj: string ) {
        
        
            let header = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: header});
        
            return this.http
              .post(this.URL+`saveStockRetProducts`, serobj, options)  .map((res: Response) => res.json());
          }




          saveGenJournal(serobj: string) {
            
            
                let header = new Headers({'Content-Type': 'application/json'});
                let options = new RequestOptions({headers: header});
            
                return this.http
                  .post(this.URL+`saveSRNGenJournal`, serobj, options)  .map((res: Response) => res.json());
              }



viewStkTransfer(serobj: string ) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

    
               return this.http.post( this.URL+`viewSRStkTransfer`, serobj, options)
    .map((res: Response) => res.json());
}


viewStkTransfProducts(serobj: string ) {
  let header = new Headers({'Content-Type': 'application/json'});
  let options = new RequestOptions({headers: header});

    
               return this.http.post( this.URL+`viewSRStkTransfProducts`, serobj, options)
    .map((res: Response) => res.json());
}





    viewLocName(serobj: string  ) {
    
  
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
            return this.http.post( this.URLIndAppr+`viewLocName`, serobj, options)
      .map((res: Response) => res.json());
    }

   
}
