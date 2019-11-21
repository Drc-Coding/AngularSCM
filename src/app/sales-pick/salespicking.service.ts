import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class salespickingService {
    private getslsord = 'api/getPLsalesorder';
    private sodetails = 'api/getPLSOdetails';
    private soproduct = 'api/getPLSIproducts';
    private empid = 'api/getPlEmpdetails';
    //Picking View
    private getViewpick = 'api/getPickListAll';
    //PickedChecking
    private getpid = 'api/getpicklist';
    private getpickdata = 'api/packingdatas';
    private getpickprod = 'api/packingfielddatas';

    private deviceurl='api/User/saveUserActivity';

    constructor(private http: Http) { }

//get salesorder Number 
getSalesorder(comrefid:any,branchrefid:any,locname:any,locrefid:any){
return this.http.get(this.getslsord + '/' + comrefid + '/' + branchrefid + '/' + locname + '/' + locrefid).map(Response => Response.json());
}

//Get Sales Order Details

getSOdetails(soid:any){
    return this.http.get(this.sodetails  + '/'  + soid).map(Response => Response.json());
}

//Get SO Product Details

GetSOproduct(soid:any){
    return this.http.get(this.soproduct + '/' + soid).map(Response =>Response.json()); 
}

//Get Employee Data

getEmployedata(comrefid:any,branchrefid:any,locname:any,locrefid:any){
    return this.http.get(this.empid + '/' + comrefid + '/' + branchrefid +'/' + locname + '/' + locrefid).map(Response =>Response.json());
}

//Save salesPick Details
Savesalespick(data:string){
    let head =new Headers({ 'Content-Type': 'application/json'});
    return this.http.post('api/savePicking', data, {headers: head}).map(Response =>Response.json());
}

//Save SalesPick Product
Savepickproduct(data:string){
    let head = new Headers({'Content-type': 'application/json'});
    return this.http.post('api/savePickingProducts',data, {headers: head}).map(Response =>Response.json());
}

// View Sales Picking Form

getViewpicking(comrefid:any,branchrefid:any,locname:any,locrefid:any){
    return this.http.get(this.getViewpick + '/' + comrefid + '/'+ branchrefid + '/' + locname + '/' + locrefid).map(Response =>Response.json());
}




//Picked Checking Form

//Get Pick id list
getPickingID(comrefid:any,branchrefid:any,locname:any,locrefid:any){
    return this.http.get(this.getpid + '/' + comrefid + '/'+ branchrefid + '/' + locname + '/' + locrefid).map(Response =>Response.json());
}


//Get Picking data
getpickingdata(cid: number, bid: number, loc: number, lrid: number,pickid: number){
    return this.http.get(this.getpickdata +'/'+cid+'/'+bid+'/'+loc+'/'+lrid+'/'+pickid).map(response => response.json());
}

//Get Picking Product
GetPickingprod(cid: number, bid: number, loc: number, lrid: number,pickid: number){
    return this.http.get(this.getpickprod +'/'+cid+'/'+bid+'/'+loc+'/'+lrid+'/'+pickid).map(response => response.json());
}

getcheckedPickingID(comrefid:any,branchrefid:any,locname:any,locrefid:any){
    return this.http.get('api/getcheckedpicklist'+ '/' + comrefid + '/'+ branchrefid + '/' + locname + '/' + locrefid).map(Response =>Response.json());
}

//Save salesPick Details
Savechecksalespick(data:string){
    let head =new Headers({ 'Content-Type': 'application/json'});
    return this.http.post('api/checksavePicking', data, {headers: head}).map(Response =>Response.json());
}

//Save SalesPick Product
Savecheckpickproduct(data:string){
    let head = new Headers({'Content-type': 'application/json'});
    return this.http.post('api/checksavePickingProducts',data, {headers: head}).map(Response =>Response.json());
}


devicedetails(data){

    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
  
    return this.http
      .post(this.deviceurl, data, options)  .map((res: Response) => res.json());  
}



}
