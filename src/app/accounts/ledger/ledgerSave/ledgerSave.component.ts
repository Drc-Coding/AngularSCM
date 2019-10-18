
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';




import {ledgerSaveService} from './ledgerSave.service'  ;


import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;

import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 

import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-patientedit',
  templateUrl: './ledgerSave.component.html',
  providers: [ledgerSaveService   ,    NgbDropdownConfig  ,dateFormatPipe ]
})
export class ledgerSaveComponent implements OnInit {



          registerForm: FormGroup;
  
          ledgerno=[]  ;
    
          ledger= []  ;
    
          i;
      
          inc  =1 ;   
          selobj;     

          public data: any; 
          public rowsOnPage: number =10;
          public filterQuery: string = ""; 
          public sortBy: string = "";
          public sortOrder: string = "desc";
      
        constructor(private userService: ledgerSaveService    ,    private   dateformat: dateFormatPipe ,private formBuilder: FormBuilder ,config: NgbDropdownConfig) {
      
            config.autoClose = false;
        }
      
        ngOnInit() {
      
          
       this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     



          this.registerForm = this.formBuilder.group({
            

            ledgerid: [   , []],

              clientcdate: [ this.dateformat.transform04()   , []],

          date: [this.dateformat.transform05(Date.now())   , []],

          
          }) ;
      
  
      
      $( document ).ready(function() {
    

    
      });



      var   frmdata={ frmint1 : '' ,  frmstr1  :'' ,  frmstr2  :  this.registerForm.get('date').value   , createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.viewAccountsAll( JSON.stringify(frmdata) ).subscribe(data => {      this.ledgerno= data   },
        errorCode => console.log(errorCode));  





        
        this.data=[[],[],[],[],[],[]];
        }
           
    
    
      onSubmit(){
        
    
              
       }
    
    







  
       viewLedger() {

        var   frmdata={ frmint1 : this.registerForm.get('ledgerid').value ,   frmstr1  :'',   frmstr2  :  this.registerForm.get('date').value    , createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;

            this.userService.viewLedger(JSON.stringify(frmdata) ).subscribe(data => {this.data=data  },   // this.viewServLedger(data) 
              errorCode => console.log(errorCode));
        
        
        }
    
        
    
            viewServLedger(data : any){
 
               
              this.ledger  =[]   ;
  
              var w= 0  ;
              
        for (this.i = 0; this.i < data.length; this.i++) {
              
  
                w= 0   ;
              
           this.ledger.push({ 
             ID  :this.inc   ,
                  
             journalname: data[this.i  ][w++    ]   , 
             debitaccount: data[this.i  ][w++    ]   ,    
             creditaccount: data[this.i  ][w++    ]   ,     
             debitamount: data[this.i  ][w++    ]   ,     
             creditamount:data[this.i  ][w++    ]   ,  
                

             draccname:data[this.i  ][w++    ] ,    
             craccname:data[this.i  ][w++    ]  , 
                   
             locrefid:   this.selobj .locrefid,
             locname:  this.selobj.locname,
      
           })  ;
              
              
    this.inc +=1  ;
              
       }
              
                
              
        }
  

}