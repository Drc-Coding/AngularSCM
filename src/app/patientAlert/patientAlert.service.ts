import { Injectable } from '@angular/core';
//import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class patientAlertService {
    handleError: any;
    headers: any;

    private getCompanies = 'api/getpatientcompany';
    private getBranches = 'api/getpatientbranch';
    private getShops = 'api/getpatientshop';
    private getWarehouses = 'api/getpatientwarehouse';
    private getHospitals = 'api/getpatienthospital';
    private getCompanyPatients = 'api/getcompanypatient';
    private getBranchPatients = 'api/getbranchpatient';
    private getFirmPatients = 'api/getfirmpatient';
    private getPatientInfomation = 'api/getpatientinfo';
    private sendmailurl = 'api/sendmessagebymail';
    private msgUrl = 'api/savePatient';
    // private header = new Headers({'Content-Type': 'application/json'});


    private viewUrlByAdmin = 'api/viewpatientalert';
    private viewUrl = 'api/viewpatientalert';
    private deleteUrl = 'api/deletePatientAlert';
    constructor(private http: Http) { }


    //Get Companies
    getCompany() {
        return this.http.get(this.getCompanies).map(response => response.json());
    }



    //Get Branch By CompanyID 
    getBranche(compid: number) {
        return this.http.get(this.getBranches + '/' + compid).map(response => response.json());
    }



    //Get Shop By BranchID 
    getShop(branchid: number) {
        return this.http.get(this.getShops + '/' + branchid).map(response => response.json());
    }


    //Get Warehouse By BranchID 
    getWareHouse(branchid: number) {
        return this.http.get(this.getWarehouses + '/' + branchid).map(response => response.json());
    }


    //Get Hospital By BranchID 
    getHospital(branchid: number) {
        return this.http.get(this.getHospitals + '/' + branchid).map(response => response.json());
    }



    //Get Patient By CompanyID 
    getCompanyPatient(compid: number) {
        return this.http.get(this.getCompanyPatients + '/' + compid).map(response => response.json());
    }


    //Get Patient By BranchID 
    getBranchPatient(compid: number, brnchid) {
        return this.http.get(this.getBranchPatients + '/' + compid + '/' + brnchid).map(response => response.json());
    }


    //Get Patient By ShopID Or WarehouseID or HospitalID 
    getFirmPatient(compid: number, brnchid: number, locid: number) {
        return this.http.get(this.getFirmPatients + '/' + compid + '/' + brnchid + '/' + locid).map(response => response.json());
    }

    getPatientInfo(pid: number) {
        //Get States 
        return this.http.get(this.getPatientInfomation + '/' + pid).map(response => response.json());
    }

    sendMessageByMail(mailid: String, message: String) {
        //Get States 
        return this.http.get(this.sendmailurl + '/' + mailid + '/' + message).map(response => response.json());
    }
    createMessage(employeecreate: String) {
        let head = new Headers({ 'Content-Type': 'application/json' });
        this.http.post(this.msgUrl, employeecreate, { headers: head }).map(response => response.json())
            .subscribe(
            () => { console.log(employeecreate) }
            );
    }


    patientAlertViewByAdmin() {
        return this.http.get(this.viewUrl).map(response => response.json());
    }

    patientAlertView(comp: number, brnch: number, loc: number, locref: number) {
        return this.http.get(this.viewUrl + '/' + comp + '/' + brnch + '/' + loc + '/' + locref).map(response => response.json());
    }

    employeeDelete(empId: number) {
        return this.http.get(this.deleteUrl + '/' + empId).map(response => response.json());
    }


}




