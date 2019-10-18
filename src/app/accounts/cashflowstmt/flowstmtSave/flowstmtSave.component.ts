
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {flowstmtSaveService} from './flowstmtSave.service'  ;


import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;



import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 


import { AppComponent } from '../../../app.component';




@Component({
  selector: 'app-flowstmtSave',
  templateUrl: './flowstmtSave.component.html', 
  providers: [flowstmtSaveService   ,    NgbDropdownConfig   ,NotificationsComponent  ,   dateFormatPipe   ]
})
export class flowstmtSaveComponent implements OnInit {



          registerForm: FormGroup;
  
    
          i;
        
          selobj;     
      
        constructor(private userService: flowstmtSaveService  ,    private   dateformat: dateFormatPipe  ,private formBuilder: FormBuilder ,config: NgbDropdownConfig) {
      
            config.autoClose = false;
        }
      
        ngOnInit() {
      
             this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     
          
          this.registerForm = this.formBuilder.group({
            
            dist   : [   , []],
  
            stkexpno: [   , []],


              clientcdate: [ this.dateformat.transform04()   , []],

          date: [this.dateformat.transform05(Date.now())   , []],

            flowstmt:  this.formBuilder.array([
              
              ]),
          
          
          }) ;
     
  
      
      $( document ).ready(function() {
    
    

    
      });
      
 



      

        var   frmdata={ frmint1 : '',   frmstr1  :''   ,  frmstr2  :  this.registerForm.get('date').value    , createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      
            this.userService.viewCashFlowStmt(JSON.stringify(frmdata)    ).subscribe(data => {  this.viewServCashFlowStmt(data)  },
            errorCode => console.log(errorCode));


        }
           
      
    
    
    
      onSubmit(){
        
    

            
          
       }
    

        
    
      viewServCashFlowStmt(data : any){
              

                                              
const control = <FormArray>this.registerForm.controls['flowstmt'];
var w= 0  ;


for (this.i = 0; this.i < data.length; this.i++) {
  
  w= 1  ;
  

control.push(this.formBuilder.group({

  acctype: [ data[this.i  ][w++ ] , []]   ,    
  accname: [ data[this.i  ][w++ ] , []]   ,     
  balance: [ data[this.i  ][w++ ] , []]   , 


createdby   : [this.selobj.userid   , []], 
locrefid   : [this.selobj.locrefid, []],
locname   : [this.selobj.locname, []],
             countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],


}));


}

  }
  
}