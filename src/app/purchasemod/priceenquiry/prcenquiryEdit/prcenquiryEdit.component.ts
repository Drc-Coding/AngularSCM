
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

import {prcenquiryEditService } from './prcenquiryEdit.service' ;

import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;


 import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ;


 import { AppComponent } from '../../../app.component';
 

 


@Component({
  selector: 'app-prcenquiryEdit',
  templateUrl: './prcenquiryEdit.component.html',
  providers: [prcenquiryEditService   ,    dateFormatPipe  ,NotificationsComponent]

})
export class prcenquiryEditComponent implements OnInit {


  registerForm: FormGroup;
  id: number;
  
  private sub: any;

  i;


  selobj   ;


  editdata=[]  ;

  
constructor(private userService: prcenquiryEditService      ,    private   dateformat: dateFormatPipe ,private formBuilder: FormBuilder ,config: NgbDropdownConfig , private route: ActivatedRoute ) {

   config.autoClose = false;
}

ngOnInit() {


  this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1  , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID  
    , branchrefid  :AppComponent.branchID     , vatdispflag  :AppComponent.vatDispFlag   , boxdispflag  :AppComponent.BoxDispFlag  
    , stripdispflag  :AppComponent.StripDispFlag    , tabdispflag  :AppComponent.TabDispFlag }  ;


 this.registerForm = this.formBuilder.group({
   
  formno  : [   , []],
  formdate : [   , []],
 

   date: [   , []],  
   
   id  : [   , []],

   invdispflag : [   , []],
   vatdispflag: [ this.selobj.vatdispflag , []], 
   boxdispflag: [  this.selobj.boxdispflag  , []],        
   stripdispflag: [  this.selobj.stripdispflag , []],                    
   tabdispflag: [this.selobj.tabdispflag , []], 
   
  prcenq:  this.formBuilder.array([
    
    ]),
     
 }) ;



 this.sub = this.route.params.subscribe(params => {
 this.id = +params['id']; 
});


$( document ).ready(function() {



});

 
var   frmdata={ frmint1 : this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname  , companyid  :this.selobj.companyid   } ;


this.userService.viewPriceEnquiryProd(JSON.stringify(frmdata)).subscribe(data => {this.viewServFormProd(data)  },
errorCode => console.log(errorCode));


this.userService.viewPriceEnquiryAll( JSON.stringify(frmdata) ).subscribe(data => {this.editdata=data   },
  errorCode => console.log(errorCode));



  
  if(this.id){
    
         
            this.registerForm.get('invdispflag').setValue(1) ; 
          }else{
    
           
            this.registerForm.get('invdispflag').setValue(0) ; 
          
          }

          


      this.init() ;


    
      

      

}
  




onSubmit(){


   
}




viewEdit(){
  
  
 
var   frmdata={ frmint1 : this.registerForm.get('id').value    ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;


this.userService.viewPriceEnquiryProd(JSON.stringify(frmdata)  ).subscribe(data => {this.viewServFormProd(data)  },
errorCode => console.log(errorCode));

  
     } 


viewServFormProd(data:any  ) {



var w= 0  ;

                            
const control = <FormArray>this.registerForm.controls['prcenq'];

while (control.length !== 0) {
  control.removeAt(0) ;
   }

this.init() ;


for (this.i = 0; this.i < data.length; this.i++) {

  
  w= 2   ;

control.insert(0, this.formBuilder.group({

  drugproductrefid   : [ data[this.i  ][w++  ] , []]   , 
  prodwaitingqty    : [ data[this.i  ][w++   ] , []]     , 
  createdby   : [this.selobj.userid   , []], 
  locrefid   : [this.selobj.locrefid, []],
  locname   : [this.selobj.locname, []],

   countryrefid: [ this.selobj.countryrefid  , []],
    companyrefid: [ this.selobj .companyid , []],
     branchrefid: [ this.selobj .branchrefid , []],


  vendorname:[ data[this.i  ][w++   ] , []]    ,
  drugname:[ data[this.i  ][w++    ] , []]   ,      

        calcflag: [0 , []]   ,


        dummy1   : [data[this.i][w++   ]  , []]      ,




        creditdays   : [data[this.i][w++   ]  , []]      ,
        leadtime   : [data[this.i][w++   ]  , []]      ,
        exppoqty   : [data[this.i][w++   ]  , []]      ,
        exppoprice   : [data[this.i][w++   ]  , []]      ,
        previouspoprice   : [data[this.i][w++   ]  , []]      ,


        remarks   : [data[this.i][w++   ]  , []]      ,
        abc   : [data[this.i][w++   ]  , []]      ,
        distprodrank   : [data[this.i][w++   ]  , []]      ,
        indreqqty   : [data[this.i][w++   ]  , []]      ,
        stktransapprqty   : [data[this.i][w++   ]  , []]      ,


        stktransrejqty   : [data[this.i][w++   ]  , []]      ,







}));


}

this.registerForm.get('formno').setValue(data[0][0 ]);

this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][1])) ;


}





init(){
  const control = <FormArray>this.registerForm.controls['prcenq'];
  var data=[ [],[] ];

 
   
  for (this.i = 0; this.i < data.length; this.i++) {

   control.push(this.formBuilder.group({
     
 
    prcencproid 	: [ , []] ,
    prcencid 	: [ , []] ,
    purchsessionid 	: [ , []] ,
    drugproductrefid 	: [ , []] ,
    prodwaitingqty 	: [ , []] ,
    vendorid 	: [ , []] ,
    createdby 	: [ , []] ,
    locrefid	: [ , []] ,
    locname	: [ , []] ,

                 countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],

          
    slctflag 	: [ , []] ,
    vendorname	: [ , []] ,
    drugname	: [ , []] ,
    clientcdate	: [ , []] ,
    clientcdate1	: [ , []] ,
      
    calcflag: [ 1  , []]   ,

    

     }));


 }

}




}