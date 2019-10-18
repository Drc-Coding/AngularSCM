import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ViewTherapeuticServices {
private viewtherapeuticurl='api/viewtherapeutic'
private deletetherapeuticurl='api/deletetherapeutic'
  constructor(private http: Http) {

  }

  TherapeuticView() {
   return this.http.get(this.viewtherapeuticurl).map(response => response.json());
  }

  TherapeuticDelete(id: number) {  
    return this.http.get(this.deletetherapeuticurl+'/'+id).map(response => response.json());
  }

}
