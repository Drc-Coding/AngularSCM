
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {stktransMaintService} from './stktransMaint.service'  ;

import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-stktransMaint',
  templateUrl: './stktransMaint.component.html',
   providers: [stktransMaintService]


 
})
export class stktransMaintComponent implements OnInit {


  registerForm: FormGroup;

  destination = [];


  pharmacomp = [];
  
  selobj ;
    constructor(private userService: stktransMaintService   ,private formBuilder: FormBuilder  ) {}
  
    ngOnInit() {
  

     this.registerForm = this.formBuilder.group({

         
          tolocname    : [   , []],
          tolocrefid   : [   , []],


        }) ;

  
  
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     

     this.pharmacomp=[[],[],[],[],[],[]];
  
    }
  
  
  
      viewAll() {
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname     , companyid  :this.selobj.companyid } ;
      this.userService.viewIndentreq(JSON.stringify(frmdata)).subscribe(data => this.pharmacomp = data,
        errorCode => console.log(errorCode));

      }



 viewDestination(){

       var destid=0  ;


       
       destid =this.registerForm.get('tolocname').value  ;

       if(destid==2){
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;
        this.userService.viewWareHouse(JSON.stringify(frmdata)).subscribe(data => {this.destination=data},
        errorCode => console.log(errorCode));

       }else if(destid==1){
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;
        this.userService.viewshopinformation(JSON.stringify(frmdata)).subscribe(data => {this.destination=data},
          errorCode => console.log(errorCode));


       }else if(destid==3){
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;
        this.userService.viewHospital(JSON.stringify(frmdata)).subscribe(data => {this.destination=data},
          errorCode => console.log(errorCode));
        
        
      }  


  }
 
 viewIndentRequest(){

 //  var   frmdata={ frmint1 : this.registerForm.get('tolocname').value ,frmint2 : this.registerForm.get('tolocrefid').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;


 var   frmdata={ frmint1 :  0  ,frmint2 : 0 ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname , companyid  :this.selobj.companyid    } ;


  this.userService.viewIndentReqSelect(JSON.stringify(frmdata)).subscribe(data => {this.pharmacomp = data  },
    errorCode => console.log(errorCode));


 }



}