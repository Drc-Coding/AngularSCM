import { Subdomain } from './subdomain';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
@Injectable()

export class SubdomainService {
  private domainUrl = 'api/getdomains'; 
  private subDomainurl='api/subdomainproduct';
  private chksubDomainurl='api/checkSubdomainproduct';
  private saveSubdoURL='api/saveSubdomain';
  private domainlistUrl = 'api/subDomainlist'; 
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getSubdomainlist() {
    return this.http.get(this.domainlistUrl).map(res=>res.json());
  }
  

  createSubdomain(data: any): any {
    return this.http.post(this.saveSubdoURL, JSON.stringify(data), {headers : this.headers}).map(res=>res.json());    
  }
 
  
    getcountry(): Promise<any> {
    return this.http.get('api/getCountry')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
 

  
  getproduct(id: number) {
     const url = `${this.subDomainurl}/${id}`;
     return this.http.get(url).map(response => response.json());
  }
  
  getdomain(countryid: number) {
     const url = `${this.domainUrl}/${countryid}`;
     return this.http.get(url).map(response => response.json());
  }
 
  chkSubdomain(did:any,cid:any,pid:any,sdName:any)
  {
       return this.http.get(this.chksubDomainurl+'/'+did+'/'+cid+'/'+pid+'/'+sdName).map(re=>re.json());
  }
  private handleError(error: any): Promise<any> {
    console.error('Error', error); 
    return Promise.reject(error.message || error);
  }
}
