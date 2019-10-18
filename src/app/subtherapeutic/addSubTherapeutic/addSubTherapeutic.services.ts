import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class addSubTherapeuticService{
  handleError: any;
  headers: any;
  private saveurl = 'api/savesubtherapeutic';
  private gettharapeuticsurl = 'api/loadtharapeutics';
  private isExist='api/issubtherapeuticsexist';

 // private header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  isExistSubTherapeutic(tname: any,stname){
    return this.http.get(this.isExist + '/' +tname+'/'+stname).map(response => response.json());
  }



  createSubTherapeutic(createTherapeutic: String) {
    let head = new Headers({'Content-Type': 'application/json'});
    this.http.post(this.saveurl, createTherapeutic, {headers: head}).map(response => response.json())
      .subscribe(
      () => {console.log(createTherapeutic)}
      );
  }


  getTharapeutics() {
    return this.http.get(this.gettharapeuticsurl).map(response => response.json());
   }
  

}
