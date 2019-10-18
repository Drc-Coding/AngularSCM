import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class indentStandService {
  private viewUrl = 'api/standloneview';
  private superviewurl="api/standlonesuperadminview";
  constructor(private http: Http) {

  }


  superAdminViewStock() {
    return this.http.get(this.superviewurl).map(response => response.json());
  }


  viewStock(compid:any, brnchid:any,locrefid:any) {     
    return this.http.get(this.viewUrl + "/" + compid + "/" + brnchid + "/"+locrefid).map(response => response.json());
  }

}
