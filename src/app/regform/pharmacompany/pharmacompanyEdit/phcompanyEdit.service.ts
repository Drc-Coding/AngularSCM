import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class PhcompanyEditService {
  constructor(private http: Http) {}
  options  ;
  
    private    URL='api/phcompany/';
    private    URLnew='api/patient/';
  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }

  savePhcompany(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
    return this.http
      .post(this.URL+`updatePhCompany`, serobj, options).map((res: Response) => res.json()); 
  }
  
  saveComptype(serobj: string) {
    
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`updateComptype`, serobj, options).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log('Error occured');
          }
          )
      }
    
    
    
      saveDivision(serobj: string) {
    
    
    
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
    
        return this.http
          .post(this.URL+`updateDivision`, serobj, options).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log('Error occured');
          }
          )
      }
      viewPhCompanyEdit(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
         return this.http.post( this.URL+`viewPhCompanyEdit`, serobj, options)
    .map((res: Response) => res.json());
  }
  viewComptype(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
         return this.http.post( this.URL+`viewComptype`, serobj, options)
    .map((res: Response) => res.json());
  }
  viewDivision(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
         return this.http.post( this.URL+`viewDivision`, serobj, options)
    .map((res: Response) => res.json());
  }
  viewCountry(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
         return this.http.post( this.URLnew+`viewCountry`, serobj, options)
    .map((res: Response) => res.json());
  }
  viewState(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
         return this.http.post( this.URLnew+`viewState`, serobj, options)
    .map((res: Response) => res.json());
  }
  viewCity(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
         return this.http.post( this.URLnew+`viewCity`, serobj, options)
    .map((res: Response) => res.json());
  }
  viewCustComptype(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
         return this.http.post( this.URL+`viewCustComptype`, serobj, options)
    .map((res: Response) => res.json());
  }
  viewCustDivision(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
         return this.http.post( this.URL+`viewCustDivision`, serobj, options)
    .map((res: Response) => res.json());
  }

  
  deletePhCompany(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
         return this.http.post( this.URL+`deletePhCompany`, serobj, options)
    .map((res: Response) => res.json());
  }
  
  getpheditstate(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
         return this.http.post( this.URL+`editPCState`, serobj, options)
    .map((res: Response) => res.json());
  }

    
  getpheditcity(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
         return this.http.post( this.URL+`editPCCity`, serobj, options)
    .map((res: Response) => res.json());
  }
}
