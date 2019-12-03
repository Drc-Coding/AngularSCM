import { Component, OnInit } from "@angular/core";

import { FormBuilder } from "@angular/forms";
import { AppComponent } from "app/app.component";
import { ViewWarehouseServices } from "./viewwarehouse.service";





@Component({

  selector: 'app-warehouseview',
  templateUrl: 'viewwarehouse.component.html',
  providers: [ViewWarehouseServices]
})
export class ViewWarehouseComponent implements OnInit {




  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";


  selobj;



  constructor(private viewWarehouseServices: ViewWarehouseServices, private formbuilder: FormBuilder) {

  }


  ngOnInit() {

    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid: AppComponent.branchID };



    this.viewWareHouse();


  }




  viewWareHouse() {




    var frmdata1 = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, 
    companyrefid:this.selobj.companyid, locname: this.selobj.locname, branchrefid:this.selobj.branchid };



    // var frmdata1 = {
    //   frmint1: '', frmstr1: '', createdby: '', locrefid: 1,
    //   companyrefid: 1, locname: 1, branchrefid: 1
    // };

    this.viewWarehouseServices.viewWareHouse(JSON.stringify(frmdata1)).subscribe(data => { this.data = data, alert(data) },


      errorCode => console.log(errorCode));




  }








}