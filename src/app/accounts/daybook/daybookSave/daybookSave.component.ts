
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {daybookSaveService} from './daybookSave.service'  ;
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';




import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 


import { AppComponent } from '../../../app.component';





import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;

@Component({
  selector: 'app-daybookSave',
  templateUrl: './daybookSave.component.html',
  providers: [daybookSaveService , NgbDropdownConfig ,NotificationsComponent , dateFormatPipe]
})
export class daybookSaveComponent implements OnInit {



          registerForm: FormGroup;
  
          daybook= []  ;
    
          i;
      
          inc  =1 ;   
          selobj;     
      
        constructor(private userService: daybookSaveService   ,    private   dateformat: dateFormatPipe   ,private formBuilder: FormBuilder ,config: NgbDropdownConfig) {
      
            config.autoClose = false;
        }
      
        ngOnInit() {
      
          
          var  date  =this.dateformat.transformnew(Date.now()) ;

          this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     
        
        
          this.registerForm = this.formBuilder.group({
            
     
  
    
    
            stkexpno: [   , []],


          clientcdate: [ this.dateformat.transform04()   , []],

          date: [this.dateformat.transform05(Date.now())   , []],


            daybook:  this.formBuilder.array([
              
              ]),
          
          }) ;
      
    


       
  
      
      $( document ).ready(function() {
    
    

    
      });
      
 
           








                       



        var   frmdata={ frmint1 : '',   frmstr1  :'2016-01-05' , createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      
            this.userService.viewdayBook(JSON.stringify(frmdata)    ).subscribe(data => {  this.viewServdayBook(data)  },
            errorCode => console.log(errorCode));


        }
           
      
    
    
    
      onSubmit(){
        
    

            
          
       }
    

























































   
   viewdayBook(){


        var   frmdata={ frmint1 : '' ,   frmstr1:    this.registerForm.get('date').value   , createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      
            this.userService.viewdayBook(JSON.stringify(frmdata)  ).subscribe(data => {  this.viewServdayBook(data)        },
            errorCode => console.log(errorCode));


}
     

     
    
            viewServdayBook(data : any){           

                                      
const control = <FormArray>this.registerForm.controls['daybook'];

var i= 0  ;


for (this.i = 0; this.i < data.length; this.i++) {

  i= 0  ;

control.push(this.formBuilder.group({
  debitaccount: [ data[this.i  ][i++ ] , []]     ,    
  creditaccount: [ data[this.i  ][i++ ] , []]     ,     
  debitamount:[ data[this.i  ][i++ ] , []]     , 
  creditamount: [ data[this.i  ][i++ ] , []]     ,     
  draccname:[ data[this.i  ][i++ ] , []]     , 
  craccname:[ data[this.i  ][i++ ] , []]     , 



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