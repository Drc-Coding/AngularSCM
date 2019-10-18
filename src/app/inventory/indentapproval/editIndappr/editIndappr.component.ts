
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators ,FormArray  } from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;


import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

import {editIndapprService } from './editIndappr.service'  ;


 import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ;

 import { AppComponent } from '../../../app.component';
 

@Component({
  selector: 'app-editIndappr',
  templateUrl: './editIndappr.component.html',
   providers: [editIndapprService   ,NotificationsComponent  , dateFormatPipe  ]
})
export class editIndapprComponent implements OnInit {




  registerForm: FormGroup;
  id: number;
  
  private sub: any;

  i;

  selobj   ;


  editdata=[]  ;

constructor(private userService: editIndapprService    ,    private   dateformat: dateFormatPipe    ,private formBuilder: FormBuilder ,config: NgbDropdownConfig , private route: ActivatedRoute ) {

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
  indappr:  this.formBuilder.array([
    
    ]),

        dummy:  this.formBuilder.array([
          
           ]),
           

 }) ;





$( document ).ready(function() {



});

if(this.id){

  this.registerForm.get('invdispflag').setValue(1) ; 
}else{


  this.registerForm.get('invdispflag').setValue(0) ; 

}




 
var   frmdata={ frmint1 : this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid   } ;




this.userService.viewSelIndentproduct(JSON.stringify(frmdata)).subscribe(data => {this.viewServFormProd(data)  },
errorCode => console.log(errorCode));

this.userService.viewIndentConfirmAll( JSON.stringify(frmdata) ).subscribe(data => {this.editdata=data    },
  errorCode => console.log(errorCode));

  this.userService.viewIndentConfirmNo(JSON.stringify(frmdata)  ).subscribe(data => {    this.registerForm.get('formno').setValue(data[0]) },
  errorCode => console.log(errorCode));
  
this.init() ;


}
  
 



onSubmit(){


   
}





viewEdit(){
  
  var   frmdata={ frmint1 :   this.registerForm.get('id').value  ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid   } ;
  

                         
  this.userService.viewSelIndentproduct(JSON.stringify(frmdata)  ).subscribe(data => {this.viewServFormProd(data)  },
  errorCode => console.log(errorCode));
  
         }   




viewServFormProd(data:any  ) {



                         
const control = <FormArray>this.registerForm.controls['indappr'];

var w= 0  ;

while (control.length !== 0) {
  control.removeAt(0) ;
   }

this.init() ;


    var i=0 ;  

        
for (this.i = 0; this.i < data.length; this.i++) {

  i=0 ;  

  control.insert(0, this.formBuilder.group({

  id :  [data[0 ] [i++ ], []]  ,
  indentrefid : [data[0 ] [i++ ], []]   ,
  drugprdrefid  :   [data[this.i ] [i++ ], []], 
  boxqty   : [data[this.i ] [i++ ], []], 
  stripqty :  [data[this.i ] [i++ ], []],   
  

 
  apprboxqty   : [, []] , 
  apprstripqty :   [, []] ,     
  apprtabqty   :   [ data[this.i ] [6 ], []] ,  



  tabqty   : [data[this.i ] [i++ ], []], 
  qty   :   [data[this.i ] [i++ ], []], 
  boxconvdrg  :   [data[this.i ] [i++ ], []] , 
  stripconvdrg  :   [data[this.i ] [i++ ], []] , 
  minqty   :    [data[this.i ] [i++ ], []] , 


  createdby   : [this.selobj.userid   , []], 
  locrefid   : [this.selobj.locrefid, []],
  locname   : [this.selobj.locname, []],
      countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],

  maxqty   :    [data[this.i ] [i++ ], []] , 
  drugname   :[data[this.i ] [i++ ], []]   ,

  remarks: [data[this.i ] [i++ ], []]   ,
  calcflag: [0 , []]   ,


  approvedqty   :  [data[this.i ] [i++ ], []]   
  
    
}));


}





  
  
  
  this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][2])) ;


}





     
      
    init(){
      const control = <FormArray>this.registerForm.controls['indappr'];
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
        calcflag	: [  1 , []] ,
        remarks:[,[]]
         }));


     }

   }



}