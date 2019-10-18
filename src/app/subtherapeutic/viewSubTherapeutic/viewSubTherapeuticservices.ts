import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ViewSubTherapeuticServices {
private viewsubtherapeuticurl='api/viewsubtherapeuticurl';
private deletesubtherapeuticurl='api/deletetherapeutic';
  constructor(private http: Http) {

  }

  SubTherapeuticView() {
   return this.http.get(this.viewsubtherapeuticurl).map(response => response.json());
  }

  SubTherapeuticDelete(id: number) {  
    return this.http.get(this.deletesubtherapeuticurl+'/'+id).map(response => response.json());
  }

}
