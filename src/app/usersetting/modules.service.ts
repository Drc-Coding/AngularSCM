import { Addmodule } from './addmodule';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
@Injectable()
export class DataModules {

  private addmoduleUrl = 'api/addmodule';  // URL to web API  get method
  private productUrl = 'api/modulesubdomainproduct';
  private domainUrl = 'api/domainbyid';
  private subdomainUrl = 'api/subdomainid';
  private subproductUrl = 'api/productid';
  private sdomainUrl = 'api/domainname';
  private submdomainUrl = 'api/subdomainname';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  // Get all modules
  getModules(): Promise<Addmodule[]> {
    return this.http.get(this.addmoduleUrl)
      .toPromise()
      .then(response => response.json() as Addmodule[])
      .catch(this.handleError);
  }

// create module
  create(modules: Addmodule): Promise<Addmodule> {

    
    return this.http
      .post('api/postaddmodule', JSON.stringify(modules), {headers : this.headers})
      .toPromise()
      .then(res => res.json() as Addmodule)
      .catch(this.handleError);
  }
// create sub module
subcreate(submodules: Addmodule): Promise<Addmodule> {     // post method
    return this.http
      .post('api/postaddsubmodule', JSON.stringify(submodules), {headers : this.headers})
      .toPromise()
      .then(res => res.json() as Addmodule)
      .catch(this.handleError);
  }

// Get modulesid country
getmodulesid(): Promise<any> {
    return this.http.get('api/modulesid')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
// view module
getviewmodule(): Promise<any> {
    return this.http.get('api/moduledomainlist')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
// product access
 getmoduleid(countryname: number) {


     const url = `${this.productUrl}/${countryname}`;
     return this.http.get(url).map(response => response.json());
 }

// domain access
  getdomainid(ct1: number,ct2: number) {
    const url = `${this.domainUrl}/${ct1}/${ct2}`;
     return this.http.get(url).map(response => response.json());
  }

// subdomain access
   getsubdomainid(ct1: number,ct2: number,ct3: number) {
   const url = `${this.subdomainUrl}/${ct1}/${ct2}/${ct3}`;
     return this.http.get(url).map(response => response.json());
   }

  delete(id: number): Promise<void> {
    const url = `${this.addmoduleUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
