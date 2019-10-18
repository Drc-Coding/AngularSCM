import { Addsubmodulevalues } from './submodules';
import { Injectable } from '@angular/core';
import { Headers, Http , RequestOptions   , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataSubmodules {
  addsubmoduleUrl = 'api/addsubmodule';
// product url
submoduleproductUrl = 'api/domainlistsub'; // product
  submoduledomainUrl = 'api/domainnamesub'; // domain
  submodulesubdomainUrl = 'api/subdomainname'; // subdomain
  viewsubmoduleUrl = 'api/submoduleslist'; // view
  submodulemodulesUrl = 'api/submodulesname';
 private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}


  subcreate(value: string) {


    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

    return this.http
      .post('api/postsubmodule', value  , options )
      .map((res: Response) => res.json());




  }
  // sub module get
  getsubModules(): Promise<Addsubmodulevalues[]> {
    return this.http.get(this.addsubmoduleUrl)
      .toPromise()
      .then(response => response.json() as Addsubmodulevalues[])
      .catch(this.handleError);
  }
 // view sub modules
  getviewModules(): Promise<Addsubmodulevalues[]> {
    return this.http.get(this.viewsubmoduleUrl)
      .toPromise()
      .then(response => response.json() as Addsubmodulevalues[])
      .catch(this.handleError);
  }
  // sub module country
getmodulescountry(): Promise<any> {
    return this.http.get('api/submoduleid')  // country access for submodules
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
  // sub module product
 getmoduleproductid(productname: number) {


     const url = `${this.submoduleproductUrl}/${productname}`;
     return this.http.get(url).map(response => response.json());
 }
  // sub module domain
  getmoduledomainid(ct1: number,ct2: number  ) {


     const url = `${this.submoduledomainUrl}/${ct1}/${ct2}`;
     return this.http.get(url).map(response => response.json());
 }
  // sub module subdomain
  getsubmodulesubdomain(ct1: number,ct2: number,ct3: number) {


     const url = `${this.submodulesubdomainUrl}/${ct1}/${ct2}/${ct3}`;
     return this.http.get(url).map(response => response.json());
 }
 // modules by subdomain
 getsubmodulemodules(ct1: number,ct2: number,ct3: number,ct4: number) {


  const url = `${this.submodulemodulesUrl}/${ct1}/${ct2}/${ct3}/${ct4}`;
  return this.http.get(url).map(response => response.json());
}
   private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
