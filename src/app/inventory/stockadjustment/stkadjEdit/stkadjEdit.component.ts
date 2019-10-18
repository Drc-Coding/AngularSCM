
import {Component, OnInit   ,ViewChild
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators  ,  FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {stkadjEditService } from './stkadjEdit.service';


import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;


import { DxDataGridComponent } from "devextreme-angular";





 import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ;



 import { AppComponent } from '../../../app.component';



@Component({
  selector: 'app-stkadjEdit',
  templateUrl: './stkadjEdit.component.html',
  providers: [stkadjEditService   ,    NgbDropdownConfig  ,NotificationsComponent  ,  dateFormatPipe]
  
 
})
export class stkadjEditComponent implements OnInit {

         registerForm: FormGroup;
         id: number;
         
         private sub: any;

         i;
    
         selobj  ;
         editdata=[]  ;
  
      constructor(private userService: stkadjEditService     ,    private   dateformat: dateFormatPipe    , private notificationsComponent:NotificationsComponent    ,private formBuilder: FormBuilder ,config: NgbDropdownConfig , private route: ActivatedRoute   ) {
    
          config.autoClose = false;
      }
    
      ngOnInit() {

          
        this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1    , companyid  :AppComponent.companyID   }  ;
      
        this.sub = this.route.params.subscribe(params => {
          this.id = +params['id']; 
         });


        this.registerForm = this.formBuilder.group({
    
          formno  : [   , []],
          formdate : [   , []],
        

             date: [   , []],
      





          id : [   , []],

          invdispflag: [   , []],

  
        stkadj:  this.formBuilder.array([
          
          ]),
       dummy:  this.formBuilder.array([
          
          ]),

   
        }) ;

      

        var   frmdata={ frmint1 : this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;

      this.userService.viewStockAdjust(JSON.stringify(frmdata)).subscribe(data => {this.viewServStockAdjust(data)},
        errorCode => console.log(errorCode));
     

        this.userService.viewStockAdjAll( JSON.stringify(frmdata) ).subscribe(data => {this.editdata=data   },
          errorCode => console.log(errorCode));

          
  
    $( document ).ready(function() {
  
        
    });
    

    this.init() ;



    if(this.id){
      this.registerForm.get('invdispflag').setValue(1) ; 
    }else{
      this.registerForm.get('invdispflag').setValue(0) ; 
    
    }

    
    
  
      }
         
    
    onSubmit(){
      var answer =  confirm("Save data?");
      

      const control = <FormArray>this.registerForm.controls['stkadj'];



        if (answer) { 
  

      this.userService.saveStockAdjust(JSON.stringify(control.value) ).subscribe(data => {  this.savevalid(data) },
      errorCode => console.log(errorCode));

        }
        
       }
  
       savevalid(data:any) {
        if(data==1){ 
        
              this.notificationsComponent.addToast({title:'Success', msg:'Data  Saved  ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
        }else{
      
          this.notificationsComponent.addToast({title:'Error', msg:'Data Not  saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
      
        }
          }

  

          
          viewEdit(){
            
            var   frmdata={ frmint1 :   this.registerForm.get('id').value  ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;
            
                  this.userService.viewStockAdjust(JSON.stringify(frmdata)).subscribe(data => {this.viewServStockAdjust(data)},
                    errorCode => console.log(errorCode)); 
            
           } 


  
  viewServStockAdjust(data : any){
            
           
        
    var   i   = 0  ;
  
                                                      
   const control = <FormArray>this.registerForm.controls['stkadj'];
                
for (this.i = 0; this.i < data.length; this.i++) {

  i= 3 ;

  control.insert(0, this.formBuilder.group({
   
  
  id : [data[this.i  ][i++  ], []]        ,  
  stkadjid : [data[this.i  ][i++  ], []]       ,    



  drugproductid : [data[this.i  ][i++  ], []]        ,   
  batchrefid : [data[this.i  ][i++  ], []]           ,  
  actualstock   : [data[this.i  ][i++  ], []]   ,  
  physicalboxstock     :    [data[this.i  ][i++  ], []]  ,
  physicalstripstock     :   [data[this.i  ][i++  ], []]   ,



  physicaltabstock    :    [data[this.i  ][i++  ], []]    ,    
  physicalstock   : [data[this.i  ][i++  ], []]   , 
  adjustedstock   :  [data[this.i  ][i++  ], []]   ,   
  actualstkvalue   :  [data[this.i  ][i++  ], []]    ,   
  physicalstkvalue   :  [data[this.i  ][i++  ], []]   , 


  adjustedstkvalue   : [data[this.i  ][i++  ], []]   ,
  remarks   : [data[this.i  ][i++  ], []]     , 
  stkadjno    : [data[this.i  ][i++  ], []]     ,  
  unitstkvalue   :  [data[this.i  ][i++  ], []]     ,       
  boxconvstk  :   [data[this.i  ][i++  ], []]   ,


  
  stripconvstk  :  [data[this.i  ][i++  ], []]   ,
  clientcdate :  [data[this.i  ][i  ], []]   ,
  clientcdate1 :  [data[this.i  ][i++  ], []]   ,

  createdby   : [this.selobj.userid   , []], 
  locrefid   : [this.selobj.locrefid, []],
  locname   : [this.selobj.locname, []],

      countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],


  drugname:  [data[this.i  ][2  ], []]    ,

  dbflag:   [   1  , []],
  delflag  : [ false    , []]    , 
  
  calcflag: [0 , []]   ,

 


   }));


}

this.registerForm.get('id').setValue(data[0][4 ]);
this.registerForm.get('formno').setValue(data[0][0 ]);

this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][1])  ) ;


   }








































 
                    calc( e){
                      
               
                               this.calcAdjustVal()  ; 
                              
                 }
              



 calcAdjustVal(){
  
  
    const control = <FormArray>this.registerForm.controls['stkadj'];
   
  
    var  stk=    control.value    ;  
    var boxqty:number=0;
    var stripqty:number=0;
    var tabqty :number=0;
    var qty :number=0;
  
    var boxconvstk:number =0;
    var stripconvstk:number = 0;
    var actualstock:number=0;
    var physicalstock:number=0;
    var unitstkvalue :number=0;
  
   for (this.i = 0; this.i < stk.length; this.i++) {
  
    if(parseInt(stk[this.i].calcflag)!=1) { 
        
    if( parseInt(stk[this.i].physicalboxstock) ){
      boxqty=  parseInt(stk[this.i].physicalboxstock) ;
     }else{
      boxqty=0;
      }
    
    if( parseInt(stk[this.i].physicalstripstock) ){
      stripqty=  parseInt(stk[this.i].physicalstripstock) ;
    }else{
      stripqty=0;
    }
  
  
    if( parseInt(stk[this.i].physicaltabstock) ){
      tabqty=  parseInt(stk[this.i].physicaltabstock) ;
    }else{
      tabqty=0;
    }


    if(parseInt(  stk[this.i ].boxconvstk) ){
      boxconvstk=parseInt(  stk[this.i ].boxconvstk);

    }else{
      boxconvstk=0;
    }
  
  
    if(parseInt(  stk[this.i ].stripconvstk) ){
      stripconvstk=parseInt(  stk[this.i ].stripconvstk);
  
    }else{
  
      stripconvstk=0;
    }
  
   if( parseInt(stk[this.i].actualstock) ){
    actualstock=  parseInt(stk[this.i].actualstock) ;
   }else{
    actualstock=0;
    }
  
  if( parseInt(stk[this.i].physicalstock) ){
    physicalstock=  parseInt(stk[this.i].physicalstock) ;
  }else{
    physicalstock=0;
  }
            
  
  if( parseInt(stk[this.i].unitstkvalue) ){
    unitstkvalue=  parseInt(stk[this.i].unitstkvalue) ;
  }else{
    unitstkvalue=0;
  }
  
    
  if(physicalstock>actualstock){
   this.notificationsComponent.addToast({title:'Error', msg:'Stk > actual stock', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
  }
  
  physicalstock= boxqty*boxconvstk    + stripqty*stripconvstk  +    tabqty   ;
  
  stk[this.i].physicalstock  = physicalstock  ;
  
  stk[this.i].adjustedstock  = actualstock- physicalstock  ;
  
  stk[this.i].actualstkvalue = actualstock* unitstkvalue  ;
  stk[this.i].physicalstkvalue = physicalstock* unitstkvalue  ;
  
  stk[this.i].adjustedstkvalue = (actualstock* unitstkvalue)  -(physicalstock* unitstkvalue)    ;
  
  
}

   }


   control.patchValue(stk);



   }








   deleteStockAdj(){
     const control = <FormArray>this.registerForm.controls['stkadj'];
  
   var   frmdata={ frmint1 : this.registerForm.get('id').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid   } ;
   
   var answer =  confirm("Delete data?");
   
  if (answer) { 
   this.userService.deleteStockAdj( JSON.stringify(frmdata) ).subscribe(data => {  },
      errorCode => console.log(errorCode));
          
   }
        
    }










  
     remove( ){
      const control = <FormArray>this.registerForm.controls['stkadj'];  


      const controlrem = <FormArray>this.registerForm.controls['dummy']; 

      var  valorg = control.value  ;


      for (this.i = 0; this.i < valorg.length; this.i++) {

        if(((parseInt(valorg[this.i].calcflag)!=1) && (valorg[this.i].delflag!=true ))  ||  (valorg[this.i].dbflag==1) ) {   


         controlrem.insert(0,control.at(this.i))  ;

        }

      }

      while (control.length !== 0) {
        control.removeAt(0) ;
         }
      

        for (this.i = 0; this.i < controlrem.value.length; this.i++) {

         control.insert(0,controlrem.at(this.i))  ;

        
          }

        while (controlrem.length !== 0) {
        controlrem.removeAt(0) ;
         }


       this.init() ;
  


   
     }












     validnew():Number{
      var  valflag =0 ;
    
    
       return   valflag;
    
    }



    
      
    init(){
      const control = <FormArray>this.registerForm.controls['stkadj'];
      var data=[ [],[],[],[],[],[],[],[] ];

     
       
      for (this.i = 0; this.i < data.length; this.i++) {

       control.push(this.formBuilder.group({
         
     
        stkadjautoid 	: [ , []] ,
        stkadjid 	: [ , []] ,
    
        drugproductid 	: [ , []] ,
        batchrefid 	: [ , []] ,
        
        actualstock 	: [ , []] ,
        physicalboxstock 	: [ , []] ,
        physicalstripstock 	: [ , []] ,
        physicaltabstock 	: [ , []] ,
        physicalstock 	: [ , []] ,
        adjustedstock 	: [ , []] ,
        
        actualstkvalue 	: [ , []] ,
        physicalstkvalue 	: [ , []] ,
        adjustedstkvalue 	: [ , []] ,
      
        remarks 	: [ , []] ,
        unitstkvalue 	: [ , []] ,
    
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

          
     
        drugname	: [ , []] ,
     

         dbflag:   [     , []],
         calcflag	: [1 , []] ,

         delflag  : [ false    , []]    , 

         }));


     }

   }


    
                
}












