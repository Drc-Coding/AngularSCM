import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Subscriber } from 'rxjs';


@Injectable()
export class PrescUploadService{

    private patientid = 'api/getpatientid';
    private patientdetail = 'api/patientdetails';
    private doctor = 'api/doctordetail';
    private employee= 'api/getemployees';
    private getprods='api/getpresproducts';
    private ordertype='api/getordertype';

    private viewpresc = 'api/getprescview';
    private prescimage = 'api/getsendprescriptionImage';
    private signimagereceive = 'api/getempsignImage';
   
    constructor(private http:Http){ }

    //Get Patient Id and Name
    getpatientid(companyrefid:number,branchrefid:number,locname:number,locrefid:number){
        return this.http.get(this.patientid  + '/' + companyrefid + '/' + branchrefid + '/' + locname + '/' + locrefid).map(Response => Response.json());

    }

    //Get Patient Mobile No and Gender
    getpatiendetails(patientid:number, companyrefid:number, branchrefid:number, locnanme:number, locrefid:number){
        return this.http.get(this.patientdetail + '/' + patientid + '/' + companyrefid + '/' + branchrefid + '/' + locnanme + '/' + locrefid).map(Response => Response.json());
    }

    //Get Doctor Details
    getdoctor(companyrefid:number, branchrefid:number, locname:number, locrefid:number){
        return this.http.get(this.doctor + '/' + companyrefid + '/' + branchrefid + '/' + locname + '/' + '/' + locrefid).map(Response => Response.json());

    }
    
    //Get Order Type
    GetOrderType(){
        return this.http.get(this.ordertype ).map(Response =>Response.json());
    }
    //Get Employee
    getemployee(companyrefid:number, branchrefid:number, locname:number, locrefid:number){
        return this.http.get(this.employee + '/' + companyrefid + '/' + branchrefid + '/' + locname + '/' + '/' + locrefid).map(Response => Response.json());

    //Search Product
    }
    getsearchproduct(cid: number, bid: number, loc: number, lrid: number,val:any) {
        return this.http.get('api/getprescprodetail' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid+'/'+val).map(response => response.json());
      }

    //Get Product
      Getproductdetails(productid:number){
          return this.http.get(this.getprods + '/' + productid).map(Subscriber => Subscriber.json());
      }

    //Save Prescription Data
      SavePrescUpload(data:string){
        let head =new Headers({ 'Content-Type': 'application/json'});
        return this.http.post('api/createPrescriptionRecord', data, {headers: head}).map(Response =>Response.json());
    }
    
    //Save Presc Product
    SavePresProduct(data:string){
        let head = new Headers({'Content-type': 'application/json'});
        return this.http.post('api/savepresproduct',data, {headers: head}).map(Response =>Response.json());
    }
    //Save Prescription Image
    SavePresImg(image){
        return this.http.post('api/saveprescriptionimage',image).map(Response =>Response.json());
    }


    //View Upload Prescription
    getPresccdetails(comrefid:any,branchid:any,locnanme:any,locrefid:any){
        return this.http.get(this.viewpresc + '/' + comrefid + '/' + branchid + '/' + locnanme + '/' + locrefid).map(Subscriber =>Subscriber.json());
    }

    getprescimage(prescid:any){
        return this.http.get(this.prescimage + '/' + prescid).map(Subscriber =>Subscriber.json())
    }


    //show emp sign
    showempsign(id: number) {
        //Get userimage
        return this.http.get(this.signimagereceive+'/'+id).map(response => response.json());
       }

    }

