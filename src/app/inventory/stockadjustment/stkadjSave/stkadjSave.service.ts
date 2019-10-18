import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stkadjSaveService  {

  options  ;

  private    URL='api/stkadj/';


  constructor(private http: Http) {}
  
  
    
    ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }
  
  
  
          saveStockAdjust(serobj: string) {
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`saveStockAdjust`, serobj, options).map((res: Response) => res.json());
        }



  
     


      viewSTWareHouseStocks(serobj: string) {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});

         
               return this.http.post( this.URL+`viewSADMainstocks`, serobj, options)
    .map((res: Response) => res.json());
         }
      

         viewSTWareHouseStock(serobj: string ) {
          let header = new Headers({'Content-Type': 'application/json'});
          let options = new RequestOptions({headers: header});

                
               return this.http.post( this.URL+`viewSADMainstock`, serobj, options)
    .map((res: Response) => res.json());
        }





}
