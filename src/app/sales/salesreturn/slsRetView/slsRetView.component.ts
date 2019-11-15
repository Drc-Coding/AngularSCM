
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {slsRetViewService} from './slsRetView.service'  ;
import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ;
import { AppComponent } from '../../../app.component';



@Component({
  selector: 'app-slsRetView',
  templateUrl: './slsRetView.component.html',
  providers: [slsRetViewService]
})
export class slsRetViewComponent implements OnInit {



   public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";

  

  pharmacomp = [];
  
  selobj ;
  gifFail: boolean=true;
  deviceObj: any;

    constructor(private userService: slsRetViewService,private appComponent: AppComponent,
      private dateformat: dateFormatPipe) {}
  
    ngOnInit() {
  
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
      this.viewAll() ;
  
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

  
      viewAll() {
  

        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
        setTimeout(() => {
      this.userService.phcompanyView(JSON.stringify(frmdata)  ).subscribe(data => {this.data = data },
        errorCode => console.log(errorCode));
        this.gifFail=false;
      },3000);

      this.devicedetails();           
      this.deviceObj.apiname="api/slsretn/viewSalesReturnAll";
      this.deviceObj.description="View SalesReturn";
     
      this.userService.viewdevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
   
    }
  

}