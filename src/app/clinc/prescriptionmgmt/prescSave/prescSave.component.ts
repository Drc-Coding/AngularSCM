
import {Component, OnInit  , ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators  , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {prescSaveService} from './prescSave.service'  ;

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;


import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import { DxDataGridComponent } from "devextreme-angular";




import {DomSanitizer, SafeUrl, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-prescSave',
  templateUrl: './prescSave.component.html',
    providers: [prescSaveService ,NgbDropdownConfig,NotificationsComponent ]
 
})
export class prescSaveComponent implements OnInit {





  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent
  
        closeResult: string;
        model: number[];
  
         registerForm: FormGroup;
    
         customers=[];
  
         doctors=[];
  
      
         prcsettings=[];
         

  
         images : SafeResourceUrl;
  
  
         i;
  
       
         inc  =1 ;
       
         autoincr  ;
     
         autoval =  0    ;
            
         autoinc =  0    ;
  
         autodata =[]  ;
  
   
        autodatacopy =[]  ;
  
        selobj  ;
  
        drgid;
  

        
        priceselflag  ;

    
      constructor(private userService: prescSaveService ,private formBuilder: FormBuilder   ,config: NgbDropdownConfig  , private notificationsComponent:NotificationsComponent ,private modalService: NgbModal ) {
    
          config.autoClose = false;
      }
    
