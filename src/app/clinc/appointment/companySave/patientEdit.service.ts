import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class PatientEditService {





  constructor(private http: Http) {}

 


  patientSave(myObj: string) {

    // let  myObj23 = { 'customerCode': 'John', 'age': 30, 'roomNumber': '23' };

    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

    return this.http
      .post(`http://localhost:4200/spring-boot/savePatient`, myObj, options).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      }
      )
  }


  patientEdit(articleId: number) {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});

    return this.http.get(`http://localhost:4200/spring-boot/editPatient` + '/' + articleId)
      .map((res: Response) => res.json());

  }

  countryView() {
    return this.http.get(`http://localhost:4200/spring-boot/viewCountry`)
      .map((res: Response) => res.json());
  }

  stateView(articleId: string) {
    return this.http.get(`http://localhost:4200/spring-boot/viewState` + '/' + articleId)
      .map((res: Response) => res.json());
  }




}
