import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stkminqtyViewService  {

  options  ;

    private    URL='api/stkmin/';
private URL1 ='api/slsinv/';


  constructor(private http: Http) {}



      viewStkMinQtyAll(serobj: string) {
     
           
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
        return this.http
          .post(this.URL+`viewStkMinQtyAll`, serobj, options).map((res: Response) => res.json());
      }




      viewStkNewQtyAll(serobj:string){
          
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
            return this.http
              .post(this.URL1+`viewStkNewQtyAll`, serobj, options).map((res: Response) => res.json());
          }


          // viewStockRecord(id: any){


          //   return this.http.get(this.URL+'viewStockRecord' +'/'+ id).map((res: Response) => res.json());




          // }





      }






