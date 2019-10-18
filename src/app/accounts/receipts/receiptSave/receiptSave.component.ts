












import {Component, OnInit  ,ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators  , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {receiptSaveService} from './receiptSave.service'   ;



import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;


import { DxDataGridComponent } from "devextreme-angular";

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 


import { AppComponent } from '../../../app.component';



@Component({
  selector: 'app-receiptSave',
  templateUrl: './receiptSave.component.html',
 
  providers: [receiptSaveService,NgbDropdownConfig ,NotificationsComponent ,dateFormatPipe  ]
 
  

})
export class receiptSaveComponent implements OnInit {

  
             registerForm: FormGroup;
        
      
               i;

        
              autoincr  ;
               
              autoval =  0    ;
                      
              autoinc =  0    ;
              autodata= []   ;
  
     
              selobj ;
  
    

              acctypeflag=0;

           accounts  ;
        tempdata=[[],[],[],[],[],[],[],[] ]  ;
      
        constructor(private userService: receiptSaveService ,    private   dateformat: dateFormatPipe , private notificationsComponent:NotificationsComponent ,private formBuilder: FormBuilder ,config: NgbDropdownConfig) {
      
            config.autoClose = false;
        }
      
        ngOnInit() {
      
                this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     

          this.registerForm = this.formBuilder.group({
      
  
            autonamenew:[ , []]   ,

  
            typeflag :[ , []]   ,

            paymenttype:  [, []]  ,
            ptrefno :  [, []]  ,
            

             
        journalno:  [  , []], 
 
        dummy1	: [ , []] ,
        debitaccount	: [ , []] ,
        creditaccount	: [ , []] ,
    
        debitamount	: [ , []] ,
        creditamount	: [ , []] ,
        draccname	: [ , []] ,
        craccname	: [ , []] ,
        invoiceno	: [ , []] ,
  
        invoicebalamt	: [ , []] ,
   
 
        cashflag 	: [ , []] ,
        jrnlname 	: [ , []] ,
        bulkflag 	: [ , []] ,
    calcflag: [ 0  , []]   ,


       debitaccountemp	: [ , []] ,
        creditaccountemp	: [ , []] ,
        accdispflag :  [1, []]  ,

           clientcdate: [ this.dateformat.transform04()   , []],
               clientcdate1: [ this.dateformat.transform04()   , []],
                createdby  :   [ this.selobj.userid , []]        ,
                locrefid:   [this.selobj.locrefid  , []]        ,
                locname:     [this.selobj.locname , []]        ,
                 countryrefid: [ this.selobj.countryrefid  , []],
                companyrefid: [ this.selobj .companyid , []],
               branchrefid: [ this.selobj .branchrefid , []],

               jrnltype : [ 5 , []]  , 

            date: [this.dateformat.transform05(Date.now())   , []],



            invoicename : [ , []] ,

            personname : [ , []] ,
            invoicetype: [ , []] , 
        //    journal : this.formBuilder.array([
          
         //    ]),
          
          }) ;
      
      

      
      
      
      $( document ).ready(function() {
    
      $(".autolistall1").hide()   ;
      });
      

      this.registerForm.get('typeflag').setValue(1);
      this.viewLoadDefault();

       var   frmdata={ frmint1 :  '' ,frmint2 : '',  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
       


       this.userService.viewAccountsAll(JSON.stringify(frmdata) ).subscribe(data => {   this.accounts= data    },
        errorCode => console.log(errorCode)); 

        }
          
      
    
  
        
  
  
     autofocusin(){
      
      
      
           this.autoincr = setInterval(() => {
      
              if(this.registerForm.get('autonamenew').value){
      
                $('#autolist').show()   ;
         
                
                if(this.autoval== this.registerForm.get('autonamenew').value){
                  
                         
                          this.autoinc+= 1 ;
                          
                  
                  } else{
                  
                          this.autoinc = 0  ;
                  }
                        
           
                  this.autoval= this.registerForm.get('autonamenew').value  ;
      
               if(this.autoinc<1 ){
           
      
                var   frmdata={ frmint1 : '' ,  frmstr1  :this.registerForm.get('autonamenew').value, createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
             
          

              if(this.registerForm.get('typeflag').value==1 ){

               
                this.userService.viewSalesInvoiceNo(JSON.stringify(frmdata) ).subscribe(data => {      this.autodata= data      },
                  errorCode => console.log(errorCode));  
               }else if(this.registerForm.get('typeflag').value== 2 ){
      
                this.userService.viewPurchaseReturnNo(JSON.stringify(frmdata) ).subscribe(data => {      this.autodata= data    },
                  errorCode => console.log(errorCode));  
               }
      
                  }
      
          
              }
              
            }, 610);
      
          
          }
      
      
        
          autofocusout(){
      
       
            if(this.registerForm.get('autonamenew').value) {
         
          
            } else{
      
          //    $('#autolist').hide() ;
            }
            clearInterval( this.autoincr );
                    
             }
      
      
      
      
                autokeyselect(event: KeyboardEvent,articleId: number){
          
            
                var nr: number;
             
                if(event.keyCode == 13){
                
                var  id =   this.autodata[articleId][0]  ;
           
                var   frmdata={ frmint1 : id ,frmint2 : '',  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
    
        

                     if(this.registerForm.get('typeflag').value==1 ){
                      this.userService.viewSalesInvoice(JSON.stringify(frmdata)).subscribe(data => {this.viewServInvoiceAmt(data)},
                      errorCode => console.log(errorCode)  );
                 
                     }else if(this.registerForm.get('typeflag').value==2){
            
                      this.userService.viewPurchaseReturn(JSON.stringify(frmdata)).subscribe(data => {this.viewServInvoiceAmt(data)},
                      errorCode => console.log(errorCode)  );
               
                     }


      
                   $("#autoname").focus();
               
                   this.registerForm.get('autonamenew').setValue('')  ;
      
                   this.autodata=[]  ;
               }
        
            
      
              }
  
  
  
      
        
  
  
  
  
  
  
      onSubmit(){


        
      var answer =  confirm("Save data?");
          


    if (answer) { 
  
  
      this.userService.saveReceipt(JSON.stringify(this.registerForm.value)).subscribe(data => {  this.savevalid(data)   },
      errorCode => console.log(errorCode));
     
            
    }
          }
      

          savevalid(data:any){
            if(data==1){ 
            
                  this.notificationsComponent.addToast({title:'Success', msg:'Data  Saved  ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
         
                  this.clear() ;
         
                }else{
          
              this.notificationsComponent.addToast({title:'Error', msg:'Data Not  saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
          
            }
              }
              
    viewLoadDefault() {
 
        var data;
    
    
         if(this.registerForm.get('typeflag').value==1 ){
            this.registerForm.get('accdispflag').setValue(1) ;

          data=[[3,2 ,'Cash','Acc Receivable']]  ;
         }else if(this.registerForm.get('typeflag').value==2){
              this.registerForm.get('accdispflag').setValue(1) ;


          data=[[3,2 ,'Cash','Acc Receivable']]  ;
         } else if(this.registerForm.get('typeflag').value==3){

              this.registerForm.get('accdispflag').setValue(2) ;


          data=[[0,0,0,0]]  ;
         }
       
      
          for (this.i = 0; this.i < data.length; this.i++) {
      
      

                this.registerForm.patchValue({
                          
                  debitaccount:  data[0 ][0    ]  ,    
                  creditaccount: data[0 ][1    ] ,     
             
                  draccname: data[0 ][2    ] ,    
                  craccname:  data[0 ][3    ]  , 
                  calcflag:0    ,
                  jrnltype :  5  , 
                  jrnlname 	: 'Receipt' ,
           });  
      


      
          }
      
      
      
        
        }
      
  

  
    
    viewServInvoiceAmt(data:any) {
  


          this.registerForm.patchValue({
                          
                  invoiceno:  data[0 ][0    ]  ,    
                  invoicename: data[0 ][1    ] ,     
             
                  debitamount: data[0 ][2    ] ,    
                  creditamount:  data[0 ][2    ]  , 
                  invoicebalamt:data[0][2 ]   ,
                  personname : data[0][3 ]  , 
                
           });




   if(this.registerForm.get('typeflag').value==1 ){

     
        this.registerForm.patchValue({
           
                  invoicetype: 1 ,    
                  personid: data[0 ][4    ] ,     
                  persontype: 1,    
                
           });



     }else if(this.registerForm.get('typeflag').value==2 ){



          this.registerForm.patchValue({
           
                  invoicetype: 4 ,    
                  personid: data[0 ][4    ] ,     
                  persontype: 2,    
                
           });


     }



    }
    
  
  
  viewServAccount(data:any)  {

  
  

     if(this.acctypeflag==0){

           this.registerForm.patchValue({
           
                  debitaccount: data[0][0 ] ,    
                  draccname: data[0 ][2    ] ,     
              

           });
     }

 
     if(this.acctypeflag==1){
      
         
           this.registerForm.patchValue({
           
                  creditaccount: data[0][0 ] ,    
                  craccname: data[0 ][2    ] ,     
              

           });
      }


  

  
  }
    

  



      validnew():Number{
        var  valflag =0 ;
      
      
         return   valflag;
      
      }




   clear(){
    
      this.ngOnInit() ;
    }

    
    



    
    viewDebitAcc() {

 
  this.registerForm.get('draccname').setValue(this.accounts[this.registerForm.get('debitaccountemp').value][1])  ;
  this.registerForm.get('debitaccount').setValue(this.accounts[this.registerForm.get('debitaccountemp').value][0] )  ;
}
    
viewCreditAcc() {

 
  this.registerForm.get('craccname').setValue(this.accounts[this.registerForm.get('creditaccountemp').value][1])  ;
  this.registerForm.get('creditaccount').setValue(this.accounts[this.registerForm.get('creditaccountemp').value][0] )  ;
}



      
}


  
