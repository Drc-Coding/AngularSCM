
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators  , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {stktransEditService } from './stktransEdit.service' ;





 import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ;



 import { AppComponent } from '../../../app.component';
 
 


@Component({
  selector: 'app-stktransEdit',
  templateUrl: './stktransEdit.component.html',
  providers: [stktransEditService    , dateFormatPipe  ]
 
})
export class stktransEditComponent implements OnInit {


         registerForm: FormGroup;
         id: number;
         
         private sub: any;
    
         i;
  
         selobj   ;
    

         editdata=[]  ;


      constructor(private userService: stktransEditService       ,    private   dateformat: dateFormatPipe    ,private formBuilder: FormBuilder ,config: NgbDropdownConfig , private route: ActivatedRoute ) {
    
          config.autoClose = false;
      }
    
      ngOnInit() {
    
  

        this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1  , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID  
          , branchrefid  :AppComponent.branchID     , vatdispflag  :AppComponent.vatDispFlag   , boxdispflag  :AppComponent.BoxDispFlag  
          , stripdispflag  :AppComponent.StripDispFlag    , tabdispflag  :AppComponent.TabDispFlag }  ;

        this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; 
       });
      
        this.registerForm = this.formBuilder.group({
          
   
          formno  : [   , []],
    

          date: [   , []],
          id  : [   , []],
             

          invdispflag: [   , []],
          vatdispflag: [ this.selobj.vatdispflag , []], 
          boxdispflag: [  this.selobj.boxdispflag  , []],        
          stripdispflag: [  this.selobj.stripdispflag , []],                    
          tabdispflag: [this.selobj.tabdispflag , []],  

          stktrans: this.formBuilder.array([
            
           ]),
        }) ;
    

    $( document ).ready(function() {
    
    
    
    });
    
        
      var   frmdata={ frmint1 : this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname  , companyid  :this.selobj.companyid   } ;
    
      this.userService.viewStkTransferNo(JSON.stringify(frmdata)).subscribe(data => { this.viewServStkTransferNo(data)  },
      errorCode => console.log(errorCode));

      this.userService.viewStkTransfProducts(JSON.stringify(frmdata)).subscribe(data => {this.viewServFormProd(data)  },
      errorCode => console.log(errorCode));


      this.userService.viewStkTrnfrAll( JSON.stringify(frmdata) ).subscribe(data => {this.editdata=data   },
      errorCode => console.log(errorCode));

      this.init() ;



      if(this.id){
        this.registerForm.get('invdispflag').setValue(1) ; 
      }else{
        this.registerForm.get('invdispflag').setValue(0) ; 
      
      }

      
      
      
      }
         
    
  
  
  
    onSubmit(){
  
 
          
    }
  


    
    viewEdit(){
      

      var   frmdata={ frmint1 :    this.registerForm.get('id').value  ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname     , companyid  :this.selobj.companyid  } ;
      
        this.userService.viewStkTransferNo(JSON.stringify(frmdata)).subscribe(data => { this.viewServStkTransferNo(data)  },
        errorCode => console.log(errorCode));
  
        this.userService.viewStkTransfProducts(JSON.stringify(frmdata)).subscribe(data => {this.viewServFormProd(data)  },
        errorCode => console.log(errorCode));


      
       }  


  
  
    viewServFormProd(data:any  ) {
  

      var w= 0  ;
    
const control = <FormArray>this.registerForm.controls['stktrans'];

while (control.length !== 0) {
  control.removeAt(0) ;
   }

this.init() ;



for (this.i = 0; this.i < data.length; this.i++) {

     w= 1 

     control.insert(0,   this.formBuilder.group({

  stktransrefno   :[   , []] , 
  stktransrefid  :  [data[this.i][w++   ]  , []]        ,
  drugproductrefid   : [data[this.i][w++   ]  , []]      , 
  batchrefid   : [data[this.i][w++   ]  , []]     ,
  transfertotalqty   : [data[this.i][w++   ]  , []]      ,


  clientcdate  :  [ , []]   ,
  clientcdate1  :  [ , []]   ,

  createdby   : [this.selobj.userid   , []], 
  locrefid   : [this.selobj.locrefid, []],
  locname   : [this.selobj.locname, []],

   countryrefid: [ this.selobj.countryrefid  , []],
   companyrefid: [ this.selobj .companyid , []],
  branchrefid: [ this.selobj .branchrefid , []],


  drugname   :[data[this.i ] [0 ], []], 

  dummy1   : [data[this.i][w++   ]  , []]      ,
  dummy2   : [data[this.i][w++   ]  , []]      ,
  dummy3   : [data[this.i][w++   ]  , []]      ,
  dummy4   : [data[this.i][w++   ]  , []]      ,


  prodreqqty   : [data[this.i][w++   ]  , []]      ,
  prodavailqty   : [data[this.i][w++   ]  , []]      ,
  apprtotalqty   : [data[this.i][w++   ]  , []]      ,
  waitingtotalqty   : [data[this.i][w++   ]  , []]      ,
  rejectqty   : [data[this.i][w++   ]  , []]      ,


  rejectreason   : [data[this.i][w++   ]  , []]      ,
  batchname   : [data[this.i][w++   ]  , []]      ,
  stkmainrefid: [  , []]   ,

}));


}



   }
  


   
   viewServStkTransferNo(data : any){
    
    
        this.registerForm.get('formno').setValue(data[0][1]);

        this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][2])) ;
       }


       

       
      
    init(){
      const control = <FormArray>this.registerForm.controls['stktrans'];
      var data=[ [],[] ];

     
       
      for (this.i = 0; this.i < data.length; this.i++) {

       control.push(this.formBuilder.group({
         
        stktrfproid 	: [ , []] ,
        stktrfrefid 	: [ , []] ,

        indentrefid 	: [ , []] ,
        drugproductrefid 	: [ , []] ,
        batchrefid 	: [ , []] ,
        prodreqqty 	: [ , []] ,
        prodavailqty 	: [ , []] ,
  
        apprboxqty 	: [ , []] ,
        apprstripqty 	: [ , []] ,
        apprtabqty 	: [ , []] ,
        apprtotalqty 	: [ , []] ,
        waitingboxqty 	: [ , []] ,
        waitingstripqty 	: [ , []] ,
        waitingtabqty 	: [ , []] ,
        waitingtotalqty 	: [ , []] ,
    
        rejectqty 	: [ , []] ,

        batchavailqty 	: [ , []] ,
        transferboxqty 	: [ , []] ,
        transferstripqty 	: [ , []] ,
        transfertabqty 	: [ , []] ,
        transfertotalqty 	: [ , []] ,
  
        productstatusid 	: [ , []] ,
        rejectreason 	: [ , []] ,
     
        clientcdate	: [ , []] ,
        clientcdate1	: [ , []] ,
        createdby 	: [ , []] ,
        createddate 	: [ , []] ,
        modifiedby 	: [ , []] ,
        modifieddate 	: [ , []] ,
        clientmdate 	: [ , []] ,
        status 	: [ , []] ,
    
        boxconvdrg 	: [ , []] ,
        stripconvdrg 	: [ , []] ,
        boxconvstk 	: [ , []] ,
        stripconvstk 	: [ , []] ,
        locrefid 	: [ , []] ,
        locname 	: [ , []] ,

            countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],


          
        uniqueflag 	: [ , []] ,
        drugname	: [ , []] ,
        
        stkmainrefid: [  , []]   ,
         }));


     }

   }




}