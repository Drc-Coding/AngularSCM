
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators  , FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;


import {prescEditService} from './prescEdit.service'  ;




@Component({
  selector: 'app-prescEdit',
  templateUrl: './prescEdit.component.html',

  providers: [prescEditService ,NgbDropdownConfig,NotificationsComponent ]
 
})
export class prescEditComponent implements OnInit {



        closeResult: string;
        model: number[];
  
         registerForm: FormGroup;

           
        id: number;
  
        private sub: any;
    
         customers=[];
  
         doctors=[];
  
      
         prcsettings=[];
         


  
  
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

    
      constructor(private userService: prescEditService ,private formBuilder: FormBuilder   ,config: NgbDropdownConfig  , private notificationsComponent:NotificationsComponent ,private route: ActivatedRoute  ) {
    
          config.autoClose = false;
      }
    
      ngOnInit() {
    
  
  
  
        this.selobj  = {   userid  :'0' , locrefid  :'0' , locname  :'0'    }  ;
        
                this.sub = this.route.params.subscribe(params => {
                  this.id = +params['id']; 
                });
  
  
        
  
        this.registerForm = this.formBuilder.group({
          
             
          id: [  , []],    
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
    
  
  
  
        var   frmdata={ frmint1 :  this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
        this.userService.viewCustomers( JSON.stringify(frmdata)  ).subscribe(data => {      this.customers= data    },
          errorCode => console.log(errorCode));  
          this.userService.viewDoctors( JSON.stringify(frmdata)).subscribe(data => {      this.doctors= data    },
            errorCode => console.log(errorCode));  
  
















            
          this.userService.viewPresc( JSON.stringify(frmdata)).subscribe(data => {      this.viewServPresc(data)    },
          errorCode => console.log(errorCode)); 

              this.userService.viewPrescProducts( JSON.stringify(frmdata)).subscribe(data => {     this.viewServPrescProducts(data)     },
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
                    
                      id:  [ , []] ,
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
    
  
                   /*      if(this.prcsettings[0][1]==1){
                        
                            unitprice=   data[this.i][5  ]  ;
                            }else if(this.prcsettings[0][1]==2){
                              unitprice=    data[this.i][15   ]   ;
                        
                            }else if(this.prcsettings[0][1]==3){
                        
                              unitprice=   data[this.i][16   ]   ;
                           }else if(this.prcsettings[0][1] ==4){
                            
                            unitprice=   data[this.i][17   ]   ;
                           }else if(this.prcsettings[0][1]==5){
                            
                            unitprice=  data[this.i][18   ]   ;
                            }  */
  
  
                            unitprice=  20 ;
  
                  
                     
                        control.insert(0,this.formBuilder.group({
                        
                           id:  [ , []] ,
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













                         clientcdate  :  [ , []]   ,
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
              
          var answer =  confirm("Save data?");
                  
            if (answer && valflag==0) { 
           this.userService.savePrescription(JSON.stringify(this.registerForm.value)).subscribe(data => {this.savePrescProd(data)   },
             errorCode => console.log(errorCode));
             }
    
      
    }
      
  
  
  
  
    savePrescProd(data:any){
  
    const  control = <FormArray>this.registerForm.controls['presc'];
  
          this.userService.savePrescProd(JSON.stringify(control.value) ) .subscribe(data => {this.savevalid()},
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








      
      viewServPresc(data : any){
    
    
        var i=2 ;  
    
        this.registerForm.patchValue({
   	 
          id:data[0][i++   ] ,       
          prescdate:data[0][i++   ] ,   
          docrefid:data[0][i++   ] ,   
          custrefid:data[0][i++   ] ,   
          age:data[0][i++   ] ,   
          gender:data[0][i++   ] ,   
          weight:data[0][i++   ] ,   
          temperature:data[0][i++   ] ,   
          blood_sugar:data[0][i++   ] ,   
          blood_pressure:data[0][i++   ] ,   
          diagnosis:data[0][i++   ] ,   
          remarks:data[0][i++   ] ,   
          consultation_fee:data[0][i++   ] ,   
          next_visit:data[0][i++   ] ,   
          del_flag:data[0][i++   ] ,   
    
          clientcdate  :  [ , []]   ,
         createdby:   this.selobj .userid,
         locrefid:   this.selobj .locrefid,
         locname:  this.selobj.locname,
          })  ;
    
    
    
    
      }
    

  
    
      viewServPrescProducts(data:any) {
    
        var i=0 ;  

  
                                  
          const control = <FormArray>this.registerForm.controls['presc'];
          
    for (this.i = 0; this.i < data.length; this.i++) {
    
      i=1 ;  
      
    control.push(this.formBuilder.group({

      id : [data[this.i][i++ ], []] ,     
      prsrefid : [data[this.i][i++ ], []] ,   
      drugproductid : [data[this.i][i++ ], []] ,       
    
                  

     morning  : [data[this.i][i++ ], []] ,  
     afternoon  : [data[this.i][i++ ], []] ,  
     evening  : [data[this.i][i++ ], []] ,  
     night  : [data[this.i][i++ ], []] ,  
     days  : [data[this.i][i++ ], []] ,  
     food  : [data[this.i][i++ ], []] ,  
     dose  : [data[this.i][i++ ], []] ,  
     total_medications  : [data[this.i][i++ ], []] ,  
    
  

     bfaf : [data[this.i][i++ ], []] ,  
     fdinteraction : [data[this.i][i++ ], []] ,  
     



























     
     clientcdate  :  [ , []]   ,
     createdby   : [this.selobj.userid   , []], 
     locrefid   : [this.selobj.locrefid, []],
     locname   : [this.selobj.locname, []],



     drgtyp : [data[this.i][i++ ], []] ,      
     convfactor : [data[this.i][i++ ], []] ,       
     genericid : [data[this.i][i++ ], []] , 

     productname : [data[this.i][0], []] ,    
	 
 
    
    }));
    
    
    }
    
    
 
  }



  
  remove(id:number){
    const control = <FormArray>this.registerForm.controls['presc'];

    var  val =control.at(id).value ;
    if(val.dbflag!=1){
      control.removeAt(id) ;
    }

   }


  
   

   validnew():Number{
    var  valflag =0 ;
  
  
     return   valflag;
  
  }

  

}