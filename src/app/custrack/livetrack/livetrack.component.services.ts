import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';




@Injectable()

export class liveTrackServices {






    constructor(private http: Http, private http1: HttpClient) {

    }





    getSoProd(siNo: any, cid: any, bid: any, lname: any, lrefid: any) {


        return this.http.get(`api/custtracking` + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid + '/' + siNo ).map(response => response.json())

    }

    getSalesInvoiceNoDetails(sInNO: any) {
        return this.http.get(`api/getSalesInvoiceNoDetails` + '/' + sInNO).map(response => response.json())
    }


    customersalesstatus(data: any){
        return this.http.get('api/getSalesOrderRefIDDetails' +'/'+ data  ).map(response=>  response.json());
       }



}