
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators  ,  FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {editCreditNoteService} from './editCreditNote.service';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;

import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 

import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-patientedit',
  templateUrl: './editCreditNote.component.html',

  providers: [editCreditNoteService   ,NotificationsComponent  ,  dateFormatPipe]
 
})
export class editCreditNoteComponent implements OnInit {



  

       registerForm: FormGroup;
       private sub: any;
       id: number;
        
       i;
    
        selobj ;

        editdata=[]  ;

      constructor(private userService: editCreditNoteService    ,    private   dateformat: dateFormatPipe  , private notificationsComponent:NotificationsComponent    ,private formBuilder: FormBuilder ,config: NgbDropdownConfig  , private route: ActivatedRoute ) {
    
          config.autoClose = false;
      }
    
      ngOnInit() {


    
        
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     
        this.sub = this.route.params.subscribe(params => {
          this.id = +params['id']; 
         });


    
        this.registerForm = this.formBuilder.group({
          
      
          formno  : [   , []],
          formdate : [   , []],

          paymenttype:  [, []]  ,
          ptrefno :  [, []]  ,
          
          date: [   , []],

          id: [   , []],

          invdispflag: [   , []],


          journal :  this.formBuilder.array([
            
            ]),
        
        }) ;
    


    
    
    $( document ).ready(function() {
  
  
  
            
    
  
    });
    

    if(this.id){
      this.registerForm.get('invdispflag').setValue(1) ; 
    }else{
      this.registerForm.get('invdispflag').setValue(0) ; 
    
    }

    
    
    var   frmdata={ frmint1 : this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
    this.userService.viewCreditNote( JSON.stringify(frmdata) ).subscribe(data => {this.viewServCreditNote(data)  },
      errorCode => console.log(errorCode));
    

      this.userService.viewCreditNoteAll( JSON.stringify(frmdata) ).subscribe(data => {this.editdata=data   },
      errorCode => console.log(errorCode));



      this.init() ;


  
      }
         
    
  

  
    onSubmit(){
      
       var answer =  confirm("Save data?");



       const control = <FormArray>this.registerForm.controls['journal'];

       
     if (answer) { 
      this.userService.saveCreditNote(JSON.stringify(control.value[0]  )).subscribe(data => { this.savevalid(data)   },
             errorCode => console.log(errorCode));  
      }
        
        
       }
 
       savevalid(data:any) {
        if(data==1){ 
        
        this.notificationsComponent.addToast({title:'Success', msg:'Data  Saved  ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
      this.clear();
      }else{
      
          this.notificationsComponent.addToast({title:'Error', msg:'Data Not  saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
      
        }
          }
      

          deleteValid(data:any){
            if(data==1){ 
                  this.notificationsComponent.addToast({title:'Success', msg:'Delted Succesfully    ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
                  this.clear() ; 
                }else{
          
              this.notificationsComponent.addToast({title:'Error', msg:' Not Delted', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
          
            }
             
          }



          
          viewEditCreditNote(){
            var   frmdata={ frmint1 : this.registerForm.get('id').value,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
            this.userService.viewCreditNote( JSON.stringify(frmdata) ).subscribe(data => {this.viewServCreditNote(data)  },
              errorCode => console.log(errorCode));

          }






      viewServCreditNote(data : any){

                                                   
const control = <FormArray>this.registerForm.controls['journal'];
var i= 0  ;

while (control.length !== 0) {
  control.removeAt(0) ;
   }

this.init() ;

for (this.i = 0; this.i < data.length; this.i++) {
  
  i= 0  ;
  

  control.insert(0, this.formBuilder.group({
  id: [ data[this.i  ][i++ ] , []]   , 
  journalno:[ data[this.i  ][i++ ] , []]   , 



  dummy1: [ data[this.i  ][i++ ] , []]   , 
  debitaccount: [ data[this.i  ][i++ ] , []]     ,    
  creditaccount: [ data[this.i  ][i++ ] , []]     ,  

   
 
  debitamount: [ data[this.i  ][i++ ] , []]     ,     
  creditamount:[ data[this.i  ][i++ ] , []]     ,     
  draccname: [ data[this.i  ][i++ ] , []]     ,     
  craccname:[ data[this.i  ][i++ ] , []]     , 
  invoiceno: [ data[this.i  ][i++ ] , []]   ,    




  invoicebalamt: [ data[this.i  ][i++ ] , []]     ,
  clientcdate : [ data[this.i  ][i ] , []]  , 
  clientcdate1 : [ data[this.i  ][i++ ] , []]  , 

  cashflag : [ data[this.i  ][i++ ] , []]  , 
  jrnlname : [ data[this.i  ][i++ ] , []]  , 
  bulkflag :  [ data[this.i  ][i++ ] , []]  ,  





















  delflag :  [ data[this.i  ][i++ ] , []]  , 
  personid:[ data[this.i  ][i++ ] , []]  , 
  persontype :  [ data[this.i  ][i++ ] , []]  , 
  invoicetype: [ data[this.i  ][i++ ] , []]  ,    


  paymenttype: [ data[this.i  ][i++ ] , []]  ,
  ptrefno: [ data[this.i  ][i++ ] , []]  ,

  invoicename: [ data[this.i  ][i++ ] , []]  ,
  personame: [ data[this.i  ][i++ ] , []]  ,
  jrnltype: [ data[this.i  ][i++ ] , []]  ,



createdby   : [this.selobj.userid   , []], 
locrefid   : [this.selobj.locrefid, []],
locname   : [this.selobj.locname, []],
             countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],
calcflag: [0  , []]   ,

}));


}

this.registerForm.get('id').setValue(data[0][0 ]);
this.registerForm.get('formno').setValue(data[0 ][1 ]);

           
this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][2])  ) ; 


   }



  deleteCreditNote(){
      
  
   var   frmdata={ frmint1 : this.registerForm.get('id').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
   
   var answer =  confirm("Delete data?");
   
  if (answer) { 
   this.userService.deleteCreditNote( JSON.stringify(frmdata) ).subscribe(data => { this.deleteValid(data)  },
      errorCode => console.log(errorCode));
   }
        
    }


    
      
    init(){
      const control = <FormArray>this.registerForm.controls['journal'];
      var data=[ [],[],[],[],[],[],[],[] ];

     
       
      for (this.i = 0; this.i < data.length; this.i++) {

       control.push(this.formBuilder.group({
         
        id	: [ , []] ,
        journalno	: [ , []] ,
 
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

        calcflag: [1  , []]   ,
        
         }));


     }

   }



   clear(){
    
      this.ngOnInit() ;
    }

    
    

}