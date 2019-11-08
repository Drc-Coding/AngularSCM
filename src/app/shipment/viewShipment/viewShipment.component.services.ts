import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response, } from "@angular/http";
import 'rxjs/add/operator/map';



@Injectable()
export class ViewShipmentServices {

    options;

    constructor(private http:Http){ }


    viewShipp(serobj:any){
          
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
            return this.http
              .post(`api/shi/viewShipp`, serobj, options).map((res: Response) => res.json());
          }
    
}