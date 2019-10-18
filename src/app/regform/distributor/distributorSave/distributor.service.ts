import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DistributorService {




  constructor(private http: Http) { }

  options;
  private URL = 'api/dist/';

  private URLnew = 'api/patient/';


  ngOnInit() {

    let header = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: header });

  }

  saveDistributor(serobj: string) {


    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http
      .post(this.URL + `saveDistributor`, serobj, options).map((res: Response) => res.json());
  }


  saveDistPhcompany(serobj: string) {


    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http
      .post(this.URL + `saveDistPhcompany`, serobj, options).map((res: Response) => res.json());
  }


  saveIndvDistType1(serobj: string) {


    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `saveIndvDistType`, serobj, options).map((res: Response) => res.json());
  }






  // saveIndvDistType(serobj: string) {


  //   let header = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: header });

  //   return this.http.post(this.URL + `saveIndvDistType`, serobj, options).map((res: Response) => res.json());
  // }






  viewDistType(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `viewDistType`, serobj, options)
      .map((res: Response) => res.json());
  }



  viewCountry(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URLnew + `viewCountry`, serobj, options)
      .map((res: Response) => res.json());
  }

  viewState(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });


    return this.http.post(this.URLnew + `viewState`, serobj, options)
      .map((res: Response) => res.json());
  }

  viewCity(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URLnew + `viewCity`, serobj, options)
      .map((res: Response) => res.json());
  }




  viewDstPhCompanies(serobj: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(this.URL + `viewDstPhCompanies`, serobj, options)
      .map((res: Response) => res.json());
  }



}
