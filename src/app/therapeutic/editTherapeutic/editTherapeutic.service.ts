import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class editTherapeuticService {

private updatetherapeuticurl='/api/updatetherapeutic';
private geturl='/api/gettherabyid';
private isExistUrl='/api/isTherapeuticUpdateExist';
  constructor(private http: Http) {}

 getTherapeutic(id:number){
  return this.http.get(this.geturl + '/' +id).map(response=>response.json())
 }


 isTherapeuticExist(tname: any,tid: any){
  //Get States 
  return this.http.get(this.isExistUrl + '/' +tname+'/'+tid).map(response => response.json());
}

 updateTherapeutic(UpdateTherapeutic: String) {
    let head = new Headers({'Content-Type': 'application/json'});
    this.http.post(this.updatetherapeuticurl, UpdateTherapeutic, {headers: head}).map(response => response.json())
      .subscribe(
      () => {console.log(UpdateTherapeutic)}
      );
  }

}
