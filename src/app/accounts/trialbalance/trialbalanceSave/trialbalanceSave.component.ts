
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {trialbalanceSaveService} from './trialbalanceSave.service'  ;


import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;



import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 










 
import { AppComponent } from '../../../app.component';



@Component({
  selector: 'app-trialbalanceSave',
  templateUrl: './trialbalanceSave.component.html',
  providers: [trialbalanceSaveService   ,    NgbDropdownConfig ,NotificationsComponent  ,dateFormatPipe ]
 
})
export class trialbalanceSaveComponent implements OnInit {



          registerForm: FormGroup;
  
          i;

          selobj;     
      
        constructor(private userService: trialbalanceSaveService   ,      private   dateformat: dateFormatPipe
          ,private formBuilder: FormBuilder ,config: NgbDropdownConfig) {
      
            config.autoClose = false;
        }
      
        ngOnInit() {
  

 
          
       this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     
      
          this.registerForm = this.formBuilder.group({
           
           debitbal: [   , []],
            creditbal: [   , []],


        clientcdate: [ this.dateformat.transform04()   , []],

          date: [this.dateformat.transform05(Date.now())   , []],


            trialbal:  this.formBuilder.array([
              
              ]),

          
          }) ;
      
    
    
  
      $( document ).ready(function() {
    
    
  
      });





      var   frmdata={ frmint1 : '' ,  frmstr1  : '' ,   frmstr2  :   this.registerForm.get('date').value      , createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      
            this.userService.viewTrialBalance(JSON.stringify(frmdata)    ).subscribe(data => {  this.viewServTrialBalance(data)   },
            errorCode => console.log(errorCode));
      
        }
           
      
    

      onSubmit(){
        
            
          
       }
    
    
    
    
        
    
        viewServTrialBalance(data : any){
         
          
          const control = <FormArray>this.registerForm.controls['trialbal'];

       var drbal=0 ;       
       var crbal=0 ;

    
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
  
  
                  if(data[this.i  ][ 4] ==1 ){
  
                    crbal=0;
                    drbal=data[this.i  ][ 3] ;
  
                    drbaltot+=bal;
                    
                  }else if(data[this.i  ][ 4]==0 ){
     
                    drbal=0;
                    crbal=data[this.i  ][ 3] ;  
                
                    crbaltot+=bal;
                  }


control.push(this.formBuilder.group({


acctype: [ data[this.i  ][w++  ] , []]     ,    
accname: [ data[this.i  ][w++  ] , []]     ,     
drbalance:   [ drbal , []]     , 
crbalance:  [  crbal , []]   ,  



createdby   : [this.selobj.userid   , []], 
locrefid   : [this.selobj.locrefid, []],
locname   : [this.selobj.locname, []],

             countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],

}));


}


           this.registerForm.get('debitbal').setValue(drbaltot) ;  
            this.registerForm.get('creditbal').setValue(crbaltot) ;            
              
   }
  


   

}