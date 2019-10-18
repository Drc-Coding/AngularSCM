import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class prcenquiryViewService  {


  constructor(private http: Http) {}
  
    options  ;
  
      private    URL='api/prcenq/';
      private disturl='api/getdistpriceenq';
      private orderdateurl='api/getdate';
      private producturl='api/getdistprod';
  
    
    ngOnInit() {
      
          let header = new Headers({'Content-Type': 'application/json'});
           this.options = new RequestOptions({headers: header});
           
      
        }
  
    // viewAll(serobj: string) {
    //   let header = new Headers({'Content-Type': 'application/json'});
    //   let options = new RequestOptions({headers: header});
  
    //        return this.http.post( this.URL+`viewPriceEnquiryAll`, serobj, options)
    //   .map((res: Response) => res.json());
    // }
  
    distributorlist(compid: number, brnchid: number, locname: number, locrefid: number){
  return this.http.get(this.disturl + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid).map(response => response.json());

}

 orderdatelist(compid: number, brnchid: number, locname: number, locrefid: number, vendorid: number){

  return this.http.get(this.orderdateurl + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid + '/' + vendorid).map(response => response.json());
}

 Priceenqiryproduct(compid: number, brnchid: number, locname: number, locrefid: number, vendorid: number, orderdate: string){
  return this.http.get(this.producturl + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid + '/' + vendorid + '/' + orderdate).map(response => response.json());

}

}
