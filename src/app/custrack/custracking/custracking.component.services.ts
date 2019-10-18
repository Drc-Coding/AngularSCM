import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { retry } from 'rxjs/operator/retry';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
@Injectable()
export class CustrackingServices {







    constructor(private http: Http) {


    }


    getSalesOrdDetails(siNum: any, cid: any, bid: any, lname: any, lrefid: any) {


        return this.http.get(`api/viewtracksalesorder` + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid + '/' + siNum).map(response=> response.json());
    }



    getAllList(cid: any, bid: any, lname: any, lrefid: any) {

        return this.http.get('api/getAllList' + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid).map(response => response.json());

    }








    getSearch(searchValue: string, comid: any, brnchid: any, locn: any, locrefid: any) {




        return this.http.get(`api/getSearchURL` + '/' + searchValue + '/' + comid + '/' + brnchid + '/' + locn + '/' + locrefid).map(response => response.json());







    }















}