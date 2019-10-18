import { Domain } from './domain';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class DomainService {
  private productUrl = 'api/domainProduct'; 
  private chkproUrl = 'api/checkExistproduct'; 
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}
  getdomain(): Promise<any> {
    return this.http.get('api/domainlists')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
  
  create(data: String):any {
    return this.http.post('api/savedomains', JSON.stringify(data), {headers : this.headers}).map(res => res.json()).catch(this.handleError);
  }
  
  getproduct(id: number) {
     const url = `${this.productUrl}/${id}`;
     return this.http.get(url).map(response => response.json());
  }
  
    getcountry(): Promise<any> {
      return this.http.get('api/getCountry')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
 
  checkProduct(cid:any,pid:any,dname:any)
  {
    return this.http.get(this.chkproUrl+'/'+cid+'/'+pid+'/'+dname).map(res=>res.json()).catch(this.handleError);;
  }
  private handleError(error: any): Promise<any> {
    console.error('Error', error); 
    return Promise.reject(error.message || error);
  }
}
