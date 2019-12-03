import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response, } from "@angular/http";
import 'rxjs/add/operator/map';








@Injectable()
export class ViewWarehouseServices {

    options;





    constructor(private http: Http) {


    }


    viewWareHouse(serobj: any) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });
        return this.http
            .post(`api/viewWarehouse`, serobj, options).map((res: Response) => res.json());
    }






}