import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class EmployeeService{

  handleError: any;
  headers: any;
  //Add Employee
  private createEmp = 'api/empcreateRecord';
  private getCompanies = 'api/getEmpCompany';
  private getBranches = 'api/getEmpBranch';
  private getShops = 'api/getEmpShops';
  private getWarehouses = 'api/getEmpWareHouses';
  private getHospitals = 'api/getEmpHospitals';
  private getFirm = 'api/getEmpFirm';
  private isEmployeeExistUrl = 'api/isEmployeeExist';


  private editUrl = 'api/editEmployee';


  //utility
  private getCompanyById='api/getUtilityCompany';
  private getBranchById="api/getUtilityBranch";
  //
  private getusershopurl = 'api/getusershop';
  private getuserwarehousesurl = 'api/getuserwarehouse';
  private getuserhospitalurl = 'api/getuserhospital';
  //Edit Employee

  private updateEmp = 'api/updateEmployee';
  private getEmpBranchById = 'api/getEmpBranchById';
  private getEmpCompanyById = 'api/getEmpCompanyById';
  private getEditEmpFirmByID='api/getEditEmpFirm';
  private getEmpLocname = 'api/getEmpLocationid';
  private getEmpShopById = 'api/getEmpShopById';
  private getEmpWareById = 'api/getEmpWarehouseById';
  private getEmpHospById = 'api/getEmpHospitalById';
  //private getBranchById = '/api/getBranchById';
  private editBranchUrl = 'api/geteditBranch';
  private isEmployeeUpdateExistUrl = 'api/isEmployeeUpdateExist';

  
  //View Employee

  private viewUrl='api/viewEmployee';
  private viewUrlbyid='api/viewEmployeebyid';
  private deleteUrl='api/deleteEmployee';

  constructor(private http: Http) {}

   getCompany() {
    //Get Companies
    return this.http.get(this.getCompanies).map(response => response.json());
   }


   getCompanyByLogin(id:number) {
    //Get Companies
    return this.http.get(this.getCompanyById+'/'+id).map(response => response.json());
   }

   getEmpBranch(id: number) {
    //Get Companies
    return this.http.get(this.getEmpBranchById + '/' + id).map(response => response.json());
   }


   // Get Branch By Company
   getBranche(compid: number) {
    return this.http.get(this.getBranches + '/' + compid).map(response => response.json());
   }
   
   //
   getUserShop(id: number) {
    //Get States 
    return this.http.get(this.getusershopurl + '/'+ id).map(response => response.json());
   }

   getUserWareHouse(id: number) {
    //Get States 
    return this.http.get(this.getuserwarehousesurl +'/'+ id).map(response => response.json());
  }

  getUserHospital(id: number) {
   //Get States 
   return this.http.get(this.getuserhospitalurl+'/'+ id).map(response => response.json());
  }


   

  //
   getShop(branchid: number) {
    //Get States 
    return this.http.get(this.getShops + '/'+ branchid).map(response => response.json());
   }

   getWareHouse(branchid: number) {
    //Get States 
    return this.http.get(this.getWarehouses +'/'+ branchid).map(response => response.json());
  }

  getHospital(branchid: number) {
   //Get States 
   return this.http.get(this.getHospitals+'/'+ branchid).map(response => response.json());
  }

   getEditEmpFirm(id: number) {
    //Get States 
    return this.http.get(this.getEditEmpFirmByID + '/' + id).map(response => response.json());
   }


    getEmpFirm(loc: number,locref) {
    //Get States 
    return this.http.get(this.getFirm + '/' + loc+'/'+locref).map(response => response.json());
   }

   

   isExistEmployee(empname: any){
    //Get States 
    return this.http.get(this.isEmployeeExistUrl + '/' +empname).map(response => response.json());
  }

  createEmployee(employeecreate: String) {
    let head = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.createEmp, employeecreate, {headers: head}).map((res:Response)=>{
      return {"res":res.json()}
    })         
  }


  //Employee Edit

  updateEmployee(employeeUpdate: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    this.http.post(this.updateEmp, employeeUpdate, { headers: head }).map(response => response.json())
      .subscribe(
      () => { console.log(employeeUpdate) }
      );
  }


  employeeEdit(id: number) {
    return this.http.get(this.editUrl + '/' + id)
      .map((res: Response) => res.json());
  }

  getEmpCompany(id: number) {
    //Get Companies
    return this.http.get(this.getEmpCompanyById + '/' + id).map(response => response.json());
  }


  getLocname(id: number) {
    //Get Companies
    return this.http.get(this.getEmpLocname + '/' + id).map(response => response.json());
  }
 
  getEmpShop(id: number) {
    //Get Companies
    return this.http.get(this.getEmpShopById + '/' + id).map(response => response.json());
  }

  getEmpWare(id: number) {
    //Get Companies
    return this.http.get(this.getEmpWareById + '/' + id).map(response => response.json());
  }

  getEmpHosp(id: number) {
    //Get Companies
    return this.http.get(this.getEmpHospById + '/' + id).map(response => response.json());
  }

  
  getBranch(id: number) {
    //Get Companies
    return this.http.get(this.getBranches + '/' + id).map(response => response.json());
  }

  isEditExistEmployee(empname: any, empid: number,cmpid:any,brnid:any,locid:number,locrefname:number) {
    //Get States 
    return this.http.get(this.isEmployeeUpdateExistUrl + '/' + empname + '/' + empid+'/'+cmpid+'/'+brnid+'/'+locid+'/'+locrefname).map(response => response.json());
  }

//View Employee
   employeeView() {
    return this.http.get(this.viewUrl).map(response => response.json());
   }

   employeeViewByID(compid: any,branchid: any,locname:any, locrefid:any) {
    return this.http.get(this.viewUrlbyid+'/'+compid+'/'+branchid+'/'+locname+'/'+locrefid).map(response => response.json());
   }
 
   employeeDelete(empId: number) {  
     return this.http.get(this.deleteUrl+'/'+empId).map(response => response.json());
   }


   savePresImage(serobj: FormData) {
    let header = new Headers();
    let options = new RequestOptions({headers: header});

         return this.http.post( this.createEmp+`saveSIPresImage`, serobj, options) 
         .map((res: Response) => res.text() ) ;
    
  }
 

}
