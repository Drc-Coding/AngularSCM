import { Injectable } from '@angular/core';
//import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class invoiceprintService {
    options;
    private shopinfo = 'api/getinvoiceprint';
    private invoicenumber = 'api/getinvoicedetail';


    constructor(private http: Http) { }

    getShopName(compid: number, branchid: number, locname: number, locrefid: number, shop: number) {

        return this.http.get(this.shopinfo + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + shop).map(response => response.json());
    }

  getInvoice(compid: number, branchid: number, locname: number, locrefid: number, pono: number) {

   return this.http.get(this.invoicenumber + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' +pono).map (response => response.json());


  }
  }


