
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {saveBulkPtService} from './saveBulkPt.service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;


import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 


import { AppComponent } from '../../../app.component';




@Component({
  selector: 'app-saveBulkPt',
  templateUrl: './saveBulkPt.component.html',
    providers: [saveBulkPtService,NgbDropdownConfig  ,NotificationsComponent    , dateFormatPipe]
 
})
export class saveBulkPtComponent implements OnInit {



  registerForm: FormGroup;
  private sub: any;
  id: number;
  
  distributors= []  ;
   i;

   selobj ;
 constructor(private userService: saveBulkPtService  ,    private   dateformat: dateFormatPipe  , private notificationsComponent:NotificationsComponent    ,private formBuilder: FormBuilder ,config: NgbDropdownConfig  , private route: ActivatedRoute ) {

     config.autoClose = false;
 }

 ngOnInit() {


   
     this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     
   this.sub = this.route.params.subscribe(params => {
     this.id = +params['id']; 
    });



   this.registerForm = this.formBuilder.group({
     
 
    journalid: [   , []],

    
   distid  : [   , []],

   distsam  : [   , []],


   typeflag  : [   , []],


   date: [this.dateformat.transform05(Date.now())   , []],
             
   journal : this.formBuilder.array([
          
    ]),

   
   }) ;




$( document ).ready(function() {



       


});

var   frmdata={ frmint1 : this.id,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;

 
this.userService.viewDistributors( JSON.stringify(frmdata) ).subscribe(data => {this.distributors=  data    },
 errorCode => console.log(errorCode));


this.viewServDistOutstanding("");


 }
    




onSubmit(){


  var  valflag =0 ; 
    const control = <FormArray>this.registerForm.controls['journal'];

    alert(JSON.stringify(control.value) )   ;

  var answer =  confirm("Save data?");
  
if (answer) { 
 this.userService.saveBulkPayment(JSON.stringify(control.value)  ).subscribe(data => {  this.savevalid(data)   },
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

  viewDistOutstanding() {

   
    var   frmdata={ frmint1 : this.distributors[ this.registerForm.get('distsam').value][0 ]  ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
  this.userService.viewDistOutstanding( JSON.stringify(frmdata)  ).subscribe(data => {this.viewServDistOutstanding(data)},
    errorCode => console.log(errorCode));


   }






 viewServDistOutstanding(data : any){
           
      const control = <FormArray>this.registerForm.controls['journal'];

               
       while (control.length !== 0) {
             control.removeAt(0) ;
         }
    

       var w= 0  ;


       
 for (this.i = 0; this.i < data.length; this.i++) {
       
 
             w= 0   ;
       
              control.push(this.formBuilder.group({
              
      
          
                journalid:  [  , []], 
                journalno:  [  , []], 
                 date:  [  , []], 
                personid:  [ this.distributors[ this.registerForm.get('distsam').value][0 ]  , []], 
                persontype:  [ 2 , []], 

                invoicetype :   [ 3 , []] ,    
                invoiceno:   [data[this.i][0  ] , []] ,    
                invoiceamt:  [   , []] ,   
                invoicebalamt:  [  data[this.i][2  ] , []] ,  
                debitaccount:  [ 11  , []] ,    
                creditaccount: [ 3  , []] ,     
                debitamount: [  data[this.i][2  ] , []] ,     
                creditamount:  [ data[this.i][2  ]  , []] , 
    
                clientcdate: [ this.dateformat.transform04()   , []],
                clientcdate1: [ this.dateformat.transform04()   , []],
                createdby  :   [ this.selobj.userid , []]        ,
                locrefid:   [this.selobj.locrefid  , []]        ,
                locname:     [this.selobj.locname , []]        ,
                 countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],
                 draccname:  ['Acc Payable', []],    
                 craccname:  ['Cash', []], 

                 












                 invoicename:   [  data[this.i][1  ], []] , 

                bulkflag :  [ false   , []] ,

                calcflag: [0 , []]   ,
                jrnltype : [ 4 , []]  , 
                jrnlname 	: [ 'Payments'  , []] ,

                personame:  [ this.distributors[this.registerForm.get('distsam').value][1] , []]  ,
              }));
   
       
}
       
         
       
}












validnew():Number{
  var  valflag =0 ;


   return   valflag;

}





      
init(){
  const control = <FormArray>this.registerForm.controls['invoice'];
  var data=[ [],[],[],[],[],[],[],[] ];

 
   
  for (this.i = 0; this.i < data.length; this.i++) {

   control.push(this.formBuilder.group({
     
 

         
    id	: [ , []] ,

 
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
    clientcdate 	: [ , []] ,
    clientcdate1 	: [ , []] ,

    cashflag 	: [ , []] ,
    jrnlname 	: [ , []] ,
    bulkflag 	: [ , []] ,
    calcflag: [1 , []]   ,

     }));


 }

}



clear(){
  
    this.ngOnInit() ;
  }


  


}