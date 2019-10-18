import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class indentStatusService {
  private superviewUrl = 'api/superadminviewindentstatusurl';
  private viewUrl = 'api/viewindentstatusurl';
  constructor(private http: Http) {
  }


  superIndentStatusView() {
    return this.http.get(this.superviewUrl).map(response => response.json());
  }

  

  viewIndentStatus(comp: any, brnch: any, loc: any, locref: any) {
    //alert("comp"+comp+"brnch"+brnch+"loc"+loc+"locref"+locref);
    return this.http.get(this.viewUrl + "/" + comp + "/" + brnch + "/" + loc + "/" + locref).map(response => response.json());
  }

}
