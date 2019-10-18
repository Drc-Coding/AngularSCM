import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {FormGroup} from "@angular/forms";
@Injectable()
export class companyviewService {
  handleError: any;
  private viewcmpUrl = 'api/viewcompanypRecord';
  private deletecmpUrl = 'api/deletecompRecord';
  private countURL='api/getComopcounts'
  constructor(private http: Http) {}

  viewComp() {  
    return this.http.get(this.viewcmpUrl).map(response => response.json());
  }

  deleteComp(id:number)
  {
    return this.http.get(this.deletecmpUrl+ '/' + id).map(response => response.json()); 
  }
  
  getCount()
  {
    return this.http.get(this.countURL).map(response => response.json());;
  }

}
