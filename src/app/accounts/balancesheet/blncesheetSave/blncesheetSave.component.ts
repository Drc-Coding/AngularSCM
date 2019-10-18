
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {blncesheetSaveService} from './blncesheetSave.service'  ;


import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;


import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 


import { AppComponent } from '../../../app.component';





@Component({
  selector: 'app-blncesheetSave',
  templateUrl: './blncesheetSave.component.html',
 
providers: [blncesheetSaveService   ,    NgbDropdownConfig  ,NotificationsComponent  , dateFormatPipe ]
})
export class blncesheetSaveComponent implements OnInit {


           registerForm: FormGroup;
  

          i;
      
          selobj;     
      



        constructor(private userService: blncesheetSaveService  ,    private   dateformat: dateFormatPipe   ,private formBuilder: FormBuilder ,config: NgbDropdownConfig) {
      
            config.autoClose = false;
        }
      
        ngOnInit() {
      


     this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     
        
          this.registerForm = this.formBuilder.group({
            
        
            dist   : [   , []],
    
    
            stkexpno: [   , []],

         

            clientcdate: [ this.dateformat.transform04()   , []],

            date: [this.dateformat.transform05(Date.now())   , []],

            balsheet:  this.formBuilder.array([
              
              ]),
          
          }) ;
      
    
           

      
      $( document ).ready(function() {
    
    
    
              
      
    
      });




      
         var   frmdata={ frmint1 : '' ,  frmstr1  : ''  ,  frmstr2  :  this.registerForm.get('date').value  ,createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      
            this.userService.viewBalanceSheet(JSON.stringify(frmdata)    ).subscribe(data => {  this.viewServBalanceSheet(data)    },
            errorCode => console.log(errorCode));

        }
           
      
    
      onSubmit(){
        
    
 
       }
    
    
        
    
    
        viewServBalanceSheet(data : any){
       
          var crbal ;
          
         var drbal ;
   
  
              var w= 0  ;
                                             
const control = <FormArray>this.registerForm.controls['balsheet'];

for (this.i = 0; this.i < data.length; this.i++) {

                           w= 1  ; 
  
                              if(data[this.i  ][ 4] ==1){
                    
                                      crbal=0;
                                      drbal=data[this.i  ][ 3] ;
                                      
                                    }else if(data[this.i  ][ 4]==0){
                       
                                      drbal=0;
                                      crbal=data[this.i  ][ 3] ;  
                                    }

                                    


control.push(this.formBuilder.group({

salesprdtid:  [ , []] ,
     
acctype: [ data[this.i  ][w++ ] , []]   ,    
accname:  [ data[this.i  ][w++ ] , []]  ,     
drbalance:   [drbal , []]  , 
crbalance:   [ crbal, []],   

              
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