import { Component, OnInit } from "@angular/core";
import { ViewShipmentServices } from "./viewShipment.component.services";
import { FormBuilder } from "@angular/forms";
import { AppComponent } from "app/app.component";





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



    constructor(private viewShipmentServices:ViewShipmentServices, private formbuilder: FormBuilder ){

    }


    ngOnInit(){

        this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid:AppComponent.branchID };



    this.viewShipp();   
    
    
    }




    viewShipp(){


        
      var frmdata1 = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, 
      companyrefid:this.selobj.companyid, locname: this.selobj.locname, branchrefid:this.selobj.branchid };
      
      setTimeout(() => {
      this.viewShipmentServices.viewShipp(JSON.stringify(frmdata1)).subscribe(data => { this.data = data },
        errorCode => console.log(errorCode));
        
        this.gifFail=false;
      },3000);

    }







    
}