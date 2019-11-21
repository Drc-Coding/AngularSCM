
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {challanViewService} from './challanView.service'  ;
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';

@Component({
  selector: 'app-deliveryChallan',
  templateUrl: './challanView.component.html',
  providers: [challanViewService]
})
export class challanViewComponent implements OnInit {

  data = [];
  
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  
  selobj ;
  gifFail: boolean=true;
  viewdelreceipt: FormGroup;
  deviceObj: any;

    constructor(private userService: challanViewService,private formBuilder:FormBuilder,
    private appComponent: AppComponent,private dateformat: dateFormatPipe) {

      this.viewdelreceipt=this.formBuilder.group({
        companyid: ['', []],
        branchid: ['', []],
        locname: ['', []],
        locref: ['', []],
      });

    }
  
    ngOnInit() {
  
    setTimeout(() => {
        this.userService.viewDeliveryChallan(AppComponent.companyID,AppComponent.branchID,
          AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data=data,this.setData(data) },
          errorCode => console.log(errorCode));
          this.gifFail=false;

          this.devicedetails();
          this.deviceObj.apiname="api/viewdeliverychallan";
          this.deviceObj.description="View Stock Trans Delivery Challan";
  
          this.userService.viewdevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});

        },3000);
        
    }
  
  
    setData(data :any){

      if(data!=null||undefined){
        this.viewdelreceipt.get('companyid').setValue(data[0][1]);
        this.viewdelreceipt.get('branchid').setValue(data[0][2]);
        this.viewdelreceipt.get('locname').setValue(data[0][3]);
        this.viewdelreceipt.get('locref').setValue(data[0][4]);
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