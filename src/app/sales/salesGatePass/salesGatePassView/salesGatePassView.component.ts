
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {salesGatePassViewService} from './salesGatePassView.service'  ;
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';


@Component({
  selector: 'app-salesGatePassView',
  templateUrl: './salesGatePassView.component.html',
  providers: [salesGatePassViewService]
})
export class salesGatePassViewComponent implements OnInit {

  data = [];

  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  
  billtyperefid =1;
  selobj ;
  gifFail: boolean=true;
  viewgatepass: FormGroup;
  deviceObj: any;

    constructor(private userService: salesGatePassViewService,private formBuilder:FormBuilder,
     private appComponent: AppComponent,private dateformat: dateFormatPipe) {

      this.viewgatepass=this.formBuilder.group({
        companyid: ['', []],
        branchid: ['', []],
        locname: ['', []],
        locref: ['', []],
      });

    }
  
    ngOnInit() {

      setTimeout(() => {
        this.userService.viewDeliveryChallan(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,
          AppComponent.locrefID1, this.billtyperefid).subscribe(data => {this.data=data,this.setData(data) },
          errorCode => console.log(errorCode));
            this.gifFail=false;

            this.devicedetails();
            this.deviceObj.apiname="api/viewgatepasses";
            this.deviceObj.description="View Sales GatePass";
      
            this.userService.viewdevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
           
      },3000);


        
    }

    setData(data :any){

      if(data!=null||undefined){
        this.viewgatepass.get('companyid').setValue(data[0][0]);
        this.viewgatepass.get('branchid').setValue(data[0][1]);
        this.viewgatepass.get('locname').setValue(data[0][2]);
        this.viewgatepass.get('locref').setValue(data[0][3]);
      }
      
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
 
}