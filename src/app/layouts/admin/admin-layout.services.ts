import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class adminService{
    private shopinfo= 'api/getshopinfo';

    constructor(private http: Http) {}

    getShopName(shopid: number) {
        //Get getDrugList
        return this.http.get(this.shopinfo+'/'+shopid).map(response => response.json());
       }
    

}