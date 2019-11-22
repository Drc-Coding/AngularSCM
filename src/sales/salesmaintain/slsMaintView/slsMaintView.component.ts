
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import { slsMaintViewService } from './slsMaintView.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-slsMaintView',
  templateUrl: './slsMaintView.component.html',
 providers: [slsMaintViewService]
 
})
export class slsMaintViewComponent implements OnInit {


  registerForm: FormGroup;

   datall = [];

   customers=[] ;
  
    selobj ;
    constructor(private userService: slsMaintViewService ,private formBuilder: FormBuilder ) {}
  
    ngOnInit() {
  
    
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     

      this.registerForm = this.formBuilder.group({

                  todeptname: [ , []],
        
                  inv: [ , []], 
                  customerrefid: [ , []], 
       
                   autonamenew: [ , []],
        
                }) ;

  
                var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
                this.userService.viewSalesInvoiceAll(JSON.stringify(frmdata)).subscribe(data => this.datall = data,
                  errorCode => console.log(errorCode));

                  this.userService.viewCustomers(JSON.stringify(frmdata)).subscribe(data => this.customers = data,
                    errorCode => console.log(errorCode));

                    this.registerForm.get('inv').setValue(1) ;
  
    }
  
  
  



        viewSalesInvView() {
      
            var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
            if(this.registerForm.get('inv').value==1 ){

              this.userService.viewSalesInvoiceAll(JSON.stringify(frmdata)).subscribe(data => this.datall = data,
                errorCode => console.log(errorCode));
            }else if(this.registerForm.get('inv').value==2){

              this.userService.viewSalesDummyAll(JSON.stringify(frmdata)).subscribe(data => this.datall = data,
                errorCode => console.log(errorCode));
            }
 
    
        }

        viewSalesView() {
          
                    var   frmdata={ frmint1 : this.registerForm.get('customerrefid').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
         
                             if(this.registerForm.get('inv').value==1 ){
                  
                                this.userService.viewSalesInvCustAll(JSON.stringify(frmdata)).subscribe(data => this.datall = data,
                                  errorCode => console.log(errorCode));
                              }else if(this.registerForm.get('inv').value==2){
                  
                                this.userService.viewSalesDumCustAll(JSON.stringify(frmdata)).subscribe(data => this.datall = data,
                                  errorCode => console.log(errorCode));
                              }
        
         }





}