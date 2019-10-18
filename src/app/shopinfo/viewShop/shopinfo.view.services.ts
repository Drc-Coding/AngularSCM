import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
@Injectable()
export class shopviewService {
  handleError: any;
  private viewshopUrl = 'api/viewshopRecord';
  private deleteshopUrl = 'api/deleteshopRecord';
  constructor(private http: Http) { }


  viewShop(cid: any, bid) {
    return this.http.get(this.viewshopUrl + '/' + cid + '/' + bid).map(response => response.json());
  }

  deleteShop(id: number) {
    return this.http.get(this.deleteshopUrl + '/' + id).map(response => response.json());
  }

}
