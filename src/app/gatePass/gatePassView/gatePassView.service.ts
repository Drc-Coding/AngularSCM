import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class gatePassViewService  {



  options  ;

    private viewURL='api/viewgatepass';


  constructor(private http: Http) {

  }
  
    viewDeliveryChallan(comp:any,brnch:any,locname:any,locrefid:any, billtyperefid:any) {
           return this.http.get(this.viewURL+'/'+comp+'/'+brnch+'/'+locname+'/'+locrefid +'/'+ billtyperefid).map((res: Response) => res.json());
    }
  
}
