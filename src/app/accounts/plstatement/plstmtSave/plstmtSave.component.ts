
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {plstmtSaveService} from './plstmtSave.service'  ;


import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;


import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 

import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-plstmtSave',
  templateUrl: './plstmtSave.component.html',
  providers: [plstmtSaveService   ,    NgbDropdownConfig    ,NotificationsComponent  ,  dateFormatPipe]
})
export class plstmtSaveComponent implements OnInit {



         registerForm: FormGroup;

          i;
      
          selobj;     
      
        constructor(private userService: plstmtSaveService  ,    private   dateformat: dateFormatPipe  ,private formBuilder: FormBuilder   ,config: NgbDropdownConfig) {
      
            config.autoClose = false;
        }
      
        ngOnInit() {
      
     this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     


          this.registerForm = this.formBuilder.group({
          
            stkexpno: [   , []],


            netprofit: [   , []],



              clientcdate: [ this.dateformat.transform04()   , []],

          date: [this.dateformat.transform05(Date.now())   , []],

            revenue:  this.formBuilder.array([
              
              ]),

           expense:  this.formBuilder.array([
                
          ]),

            plstmt:  this.formBuilder.array([
              
              ]),


       

          
          }) ;
      
    
  
      
      $( document ).ready(function() {
    
    
      });


      
      
        var   frmdata={ frmint1 : '', frmstr1  :''   ,  frmstr2  :  this.registerForm.get('date').value     , createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      
            this.userService.viewPLAccount(JSON.stringify(frmdata)    ).subscribe(data => {  this.viewServPlStatement(data)  ,   this.viewRevExp(data)   },
            errorCode => console.log(errorCode));


        }
           

    
      onSubmit(){
        
    

          
       }
    
    viewRevExp(data : any){

                                        
      const ctrlrev = <FormArray>this.registerForm.controls['revenue'];

      const ctrlexp = <FormArray>this.registerForm.controls['expense'];
      
      var w= 0  ;
      
      var i= 0  ;


      for (this.i = 0; this.i < data.length; this.i++) {
             
        w= 1   ;  

        i= 1   ; 
         if(data[this.i ][4]==0) {
          ctrlrev.push(this.formBuilder.group({
          
        acctype: [ data[this.i  ][w++ ] , []]     ,    
        accname: [ data[this.i  ][w++ ] , []]     ,     
        balance: [ data[this.i  ][w++ ] , []]     ,     

      
      
      createdby   : [this.selobj.userid   , []], 
      locrefid   : [this.selobj.locrefid, []],
      locname   : [this.selobj.locname, []],
                   countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],
      
      
        }));
      
       }

       if(data[this.i ][4]==1) {
        ctrlexp.push(this.formBuilder.group({
        
      acctype: [ data[this.i  ][i++ ] , []]     ,    
      accname: [ data[this.i  ][i++] , []]     ,     
      balance: [ data[this.i  ][i++ ] , []]     ,     

    
    
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

  
  
    viewServPlStatement(data : any){
 

                                        
const control = <FormArray>this.registerForm.controls['plstmt'];

   
var drbaltot=0 ;
var crbaltot =0;

var  bal =0;

var w= 0  ;


for (this.i = 0; this.i < data.length; this.i++) {

   
  w= 1   ;
  
                        
          if(parseInt(data[this.i][ 3]) ){
            bal=parseInt(data[this.i][ 3]);
        
          }else{
            bal=0;
          }
                  if(data[this.i  ][ 4] == 0){
  
                    drbaltot+=bal;
                    
                  }else if(data[this.i  ][ 4]==  1){
     
  
                    crbaltot+=bal;
                  }
  

control.push(this.formBuilder.group({
    
  acctype: [ data[this.i  ][w++ ] , []]     ,    
  accname: [ data[this.i  ][w++ ] , []]     ,     
  balance: [ data[this.i  ][w++ ] , []]     ,     
  balfalg : [ data[this.i  ][w++ ] , []]     ,  


createdby   : [this.selobj.userid   , []], 
locrefid   : [this.selobj.locrefid, []],
locname   : [this.selobj.locname, []],



}));


}


this.registerForm.get('netprofit').setValue(drbaltot-crbaltot) ;        
              
   }
  

}