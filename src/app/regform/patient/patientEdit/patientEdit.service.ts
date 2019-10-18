import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class PatientEditService {





  constructor(private http: Http) {}

 
  options  ;
  
    private    URL='api/patient/';


  ngOnInit() {
    
        let header = new Headers({'Content-Type': 'application/json'});
         this.options = new RequestOptions({headers: header});
    
      }

  savePatient(serobj: string) {


    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

    return this.http
      .post(this.URL+`updatePatient`, serobj, options).map((res: Response) =>{
        
        return{"res":res.json()}} );
     
  }


  viewPatientEdit(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
  
         return this.http.post( this.URL+`viewPatientEdit`, serobj, options)
    .map((res: Response) => res.json());

  }

  viewCountry(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

         return this.http.post( this.URL+`viewCountry`, serobj, options)
    .map((res: Response) => res.json());

  }

  viewState(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

         return this.http.post( this.URL+`viewState`, serobj, options)
    .map((res: Response) => res.json());
  }

  viewCity(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

         return this.http.post( this.URL+`viewCity`, serobj, options)
    .map((res: Response) => res.json());
  }




  deletePatient(serobj: string) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

         return this.http.post( this.URL+`deletePatient`, serobj, options)
    .map((res: Response) => res.json());
  }


  getcuststateedit(serobj: string) {

    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

       return this.http.post( this.URL+`editCusState`, serobj, options)
    .map((res: Response) => res.json());
  }

  getcustcityedit(serobj: string) {

    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

       return this.http.post( this.URL+`editCusCity`, serobj, options)
    .map((res: Response) => res.json());
  }

}
