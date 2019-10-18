import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class editSubTherapeuticService {

private updatetherapeuticurl='/api/updatesubtherapeutic';
private gettherapetic='/api/loadtharapeutics';
private getsubtherapetic='/api/getsubtherabyid';
private isExist='api/isSubTherapeuticUpdateExist';
  constructor(private http: Http) {}

  getTherapeutic() {
    //Get Coutries 
    return this.http.get(this.gettherapetic).map(response => response.json());
  }

  getSubTherapeutic(id:number) {
    //Get Coutries 
    return this.http.get(this.getsubtherapetic+'/'+id).map(response => response.json());
  }

  isExistSubTherapeutic(tid: any,tname:any,stid:any){
    return this.http.get(this.isExist + '/' +tid+'/'+tname+'/'+stid).map(response => response.json());
  }

 updateSubTherapeutic(UpdateTherapeutic: String) {
    let head = new Headers({'Content-Type': 'application/json'});
    this.http.post(this.updatetherapeuticurl, UpdateTherapeutic, {headers: head}).map(response => response.json())
      .subscribe(
      () => {console.log(UpdateTherapeutic)}
      );
  }

}