      ngOnInit() {
    
  
  
  
        this.selobj  = {   userid  :'0' , locrefid  :'0' , locname :'0'    }  ;
  
  
  
  
        
  
        this.registerForm = this.formBuilder.group({
          
             
          prescid: [  , []],    
          prescdate: [  , []],
          docrefid: [  , []],
          custrefid: [  , []],
          age: [  , []],
          gender: [  , []],
          weight: [  , []],
          temperature: [  , []],
          blood_sugar: [  , []],
          blood_pressure: [  , []],
          diagnosis: [  , []],
          remarks: [  , []],
          consultation_fee: [  , []],
          next_visit: [  , []],
          del_flag: [  , []],
    
          createddate: [  , []],
      
          clientcdate  :  [ , []]   ,
          createdby:   [this.selobj .userid , []]      ,
          locrefid:   [ this.selobj .locrefid, []]      ,
          locname:     [ this.selobj .locname  , []]     ,
   
     
          autonamenew: [, []]  ,
    
  
          presc:  this.formBuilder.array([
          
          ]),
   
  
        }) ;
    
  
  
  
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
        this.userService.viewCustomers( JSON.stringify(frmdata)  ).subscribe(data => {      this.customers= data    },
          errorCode => console.log(errorCode));  
          this.userService.viewDoctors( JSON.stringify(frmdata)).subscribe(data => {      this.doctors= data    },
            errorCode => console.log(errorCode));  
  

  
  
    
    $( document ).ready(function() {
  
  
   
    
    });


  $('.boxname ').hide()  ;


  
      }
  
  
  
  
  
  
  
  
  
  
      autofocusin(){
  
  
  
        this.autoincr = setInterval(() => {
  
          if(this.registerForm.get('autonamenew').value){
  
         
            $('#autolist').show()   ;
  
            
            if(this.autoval== this.registerForm.get('autonamenew').value  ){
              
                     
                      this.autoinc+= 1 ;
                      
              
              } else{
              
                      this.autoinc = 0  ;
              }
                    
       
              this.autoval= this.registerForm.get('autonamenew').value  ;
  
           if(this.autoinc<1){
  
            var   frmdata={ frmint1 : '' ,  frmstr1 : this.registerForm.get('autonamenew').value , createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
          this.userService.viewPRCProductNames( JSON.stringify(frmdata) ).subscribe(data => {      this.autodata= data    },
          errorCode => console.log(errorCode));  
  
  
  
              }

      
          }
     
        }, 610);
  
      
      }
  
  
      
  
  
  
      autofocusout(){
        
   
        if(this.registerForm.get('autonamenew').value) {
     
      
        } else{
  
          $('#autolist').hide() ;
        }
  
  
        clearInterval( this.autoincr );
          
              
         }
  
  
  
         autokeyselect(event: KeyboardEvent,articleId: number){
          
            
                var nr: number;
   
             
                if(event.keyCode == 13){
  
  
                 this.drgid =   articleId  ;
      
                 this.autodatacopy  =  this.autodata  ;
      
                  this.autodata =  []   ;
      
                      $('.boxname ').show()  ;
      
                       $('#autolistnew  ul   li:nth-child(1)   input:nth-child(1) ').focus()  ;
             
               }
         
             
            
      
              }
      
  
  
              viewStock(event: KeyboardEvent,stktype: number){
             
                    
                          if(event.keyCode == 13){
                
                          
                          var   drg=   this.autodatacopy[this.drgid ][1]  ;
                                
                          var  bth  =   this.autodatacopy[this.drgid ][2]  ;
                          var   frmdata={ frmint1 :drg  ,frmint2 : bth,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
                            this.userService.viewPRCProductName( JSON.stringify(frmdata) ).subscribe(data => {      this.viewServWareHouseStock(data ,stktype )        },
                             errorCode => console.log(errorCode));
                        
                             $("#autoname").focus();
                         
                              $('.boxname ').hide()  ;
                       
                             this.registerForm.get('autonamenew').setValue('')  ;
                
                             this.autodatacopy=[]  ;
                         }
                
                
                
                }
  
  
  
  
  

  
                init(){
                 const control = <FormArray>this.registerForm.controls['presc'];
                 var data=[ [],[],[],[],[],[],[],[] ];
  
                
                  
                 for (this.i = 0; this.i < data.length; this.i++) {
  
                  control.push(this.formBuilder.group({
                    
                      prcprodid:  [ , []] ,
                      prsrefid: [ , []] ,
                      drugproductid:  [ , []] ,
              
                  
           
                      morning   : [, []]  ,
                      afternoon   : [, []]  ,
                      evening   : [, []]  ,
                      night   : [, []]  ,
                      days   : [, []]  ,
                      food   : [, []]  ,
                      dose   : [, []]  ,
                      total_medications   : [, []]  ,
       
                
                      bfaf  : [, []]  ,
                      fdinteraction  : [, []]  ,
                      genericid  : [, []]  ,

                      clientcdate  :  [ , []]   ,
                     createdby   : [ , []] ,
                     locrefid   : [ , []] ,
                     locname   : [ , []] ,
                
                     drgtyp   : [, []]  ,
                     productname: [, []]   ,
  
  
                    }));
  
  
                }
  
           
  
              }
          
  
              
                viewServWareHouseStock(data : any , stktype : any ){
                  
                  var conversionfactor  ;
                  var unitprice  ;
                  const control = <FormArray>this.registerForm.controls['presc'];
                   
               if(stktype==1){
            
                  conversionfactor=data[0][11] ;
                }else if(stktype==2){
                  conversionfactor=data[0][12] ;
            
                }else if(stktype==3){
            
                  conversionfactor= 1   ;
                }
        
  

                  
                    for (this.i = 0; this.i < data.length; this.i++) {
    
  
                   
                  
                     
                        control.insert(0,this.formBuilder.group({
                        
                          prcprodid:  [ , []] ,
                          prsrefid: [ , []] ,
                          drugproductid:  [data[this.i][ 1 ] , []]  , 
                        
                                      
                    
                         morning   : [, []]  ,
                         afternoon   : [, []]  ,
                         evening   : [, []]  ,
                         night   : [, []]  ,
                         days   : [, []]  ,
                         food   : [, []]  ,
                         dose   : [, []]  ,
                         total_medications   : [, []]  ,
                        
                      
                  
                         bfaf  : [, []]  ,
                         fdinteraction  : [, []]  ,
                         genericid  : [ data[this.i][ 2 ]    , []]  ,

                         createdby   : [this.selobj.userid   , []], 
                         locrefid   : [this.selobj.locrefid, []],
                         locname   : [this.selobj.locname, []],
                    
                         drgtyp:stktype ,
                         convfactor:   [ conversionfactor, []]  ,


                         productname: [data[this.i][ 0 ] , []]   ,
  
                        }));
              
                        
  
                  
                   this.inc+= 1  ;
                        
                  
              }
  
                  
         }
  
  
  

  
  
  onSubmit(){
        var  valflag =0 ;
              

              alert(JSON.stringify(this.registerForm.value) ) ; 
          var answer =  confirm("Save data?");
                  
            if (answer && valflag==0) { 
           this.userService.savePrescription(JSON.stringify(this.registerForm.value)  ).subscribe(data => {this.savePrescProd(data)   },
             errorCode => console.log(errorCode));
             }
    
      
    }
      
  
  
  
  
    savePrescProd(data:any){
       const control = <FormArray>this.registerForm.controls['presc'];
  
  
          this.userService.savePrescProd(JSON.stringify(  control.value  ) ) .subscribe(data => {this.savevalid()},
          errorCode => console.log(errorCode));
  
  
  }
  
  
 

  
    savevalid(){
    
    
        this.notificationsComponent.addToast({title:'Error', msg:'Data  Saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
      }
  

      checkInteraction(){

     

        const ctrlgen = <FormArray>this.registerForm.controls['presc'];

        const ctrlintrgen = <FormArray>this.registerForm.controls['presc'];



       var  gen = ctrlgen.value ;
 
        var j:number= 0;

       for(this.i=0;this.i<gen.length;this.i++){



        for(j=0;j<gen.length;j++){
  
          var   frmdata={ frmint1 :gen[this.i].genericid ,frmint2 :gen[j].genericid  ,  frmstr1  :  gen[this.i].productname  ,  frmstr2  :gen[j].productname , createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
          this.userService.checkInteration( JSON.stringify(frmdata) ).subscribe(data => {  this.viewIntertaction(data)  },
           errorCode => console.log(errorCode)); 
              
        
        }


       }


      }
  




      viewIntertaction(data: any){


        this.notificationsComponent.addToast({title:'Error', msg:JSON.stringify(data), timeout: 5000, theme:'default', position:'top-right',type:'error'}); 


      


      }



      
 
     
      remove(id:number){
        const control = <FormArray>this.registerForm.controls['presc'];
  
          control.removeAt(id) ;
     
       }



     

       validnew():Number{
        var  valflag =0 ;
      
      
         return   valflag;
      
      }

      
}