import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Alert } from "selenium-webdriver";


@Injectable()
export class Usertaskservice {

  constructor(private http: Http) { }
 

  // private taskUrl = 'api/saveTaskAssignment';

  saveTaskAssignment(obj: any) {
    alert("Service" + obj);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`api/saveTaskAssignment`, obj, { headers: head }).map(response => response.json());

  }

  // viewUsertask(cid:any, bid:any, lname:any, lrefid:any){

  //     return this.http.get(this.viewhqDamageUrl + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid).map(response => response.json());

  // }





  getTaskType(compid: any, branchid: any, locname: any, locrefid: any) {
    //Get Coutries 
    return this.http.get(`api/taskType` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
  }

  getDept(compid: any, branchid: any, locname: any, locrefid: any) {
    //Get Coutries 
    return this.http.get(`api/dropdownDept` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
  }


  getTaskPriority(compid: any, branchid: any, locname: any, locrefid: any) {
    //Get Coutries 
    return this.http.get(`api/getTaskPriority` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
  }

  getTaskStatus(compid: any, branchid: any, locname: any, locrefid: any) {
    //Get Coutries 
    return this.http.get(`api/getTaskStatus` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid).map(response => response.json());
  }


  
  getEmployee(compid: any, branchid: any, locname: any, locrefid: any, deptrefid: any) {
    //Get Coutries 
    return this.http.get(`api/dropdownemployee` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + deptrefid).map(response => response.json());
  }

  getSubDept(compid: any, branchid: any, locname: any, locrefid: any, depid: any) {
    //Get Coutries 
    return this.http.get(`api/dropdownsubDept` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + depid).map(response => response.json());
  }

  getDivision(compid: any, branchid: any, locname: any, locrefid: any, depid: any, subdeptid: any) {
    //Get Coutries 
    return this.http.get(`api/dropdowndivision` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + depid + '/' + subdeptid).map(response => response.json());
  }
  getSubDivision(compid: any, branchid: any, locname: any, locrefid: any, depid: any, subdeptid: any, divisionid: any) {
    //Get Coutries 
    return this.http.get(`api/dropdownsubdivision` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + depid + '/' + subdeptid + '/' + divisionid).map(response => response.json());
  }

  getAssignEmployee(compid: any, branchid: any, locname: any, locrefid: any, subdivisionid: any) {
    //Get getAssignEmployee 
    return this.http.get(`api/getAssignEmployee` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + subdivisionid).map(response => response.json());
  }


  getTableValues(obj: any) {


    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`api/getTableValues`, obj, { headers: head }).map(res => res.json());
  }


  getAssignedBy(id:any){

    return this.http.get(`api/getAssignedBy` + '/' + id).map(res => res.json()); 
  
  }


  
  getAssignedTo(id:any){

    return this.http.get(`api/getAssignedTo` + '/' + id).map(res => res.json()); 
  
  }


  viewUserTask(obj: any) {




    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http
      .post(`api/viewUserTask`, obj, options).map((res: Response) => res.json());
  }


  
  viewPendingTask(obj: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http
      .post(`api/viewPendingTask`, obj, options).map((res: Response) => res.json());
  }






  getTaskValues(compid: any, branchid: any, locname: any, locrefid: any, id: any ) {
    return this.http.get(`api/getTaskValues` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid  + '/' + id).map(response => response.json());
  }




}







