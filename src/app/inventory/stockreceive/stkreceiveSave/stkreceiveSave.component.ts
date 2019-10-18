
import {Component, OnInit  ,ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators  ,  FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';



import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;

import {stkreceiveSaveService } from './stkreceiveSave.service';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import { DxDataGridComponent } from "devextreme-angular";

  

  
 import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ;


 import { AppComponent } from '../../../app.component';
 

   


@Component({
  selector: 'app-stkreceiveSave',
  templateUrl: './stkreceiveSave.component.html',

  
  providers: [stkreceiveSaveService    , dateFormatPipe  ,  NotificationsComponent ]


 
})
export class stkreceiveSaveComponent implements OnInit {

 
       registerForm: FormGroup;
       registerForm1: FormGroup;
       registerForm2: FormGroup;

       stktransno=[]  ;

       i;
  
       selobj   ;

       saveflag  ;

       indrefid;
  
    constructor(private userService: stkreceiveSaveService    , private notificationsComponent:NotificationsComponent   ,    private   dateformat: dateFormatPipe    ,private formBuilder: FormBuilder ,config: NgbDropdownConfig) {
  
        config.autoClose = false;
    }
  
    ngOnInit() {
  

     
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1  , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID  
        , branchrefid  :AppComponent.branchID     , vatdispflag  :AppComponent.vatDispFlag   , boxdispflag  :AppComponent.BoxDispFlag  
        , stripdispflag  :AppComponent.StripDispFlag    , tabdispflag  :AppComponent.TabDispFlag }  ;

      
      this.registerForm = this.formBuilder.group({
        
     
      	stkrecid: [   , []],
	     stkrecno  : [   , []],
	     receivedate : [   , []],

       stktransrefid   : [   , []]  , 
       indrefid   : [   , []]  , 
       
       

       fromlocname    : [ , []],
       fromlocrefid   : [ , []],
       tolocname    : [    , []],
       tolocrefid   : [   , []],  

       tolocrefidname  : [   , []],  

       stktranselid   : [   , []]  , 
       
       createdby:   [this.selobj .userid , []]      ,
       locrefid:   [ this.selobj .locrefid, []]      ,
       locname:     [ this.selobj .locname  , []]     ,
         clientcdate: [ this.dateformat.transform04()   , []],
          clientcdate1: [ this.dateformat.transform04()   , []],

          date: [this.dateformat.transform05(Date.now())   , []],

                  namefromlocname: [ , []], 
          namefromlocrefid: [ , []],        
           nametolocname: [ , []],                    
          nametolocrefid: [ , []], 

          vatdispflag: [ this.selobj.vatdispflag , []], 
          boxdispflag: [  this.selobj.boxdispflag  , []],        
          stripdispflag: [  this.selobj.stripdispflag , []],                    
          tabdispflag: [this.selobj.tabdispflag , []], 
      
       stkrec:  this.formBuilder.array([
        
        ]),

            dummy:  this.formBuilder.array([
          
           ]),
           
 

      }) ;
  
      this.registerForm.get('stktranselid').setValue("opt1");
      this.registerForm1 = this.formBuilder.group({
        
        debitaccount: [ 30 , []]     ,  
        creditaccount: [ 20 , []]     ,    
        debitamount: [  , []]     ,     
        creditamount:[  , []]     ,     
        draccname:[ 'Purchse Expense' , []]     ,         
        craccname: [ 'Sales  income' , []]     ,  
             invoiceno: [  , []]   , 
                
             invoicebalamt: [  , []]     , 
             clientcdate : [ this.dateformat.transform04()  , []]  , 
             clientcdate1 : [  this.dateformat.transform04()  , []]  , 
             
             cashflag : [  , []]  , 

             jrnltype : [ 1 , []]  , 
             jrnlname :  [ 'GenaralJournal' , []]  , 
             bulkflag :  [  , []]  , 
           
           
          
             personid: [  , []]  , 
             persontype :   [  , []]  , 
             invoicetype: [ 6 , []]  , 
           
           
             paymenttype: [  , []]  ,
             ptrefno: [  , []]  ,
           
            createdby   : [this.selobj.userid   , []], 
            locrefid   : [  , []],
            locname   : [  , []],

            countryrefid: [ this.selobj.countryrefid  , []],
            companyrefid: [ this.selobj .companyid , []],
            branchrefid: [ this.selobj .branchrefid , []],
            
            salesflag: [0   , []]  , 
            calcflag: [0  , []]   ,
            debitcalcflag: [ 0  , []]  , 
            creditcalcflag: [ 1 , []]   ,
          
          }) ;

      
                      
      this.registerForm2 = this.formBuilder.group({
        
        debitaccount: [ 30 , []]     ,  
        creditaccount: [ 20 , []]     ,    
        debitamount: [  , []]     ,     
        creditamount:[  , []]     ,     
        draccname:[ 'Purchse Expense ' , []]     ,         
        craccname: [ 'Sales  income' , []]     , 
                
             invoicebalamt: [  , []]     , 
             clientcdate : [ this.dateformat.transform04()  , []]  , 
             clientcdate1 : [  this.dateformat.transform04()  , []]  , 
             
             cashflag : [  , []]  , 

             jrnltype : [ 1 , []]  , 
             jrnlname :  [ 'GenaralJournal' , []]  , 
             bulkflag :  [  , []]  , 
           
           
          
             personid: [  , []]  , 
             persontype :   [  , []]  , 
             invoicetype: [ 6 , []]  , 
           
           
             paymenttype: [  , []]  ,
             ptrefno: [  , []]  ,
           
            createdby   : [this.selobj.userid   , []], 
            locrefid   : [  , []],
            locname   : [  , []],

            countryrefid: [ this.selobj.countryrefid  , []],
            companyrefid: [ this.selobj .companyid , []],
            branchrefid: [ this.selobj .branchrefid , []],
            
            salesflag: [0   , []]  , 
            calcflag: [0  , []]   ,

            debitcalcflag: [ 1  , []]  , 
            creditcalcflag: [ 0 , []]   ,
          
          }) ;


      let s:any=JSON.parse(localStorage.getItem("purchasesession"));
  
  
  $( document ).ready(function() {
  
  
  
  });
  


      
  var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid   } ;
  
  this.userService.viewStkTransfer(JSON.stringify(frmdata)).subscribe(data => { this.stktransno=data    },
    errorCode => console.log(errorCode));


    this.init() ;

    

    }
       
  



  onSubmit(){
    this.calcStockValue()  ; 
    var answer =  confirm("Save data?");
          const control = <FormArray>this.registerForm.controls['stkrec'];

      if (answer) { 
     this.saveflag=1 ;
     this.userService.saveStockReceive(JSON.stringify(this.registerForm.value)).subscribe(data => {this.saveStkRecProducts(data) , this.saveTransferAcc(data) , this.saveReceiveAcc(data)                },
          errorCode => console.log(errorCode));  

         
      }
    
    }


