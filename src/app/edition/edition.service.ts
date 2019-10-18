import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
@Injectable()
export class EditionService {
  private editionUrl = 'api/editionlist';
  private domainsUrl = 'api/editiondomains';
  private subdomainUrl = 'api/editionsubdomain';
  private editionProURL = 'api/editionproduct';
  private chkeditionURL = 'api/checkeditionname';
  private saveURL = 'api/saveEditiondata';
  private editionNameURL = 'api/seteditionname';
  private subDomainNameURL = 'api/setSubdomainname';
  private moduleURL = 'api/setModulelist';
  private submoduleURL = 'api/setsubModulelist';
  private saveControlURL = 'api/saveAssignmodule';
  private editionURL = 'api/checkEditionid';
  constructor(private http: Http) { }
  //** EDITION DETAIL'S**//
  getcountry(): any {
    return this.http.get('api/getCountry').map(res => res.json()).catch(this.handleError);
  }

  getProduct(countryid: number) {
    const url = `${this.editionProURL}/${countryid}`;
    return this.http.get(url).map(response => response.json());
  }

  getDomain(cid: any, pid: any) {
    return this.http.get(this.domainsUrl + '/' + cid + '/' + pid).map(response => response.json());
  }

  getSubdomainid(cid: any, pid: any, did: any) {
    return this.http.get(this.subdomainUrl + '/' + cid + '/' + pid + '/' + did).map(response => response.json());
  }


  checkExistedition(cid: any, pid: any, did: any, sdid: any, editionName: any, editionVersion: string) {
    return this.http.get(this.chkeditionURL + '/' + cid + '/' + pid + '/' + did + '/' + sdid + '/' + editionName + '/' + editionVersion).map(res => res.json());
  }

  createRecord(data: String): any {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.saveURL, data, { headers: head }).map(response => response.json());
  }

  getedition() {
    return this.http.get(this.editionUrl).map(res => res.json()).toPromise().catch(this.handleError);
  }
  //** EDITION CONTROL MODULE ASSIGN **//
  getEditionname(id: any) {
    return this.http.get(this.editionNameURL + '/' + id).map(res => res.json());
  }
  getSubdomainname(id: any) {
    return this.http.get(this.subDomainNameURL + '/' + id).map(res => res.json());
  }

  getModulelist(id: any) {
    return this.http.get(this.moduleURL + '/' + id).map(res => res.json());
  }
  getsubModulelist(eid: any, id: any) {
    return this.http.get(this.submoduleURL + '/' + eid + '/' + id).map(res => res.json());
  }

  createControl(data: String): any {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.saveControlURL, data, { headers: head }).map(response => response.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  checkEditionid(id: number) {
    return this.http.get(this.editionURL + '/' + id).map(res => res.json());
  }
}
