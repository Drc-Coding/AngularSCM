import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class UsersService {
  private compURL = 'api/companylist';
  private userURL = 'api/userCData';
  private roleURL = 'api/roleComplist';
  private conURL = 'api/getuserCountry';
  private proURL = 'api/getuserProduct';
  private domURL = 'api/getuserDomain';
  private sdomURL = 'api/getusersubDomain';
  private ediURL = 'api/getuserEdition';
  private empURl = 'api/userEmployeelist';
  private saveURL = 'api/saveUsers';
  private logURL = 'api/saveuserlogin';
  private uURL = 'api/moduleUserlist';
  private modURL = 'api/usermodulelist';
  private submodURL = 'api/usersubmodulelist';
  private saveMURL = 'api/saveusermodule';
  private saveSMURL = 'api/saveusersubmodule';
  private userbURL = 'api/userbranchlist';
  private SaveBURL = 'api/saveuserbranch';
  private userSURL = 'api/usershoplist';
  private saveSURL = 'api/saveusershop';
  private userWURL = 'api/userwarehouselist';
  private userHURL = 'api/userhospitallist';
  private saveWURL = 'api/saveuserwarehouse';
  private saveHURL = 'api/saveuserhospital';
  private delRoleURL = 'api/deleteAssignuser';
  private disturl = 'api/getdistinfo';
  //View User Data
  private usURL = 'api/viewuserdata';
  private umURL = 'api/viewuserModuledata';
  private uaURL = 'api/viewuserAccessdata';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  
  getCompanylist(): Promise<any> {
    return this.http.get(this.compURL)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getuserCountry(countryid: any) {
    return this.http.get(this.conURL + '/' + countryid).map(response => response.json()).catch(this.handleError);
  }

  getuserProduct(countryid: any) {
    return this.http.get(this.proURL + '/' + countryid).map(response => response.json()).catch(this.handleError);
  }

  getuserDomain(countryid: any) {
    return this.http.get(this.domURL + '/' + countryid).map(response => response.json()).catch(this.handleError);
  }

  getusersubDomain(countryid: any) {
    return this.http.get(this.sdomURL + '/' + countryid).map(response => response.json()).catch(this.handleError);
  }

  getuserEdition(countryid: any) {
    return this.http.get(this.ediURL + '/' + countryid).map(response => response.json()).catch(this.handleError);
  }

  getRolelist(countryid: any) {
    const url = `${this.roleURL}/${countryid}`;
    return this.http.get(url).map(response => response.json()).catch(this.handleError);
  }

  getemployeelist(countryid: any): Promise<any> {
    return this.http.get(this.empURl + '/' + countryid)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  createUser(data: String) {
    return this.http.post(this.saveURL, data, { headers: this.headers }).map(res => res.json());
  }
  createLogin(data: String) {
    return this.http.post(this.logURL, data, { headers: this.headers }).map(res => res.json());
  }

  //********************************************** */
  getUserlist(id: any): Promise<any> {
    return this.http.get(this.uURL + '/' + id)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

 
  getModule(id: number) {
    return this.http.get(this.modURL + '/' + id).map(res => res.json());
}
  
 
  getSubmodule(mid: any,uid :any): Promise<any> {
    return this.http.get(this.submodURL + '/' + mid + '/' + uid)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }


  // getSubmodule(mid:any, uid: any) {
  //   return this.http.get(this.submodURL + '/' + mid + '/' + uid).map(res => res.json());
  //  // return this.http.get(this.submodURL  + '/'+mid+'/' + uid).map(response => response.json());
  // }

  addModule(user: any, modules: any, approve :any, companyrefid:any) {
    return this.http.post(this.saveMURL, { suserrefid: user, moduleid: modules,  is_approver: approve, companyrefid:companyrefid }, { headers: this.headers }).map(response => response.json()).catch(this.handleError);
  }
  addSubmodule(data: String) {
    return this.http.post(this.saveSMURL, data, { headers: this.headers }).map(response => response.json()).catch(this.handleError);
  }
  //********************************************** */
  getBranch(id: number) {
    return this.http.get(this.userbURL + '/' + id).map(response => response.json());
  }
  addBranch(data: String) {
    return this.http.post(this.SaveBURL, data, { headers: this.headers }).map(res => res.json()).catch(this.handleError);
  }
  getStore(id: any) {
    return this.http.get(this.userSURL + '/' + id).map(response => response.json());
  }
  addStore(data: String) {
    return this.http.post(this.saveSURL, data, { headers: this.headers }).map(res => res.json()).catch(this.handleError);
  }
  getWarehouse(id: any) {
    return this.http.get(this.userWURL + '/' + id).map(response => response.json());
  }
  addWarehouse(data: String) {
    return this.http
      .post(this.saveWURL, data, { headers: this.headers }).map(res => res.json()).catch(this.handleError);
  }
  getHospital(id: any) {
    return this.http.get(this.userHURL + '/' + id).map(response => response.json());
  }
  addHospital(data: String) {
    return this.http
      .post(this.saveHURL, data, { headers: this.headers })
      .map(response => response.json())
      .catch(this.handleError);
  }

  viewUser() {
    return this.http.get(this.usURL).map(response => response.json());
  }
  viewModuleUser() {
    return this.http.get(this.umURL).map(response => response.json());
  }
  viewAccessUser(value: string) {   
    return this.http.get(this.uaURL + '/' + value).map(response => response.json());
  }
  deleteRow(id: any) {
    return this.http.get(this.delRoleURL + '/' + id).map(res => res.json());
  }
  //********************************************** */
  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }

    //distributor information
    Distinfo(cid: any){
      return this.http.get(this.disturl + '/' + cid).map(response => response.json());
      
        }
}
