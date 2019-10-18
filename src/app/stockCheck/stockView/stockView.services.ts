import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class stockViewService {
  private viewUrl = 'api/getstockcheckinginfo';
  private superviewurl="api/supergetstockcheckinginfo";
  constructor(private http: Http) {

  }


  superAdminViewStock() {
    return this.http.get(this.superviewurl).map(response => response.json());
  }


  viewStock(compid:any, brnchid:any, locname:any, locrefid:any) {
      // alert("comp"+compid+"brnch"+brnchid+"loc"+locname+"locref"+locrefid);
    return this.http.get(this.viewUrl + "/" + compid + "/" + brnchid + "/" + locname+ "/" +locrefid).map(response => response.json());
  }

}
