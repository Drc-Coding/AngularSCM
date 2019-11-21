
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators ,FormArray } from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {viewIndapprService} from  './viewIndappr.service';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { AppComponent } from '../../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';


@Component({
  selector: 'app-patientedit',
  templateUrl: './viewIndappr.component.html',
  providers: [viewIndapprService]

})
export class viewIndapprComponent  {

  public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";
  selobj ;
  
  pharmacomp: number;
  images=[] ;


  menus27=[] ;
  deviceObj: any;
  
    constructor(private userService: viewIndapprService, public menuItems: MenuItems,
      private appComponent: AppComponent,private dateformat: dateFormatPipe) {}
  
    ngOnInit() {
  
  
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     
      this.viewAll() ;
      this.menus27  =  this.menuItems.getAll()  ;

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
     
        this.userService.phcompanyView(JSON.stringify(frmdata)).subscribe(data => this.data = data,
        errorCode => console.log(errorCode));

        this.devicedetails();
        this.deviceObj.apiname="api/indappr/viewIndentConfirmAll";
        this.deviceObj.description="View All Intent Requisition";
  
        this.userService.viewdevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
   
    }
  










}
