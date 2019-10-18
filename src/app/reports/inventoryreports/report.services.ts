import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()

export class stktrnsprodservice  {
    handleError: any;
    headers: any;

  private Stktrns = 'api/stktrnsfer';

   constructor(private http: Http) { }

   //Desing 040419  Inventory Report/StkTrans by Product
   getstocktransfer(cid:any,bid:any,locname:any,locrefid:any){
      return this.http.get('api/stktrnsfer' + '/' + cid + '/' + bid + '/' + locname + '/' + locrefid).map(res => res.json());
   }

   getrequisition(cid:any,bid:any,locname:any,locrefid:any){
     return this.http.get('api/IndentReqNo' + '/' + cid + '/' + bid +'/' + locname + '/' + locrefid).map(res => res.json());
   }
  
}

