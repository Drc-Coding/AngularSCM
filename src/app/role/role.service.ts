import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
@Injectable()
export class RoleService {
  private getRollURL = 'api/getRoleList';
  private CompURL = 'api/getusercomp';
  private existURL = 'api/isExistrole';
  private roleURL = 'api/saveRole';
  private rNameURL = 'api/getRolename';
  private moURL = 'api/roleModulelist';
  private submoduleurl = 'api/roleSubmoduleList';
  private ctrlURL = 'api/ctrldata';
  private isExURL = 'api/isRoleExist';
  private asRoleURL = 'api/viewAssignRole';
  private delRoleURL = 'api/deleteAssignRole';

  constructor(private http: Http) { }

  getCompanies() {
    return this.http.get(this.CompURL).map(response => response.json());
  }

  isRoleExist(roleID: any, moduleID: any) {
    return this.http.get(this.isExURL + '/' + roleID + '/' + moduleID).map(res => res.json());
  }

  createCtrlRole(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.ctrlURL, data, { headers: head }).map(response => response.json());
  }

  isExist(cid: any, name: any) {
    return this.http.get(this.existURL + '/' + cid + '/' + name).map(res => res.json());
  }

  createRole(data: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.roleURL, data, { headers: head }).map(response => response.json()).catch(this.handleError);
  }

  getRole() {
    return this.http.get(this.getRollURL).map(response => response.json());
  }

  getRoleName(id: any) {
    return this.http.get(this.rNameURL + '/' + id).map(res => res.text());
  }

  getModule(id: any): Promise<any> {
    return this.http.get(this.moURL + '/' + id)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
  getSubmodule(id: any) {
    return this.http.get(this.submoduleurl + '/' + id).map(response => response.json());
  }
  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }

  getRoles(id: any) {
    return this.http.get(this.asRoleURL + '/' + id).map(res => res.json());
  }

  deleteRow(id: any) {
    return this.http.get(this.delRoleURL + '/' + id).map(res => res.json());
  }
}
