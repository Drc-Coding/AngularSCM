import { Component, OnInit } from "@angular/core";
import { ViewShipmentServices } from "./viewShipment.component.services";
import { FormBuilder } from "@angular/forms";
import { AppComponent } from "app/app.component";
import { dateFormatPipe } from "app/notifications/notifications.datepipe";


@Component({

    selector: 'app-shipmentview',
    templateUrl: 'viewShipment.component.html',
    providers: [ViewShipmentServices]
})
export class ViewShipmentComponent implements OnInit{

  public data= [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";

    selobj;
  gifFail: boolean=true;
  deviceObj: any;



    constructor(private viewShipmentServices:ViewShipmentServices, private formbuilder: FormBuilder,
      private appComponent: AppComponent, private dateformat: dateFormatPipe){

    }


    ngOnInit(){

        this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid:AppComponent.branchID };



    this.viewShipp();   
    
    
    }


    
              
  devicedetails(){

    this.deviceObj = {

        userid: AppComponent.userID,
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,
        clientcdate:this.dateformat.transform04(),
        ipaddress: this.appComponent.ipAddress, 
        browsertype: this.appComponent.browser,
        ostype: this.appComponent.os,
        osversion: this.appComponent.osversion,
        devicetype: this.appComponent.devicetype,
        description:'',
        apiname:''

      };
  
}



    viewShipp(){

      var frmdata1 = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, 
      companyrefid:this.selobj.companyid, locname: this.selobj.locname, branchrefid:this.selobj.branchid };
      
      setTimeout(() => {
      this.viewShipmentServices.viewShipp(JSON.stringify(frmdata1)).subscribe(data => { this.data = data },
        errorCode => console.log(errorCode));
        
        this.gifFail=false;

        this.devicedetails();
        this.deviceObj.apiname="api/shi/saveShipping";
        this.deviceObj.description="View Shipment Details";
      
        this.viewShipmentServices.viewdevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
        
      },3000);

    }







    
}