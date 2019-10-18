
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

import {distslctEditService } from './distslctEdit.service' ;

import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;

 import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ;

 import { AppComponent } from '../../../app.component';
 
      

@Component({
  selector: 'app-distslctEdit',
  templateUrl: './distslctEdit.component.html',
  providers: [distslctEditService   ,    NgbDropdownConfig   , dateFormatPipe   , NotificationsComponent]
})
export class distslctEditComponent implements OnInit {



  registerForm: FormGroup;
  id: number;
  
  private sub: any;

  i;

  selobj   ;

  editdata=[]  ;

  

constructor(private userService: distslctEditService       ,    private   dateformat: dateFormatPipe         ,private formBuilder: FormBuilder ,config: NgbDropdownConfig , private route: ActivatedRoute                                      ,  private notificationsComponent:NotificationsComponent  ) {

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
  formdate : [   , []],


   date: [   , []],
       

   id  : [   , []],

   invdispflag : [   , []],
   
   vatdispflag: [ this.selobj.vatdispflag , []], 
   boxdispflag: [  this.selobj.boxdispflag  , []],        
   stripdispflag: [  this.selobj.stripdispflag , []],                    
   tabdispflag: [this.selobj.tabdispflag , []], 
   
  dstslct:  this.formBuilder.array([
    
    ]),
 }) ;



$( document ).ready(function() {



});



 
var   frmdata={ frmint1 : this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;

this.userService.viewDistSelect(JSON.stringify(frmdata)).subscribe(data => {this.viewServFormProd(data)  },
errorCode => console.log(errorCode));



this.userService.viewDistSelectAll( JSON.stringify(frmdata) ).subscribe(data => {this.editdata=data   },
  errorCode => console.log(errorCode));

this.init() ;


if(this.id){
  this.registerForm.get('invdispflag').setValue(1) ; 
}else{
  this.registerForm.get('invdispflag').setValue(0) ; 

}




}
  




onSubmit(){

  
  var  valflag =0 ;
  const prcenqiryctrl = <FormArray>this.registerForm.controls['dstslct'];

 var answer =  confirm("Save data?");
 
   if (answer  && valflag==0 ) { 

   this.userService.saveDistSelect(JSON.stringify(prcenqiryctrl.value  )).subscribe(data => {  this.savevalid(data) },
   errorCode => console.log(errorCode));
   }

   
}


savevalid(data:any){
  if(data==1){ 
  
        this.notificationsComponent.addToast({title:'Success', msg:'Data  Saved  ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
   
  
      }else{

    this.notificationsComponent.addToast({title:'Error', msg:'Data Not  saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 

  }
    }

viewEdit(){
  
  
 
var   frmdata={ frmint1 :    this.registerForm.get('id').value     ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;

this.userService.viewDistSelect(JSON.stringify(frmdata)).subscribe(data => {this.viewServFormProd(data)  },
errorCode => console.log(errorCode));
  
      } 



viewServFormProd(data:any  ) {


var w= 0  ;

                            
const control = <FormArray>this.registerForm.controls['dstslct'];

while (control.length !== 0) {
  control.removeAt(0) ;
   }

this.init() ;


for (this.i = 0; this.i < data.length; this.i++) {
  w=   4   ;

  control.insert(0,  this.formBuilder.group({



  id  :  [ data[this.i  ][w++   ], []],   




  distslctid  :  [ data[this.i  ][w++   ], []],      
  prcenqrefid :  [ data[this.i  ][w++   ], []],       
  drugproductrefid   :  [ data[this.i  ][w++   ], []],     
  batchrefid   :  [ data[this.i  ][w++   ], []],     
  prodwaitingqty    :  [ data[this.i  ][w++   ], []],   



  distpreprice    :  [ data[this.i  ][w++   ], []],        
  distfinalprice   :  [ data[this.i  ][w++   ], []],    
  vendorid  :  [ data[this.i  ][w++   ], []],  
  vendorslctflag   :  [ data[this.i  ][w++   ], []], 
  distslctno  :  [ data[this.i  ][w++   ], []],  

  clientcdate :  [ data[this.i  ][w   ], []], 
  clientcdate1 :  [ data[this.i  ][w++   ], []], 

  createdby:   [this.selobj.userid , []]    ,
  locrefid:   [this.selobj.locrefid , []]    ,
  locname:     [this.selobj.locname , []]    , 

               countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],


  drugname:   [ data[this.i][ 0   ] , []]  ,
  vendorname:  [ data[this.i][ 1  ] , []]    ,
  poflag  :  [ data[this.i  ][w++   ], []],


  dummy1  :  [ data[this.i  ][w++   ], []],
  creditdays  :  [ data[this.i  ][w++   ], []],
  leadtime  :  [ data[this.i  ][w++   ], []],
  exppoqty  :  [ data[this.i  ][w++   ], []],
  exppoprice  :  [ data[this.i  ][w++   ], []],
    



   calcflag: [0 , []]   ,
     
 
  





}));


}

this.registerForm.get('formno').setValue(data[0][2 ]);

this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][3 ])) ;


}




      
init(){
  const control = <FormArray>this.registerForm.controls['dstslct'];
  var data=[ [],[] ];

 
   
  for (this.i = 0; this.i < data.length; this.i++) {

   control.push(this.formBuilder.group({
     
     

    distslctproid 	: [ , []] ,
    distslctid 	: [ , []] ,
    prcenqrefid 	: [ , []] ,
    drugproductrefid 	: [ , []] ,
    prodwaitingqty 	: [ , []] ,
    distfinalprice 	: [ , []] ,
    vendorid 	: [ , []] ,
    vendorslctflag 	: [ , []] ,
    clientcdate	: [ , []] ,
    clientcdate1	: [ , []] ,
    
    createdby	: [ , []] ,
    locrefid	: [ , []] ,
    locname	: [ , []] ,

                 countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],

          
    vendorname	: [ , []] ,
    drugname	: [ , []] ,
    poflag	: [ , []] ,
    calcflag	: [1 , []] ,
    

     }));


 }

}



}