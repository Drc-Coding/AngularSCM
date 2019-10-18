import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'; import { Observable } from 'rxjs/Rx';
@Injectable()
export class UserloginService {
  private loginurl = 'api/loginModule';
  private labelURl = 'api/getModulelabel';
  private userURl = 'api/checkExistuser';
  private compURl = 'api/getusercomp';
  constructor(private http: Http) { }

  head = new Headers({ 'Content-Type': 'application/json' });

  getlogin(uname: string, upass: string, company: any): Observable<any> {
    return this.http.post(this.loginurl, { username: uname, password: upass, companyid: company }, { headers: this.head }).map(response => response.json());
  }

  getmoduleLabel(uname: string, upass: string, company: any): Observable<any> {
    return this.http.post(this.labelURl, { username: uname, password: upass, companyid: company }, { headers: this.head }).map(response => response.json());
  }

  isExists(uname: string, upass: string, company: any): Observable<any> {
    return this.http.post(this.userURl, { username: uname, password: upass, companyid: company }, { headers: this.head }).map(response => response.json());
  }
  
  getComplist() {
    return this.http.get(this.compURl).map(res => res.json());
  }
  //CHOOSE SECTION
  getBranch(cid: any, uid: any) {
    return this.http.get('api/getloginBranchlist' + '/' + cid + '/' + uid).map(res => res.json());
  }

  getShop(cid: any, bid: any, uid: any) {
    return this.http.get('api/getloginShoplist' + '/' + cid + '/' + bid + '/' + uid).map(res => res.json());
  }
  getHospital(cid: any, bid: any, uid: any) {
    return this.http.get('api/getloginHospitallist' + '/' + cid + '/' + bid + '/' + uid).map(res => res.json());
  }
  getWarehouse(cid: any, bid: any, uid: any) {
    return this.http.get('api/getloginWarehouselist' + '/' + cid + '/' + bid + '/' + uid).map(res => res.json());
  }

  getLocalStore(data: String) {
    return this.http.post('api/getLocalStorage', data, { headers: this.head }).map(res => res.json());
  }


}
