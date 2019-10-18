import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class addTherapeuticService{
  handleError: any;
  headers: any;
  private saveurl = 'api/savetherapeutic';
  private isExist = 'api/isexisttherapeutic';
 // private header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}


  isExistTherapeutic(tname: any){
    return this.http.get(this.isExist + '/' +tname).map(response => response.json());
  }



  createTherapeutic(createTherapeutic: String) {
    let head = new Headers({'Content-Type': 'application/json'});
    this.http.post(this.saveurl, createTherapeutic, {headers: head}).map(response => response.json())
      .subscribe(
      () => {console.log(createTherapeutic)}
      );
  }
  

}