saveStkRecProducts(data:any){



 if (this.saveflag==1 && data==1) { 
      const control = <FormArray>this.registerForm.controls['stkrec'];
      this.userService.saveStkRecProducts(JSON.stringify(control.value ) ) .subscribe(data => {  this.savevalid(data)},
      errorCode => console.log(errorCode));  
 }

       this.saveflag=0  ;

}

saveTransferAcc(data:any){

  if ( data==1) { 

    this.userService.saveGenJournal(JSON.stringify(this.registerForm1.value ) ) .subscribe(data => {   this.savevalid(data)},
    errorCode => console.log(errorCode));  
}

}

saveReceiveAcc(data:any){
  if ( data==1) { 
    const control = <FormArray>this.registerForm.controls['stkrec'];
    this.userService.saveGenJournal(JSON.stringify(this.registerForm2.value  ) ) .subscribe(data => {  this.savevalid(data)},
    errorCode => console.log(errorCode));  
}
  }

  

savevalid(data:any) {
  if(data==1){ 
  
        this.notificationsComponent.addToast({title:'Success', msg:'Data  Saved  ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
  
        this.clear() ; 
      }else{

    this.notificationsComponent.addToast({title:'Error', msg:'Data Not  saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 

  }
    }


      
  viewStkTransfProducts() {

    
  
    var id =this.registerForm.get('stktranselid').value ;
    this.indrefid   = this.stktransno[id][6]   ;


    this.registerForm.get('stktransrefid').setValue(this.stktransno[id][0 ] ) ;  

   this.registerForm.get('fromlocrefid').setValue(this.stktransno[id][2 ] ) ;  
    this.registerForm.get('fromlocname').setValue(this.stktransno[id][3 ]) ;     
    this.registerForm.get('tolocrefid').setValue(this.stktransno[id][4 ]) ; 
    this.registerForm.get('tolocname').setValue(this.stktransno[id][5 ] ) ;   

    this.registerForm.get('indrefid').setValue(this.stktransno[id][6]) ;
       this.registerForm.get('namefromlocname').setValue(this.stktransno[id][7]) ; 
       this.registerForm.get('namefromlocrefid').setValue(this.stktransno[id][8]) ; 
        this.registerForm.get('nametolocname').setValue(this.stktransno[id][9]) ; 
       this.registerForm.get('nametolocrefid').setValue(this.stktransno[id][10]) ; 


       this.registerForm1.get('locrefid').setValue(this.stktransno[id][2] ) ; 
       this.registerForm1.get('locname').setValue(this.stktransno[id][3]) ; 
        this.registerForm2.get('locrefid').setValue(this.stktransno[id][4]) ; 
       this.registerForm2.get('locname').setValue(this.stktransno[id][5]) ; 


    this.viewLocationId( this.stktransno[id][5 ] ,this.stktransno[id][4 ] ) ;

    var   frmdata={ frmint1 : this.stktransno[id][0  ] ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid   } ;
    this.userService.viewStkTransfProducts(JSON.stringify(frmdata)).subscribe(data => {this.viewServStkTransfProducts(data)},
      errorCode => console.log(errorCode));

}





  viewServStkTransfProducts(data:any  ) {
                           
    const control = <FormArray>this.registerForm.controls['stkrec'];

  while (control.length !== 0) {
    control.removeAt(0) ;
     }

 
    var w= 0  ;
    
    this.init() ;
    
for (this.i = 0; this.i < data.length; this.i++) {

  w= 1   ;
    
  if(data[this.i  ][4   ] >0){ 
  control.insert(0,  this.formBuilder.group({


  stkrecproid   : [  , []]  ,
  stkrecrefid   :[  , []]  , 
  stktrfrefid  :  [ data[this.i  ][w++  ] , []]        ,
  drugproductrefid   : [ data[this.i  ][w++  ] , []]    , 
  batchrefid  : [ data[this.i  ][w++  ] , []]     ,   
  transfertotalqty   : [ data[this.i  ][w++  ] , []]   ,
  receivetotalqty    : [data[this.i  ][4   ]    , []]    , 

  boxconvstk  :   [ data[this.i  ][w++  ] , []]        ,
  stripconvstk  : [ data[this.i  ][w++  ] , []]     ,
      
  clientcdate: [ this.dateformat.transform04()   , []],
  clientcdate1: [ this.dateformat.transform04()   , []],
  createdby   : [this.selobj.userid   , []], 
  locrefid   : [this.selobj.locrefid, []],
  locname   : [this.selobj.locname, []],

      countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],


  indrefid:  [  this.indrefid , []]  ,

  drugname: [data[this.i  ][0    ]    , []]    ,
  calcflag: [0 , []]   ,


  fromlocname    : [  this.registerForm.get('fromlocname').value, []],
  fromlocrefid   : [ this.registerForm.get('fromlocrefid').value, []],
  tolocname    : [ this.registerForm.get('tolocname').value   , []],
  tolocrefid   : [ this.registerForm.get('tolocrefid').value  , []],  


  prodreqqty  :  [ data[this.i  ][w++  ] , []]        ,
  apprtotalqty   : [ data[this.i  ][w++  ] , []]    , 
  waitingtotalqty   : [ data[this.i  ][w++  ] , []]     ,   
  rejectqty   : [ data[this.i  ][w++  ] , []]   ,

   remarks   : [ , []]   ,
   batchname     : [ data[this.i  ][w++  ] , []]   ,
   expirydate     : [ data[this.i  ][w++  ] , []]   ,

   stkmainrefid: [ data[this.i  ][w++  ] , []]   ,

   stktransprodrefid : [data[this.i  ][w++  ]  , []]   ,
   unitprice : [data[this.i  ][w++  ]  , []]   ,

}));
}
}
}

 calc( e){
  
  if(e.keyCode == 9){
    
        this.calcStockValue()  ; 
  }
      }
  
  
      

        calcStockValue(){
          const control = <FormArray>this.registerForm.controls['stkrec'];  
          var  ind=  control.value   ;  
          var qty:number=0;
          var unitprice:number=0;
          var grandtotal:number=0;

          for (this.i = 0; this.i < ind.length; this.i++) {
            if(ind[this.i].calcflag !=1 ){ 
            if(parseInt(ind[this.i].receivetotalqty) ){
              qty=parseInt(ind[this.i].receivetotalqty);
          
            }else{
              qty=0;
            }
        
            if(parseInt(ind[this.i].unitprice) ){
              unitprice=parseInt(ind[this.i].unitprice);
          
            }else{
              unitprice=0;
            }

            ind[this.i].subtotal= qty* unitprice;

            grandtotal+=qty*unitprice ;
         
          }
      

        }
        
  
        this.registerForm1.get('debitamount').setValue(grandtotal ) ; 
        this.registerForm1.get('creditamount').setValue(grandtotal) ; 
        this.registerForm2.get('debitamount').setValue(grandtotal ) ; 
        this.registerForm2.get('creditamount').setValue(grandtotal) ; 

       }
    
        
      


 
      
 init(){
  const control = <FormArray>this.registerForm.controls['stkrec'];
  var data=[ [],[] ];

 
   
  for (this.i = 0; this.i < data.length; this.i++) {

   control.push(this.formBuilder.group({
     
 
    stkrecproid 	: [ , []] ,
    stkrecrefid 	: [ , []] ,
    stktrfrefid 	: [ , []] ,
    drugproductrefid 	: [ , []] ,
    batchrefid 	: [ , []] ,
    transfertotalqty 	: [ , []] ,
    receivetotalqty 	: [ , []] ,
    
    boxconvstk 	: [ , []] ,
    stripconvstk 	: [ , []] ,
    clientcdate	: [ , []] ,
    clientcdate1	: [ , []] ,
    createdby 	: [ , []] ,
    locrefid 	: [ , []] ,
    locname 	: [ , []] ,

        countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],

          
    indrefid	: [ , []] ,

    drugname	: [ , []] ,
    calcflag	: [1  , []] ,

    prodreqqty  :  [ , []]        ,
    apprtotalqty   : [  , []]    , 
    waitingtotalqty   : [  , []]     ,   
     rejectqty   : [ , []]   ,
        remarks   : [ , []]   ,
        stkmainrefid: [  , []]   ,
        stktransprodrefid : [ , []]   ,
        
     }));


 }

}




viewLocationId(id1:any,id2:any){
   var   frmdata1={ frmint1 : id1 ,frmint2 : id2 ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname  , companyid  :this.selobj.companyid   } ;
            

            
        this.userService.viewLocName(JSON.stringify(frmdata1)    ).subscribe(data => {   this.registerForm.get('tolocrefidname').setValue(data[0][1])},
          errorCode => console.log(errorCode));
           
           
     
        
  
      }

      





      clear(){
        
            this.ngOnInit() ;
        }

        
        

}