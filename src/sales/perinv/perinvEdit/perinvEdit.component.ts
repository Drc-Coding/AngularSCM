
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators ,  FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {perinvEditService} from './perinvEdit.service'  ;
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';



import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;




 import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ;







@Component({
  selector: 'app-perinvEdit',
  templateUrl: './perinvEdit.component.html',

    providers: [perinvEditService   ,    NgbDropdownConfig  , NotificationsComponent  , dateFormatPipe]
 
})
export class perinvEditComponent implements OnInit {

  
  
  
           registerForm: FormGroup;
           id: number;
           private sub: any;
  
           slsinvno=[];  
    
           i;
      
           autoincr  ;
    
           autoval =  0    ;
           
           autoinc =  0    ;
    
  
          autodata =[]  ;

          autodatacopy =[] ;
  
          selobj  ;
          drgid;

          editdata=[]  ;

      constructor(private userService: perinvEditService   
  ,    private   dateformat: dateFormatPipe    ,private formBuilder: FormBuilder ,config: NgbDropdownConfig , private notificationsComponent:NotificationsComponent    , private route: ActivatedRoute  ) {
    
          config.autoClose = false;
      }
    
      ngOnInit() {
    

       
         this.selobj  = {   userid  :'0' , locrefid  :'0' , locname  :'0'    }  ;
  
         this.sub = this.route.params.subscribe(params => {
          this.id = +params['id']; 
         });
         
  
        this.registerForm = this.formBuilder.group({
                      
          id: [  , []],    
          salesbilltype: [  , []],    
          salesbillno: [  , []], 
          billdate: [  , []],     
          customerrefid: [  , []],
          doctorrefid: [  , []],  
          totalamount: [  , []],    
          totalitems: [  , []],    
          totaldiscount: [  , []],   
          taxableamt: [  , []],    
          totaltaxamt: [  , []],    
          totalinclamt: [  , []], 
          totalexclamt: [  , []],     
          grandtotal : [  , []], 
         

    
          createdby:   [this.selobj .userid , []]      ,
          locrefid:   [ this.selobj .locrefid, []]      ,
          locname:     [ this.selobj .locname  , []]     ,
   
     
    
    















         customername: [, []]  ,
  
         invoiceno: [, []]  ,
  
         autonamenew: [, []]  ,
         subtotal  : [, []]  ,
         roundoff  : [, []]  ,
  
         prescpath:  [, []]  ,
         paymenttype:  [, []]  ,
         ptrefno :  [, []]  ,
         

         clientcdate: [ this.dateformat.transform04()   , []],
         clientcdate1: [ this.dateformat.transform04()   , []],
             date: [   , []],



             invdispflag: [  , []],

             perfomaflag: [ 2 , []],
             
         invoice:  this.formBuilder.array([
         
         ]),
         freeflag : [  1  , []]  ,
  
        }) ;
   
  
  
  
        var   frmdata={ frmint1 : this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
       this.userService.viewSalesInvoices( JSON.stringify(frmdata)).subscribe(data =>{this.slsinvno = data },
             errorCode => console.log(errorCode));
        
          this.userService.viewSISalesInvoice( JSON.stringify(frmdata)  ).subscribe(data => {this.viewServSalesInvoice(data)      },
              errorCode => console.log(errorCode));
           
          this.userService.viewSIProducts( JSON.stringify(frmdata) ).subscribe(data => {this.viewServSIProducts(data)},
                      errorCode => console.log(errorCode));
                
              
               
          
                      this.userService.viewSalesInvoiceAll( JSON.stringify(frmdata) ).subscribe(data => {this.editdata=data   },
                        errorCode => console.log(errorCode));
  
  
  
  
  
  
    $( document ).ready(function() {
    
    
    });
    
      $('.boxname ').hide()  ;
  
      this.init() ;

      if(this.id){
        this.registerForm.get('invdispflag').setValue(1) ; 
      }else{
        this.registerForm.get('invdispflag').setValue(0) ; 
      
      }

      
      
         
      }
  
  
  
  
  
  
  
  
      autofocusin(){
  
  
  
        this.autoincr = setInterval(() => {
  
          if(this.registerForm.get('autonamenew').value){
  
         
            $('#autolist').show()   ;
  
            
            if(this.autoval== this.registerForm.get('autonamenew').value){
              
                     
                      this.autoinc+= 1 ;
                      
              
              } else{
              
                      this.autoinc = 0  ;
              }
                    
       
              this.autoval= this.registerForm.get('autonamenew').value  ;
  
           if(this.autoinc<1){
            var   frmdata={ frmint1 : '' ,  frmstr1 : this.registerForm.get('autonamenew').value , createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
          this.userService.viewSIProductNames( JSON.stringify(frmdata)  ).subscribe(data => {      this.autodata= data    },
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
              
              $('.boxname ').show()  ;
      
               $('#autolistnew  ul   li:nth-child(1)   input:nth-child(1) ').focus()  ;
             
               }
        
            
      
              }
  
  
  
  
  
              
  viewStock(event: KeyboardEvent,stktype: number){
    
           
              if(event.keyCode == 13){
    
             var   drg=   this.autodatacopy[this.drgid ][1]  ;
         
             var  bth  =   this.autodatacopy[this.drgid ][2]  ;
             var   frmdata={ frmint1 : drg ,  frmint2 : bth ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
                this.userService.viewSIProductName( JSON.stringify(frmdata) ).subscribe(data => {      this.viewServWareHouseStock(data ,stktype) },
                 errorCode => console.log(errorCode));
                   
                 $("#autoname").focus();
                  $('.boxname ').hide()  ;
           
                 this.registerForm.get('autonamenew').setValue('')  ;
    
                 this.autodata=[]  ;

                 this.autodatacopy=[]  ;
             }
    
    
    }
  
  
    
  
  
    viewServWareHouseStock(data : any , stktype : any ){
  
      var conversionfactor  ;
  
  
      const control = <FormArray>this.registerForm.controls['invoice'];
  
          if(stktype==1){
        
              conversionfactor=data[0][11] ;
            }else if(stktype==2){
              conversionfactor=  data[0][12 ] ;
        
            }else if(stktype==3){
        
              conversionfactor= 1   ;
            }
      
        for (this.i = 0; this.i < data.length; this.i++) {
      
  
    
  
          control.insert(0, this.formBuilder.group({
          
            id:  [ , []] ,
            salesrefid: [ , []] ,
            drugproductid:  [data[this.i][ 1 ] , []]  , 
            batchrefid: [data[this.i][ 2 ] , []]  , 
        
        
      
           totalqty: [ 0  , []]  , 
           totalfreeqty: [ , []] ,
           unitprice:   [data[this.i][5]  , []]  ,          
           mrp:  [data[this.i][5  ] , []]   ,
           expirydate:  [ , []] ,
         
        
           unitdiscount:  [ , []]  , 
           unitvat:  [data[this.i][ 10 ] , []] ,
           unitsgst: [data[this.i][ 6 ] , []]  , 
           unitcgst:  [data[this.i][7  ] , []] , 
           unitigst:   [data[this.i][8  ] , []] , 
     
        
           discountamt : [ , []] ,
           vatamt: [ , []] ,
           sgstamt: [ , []] ,
           cgstamt: [ , []] ,
           igstamt: [ , []] ,
      
    
    
           subtotal: [ , []] ,
       
           clientcdate: [ this.dateformat.transform04()   , []],
           clientcdate1: [ this.dateformat.transform04()   , []],
           createdby   : [this.selobj.userid   , []], 
           locrefid   : [this.selobj.locrefid, []],
           locname   : [this.selobj.locname, []],
      
           drgtyp:stktype ,
           gstflag: [data[this.i][13  ] , []] ,
           frgstflag:  [data[this.i][ 14 ] , []]  ,
           freeflag:  [this.registerForm.get('freeflag').value    , []]  ,
  
           priceflag: [ , []],
           discflag:   [ , []],
           discautoflag:   [ , []],
  
          
           convfactor:   [ conversionfactor, []]  ,
  
           indvqty: [ , []] ,
           indvfreeqty: [ , []] ,
  
           crntstkqty: [data[this.i][ 3 ] , []]  ,
           productname: [data[this.i][ 0 ] , []]   ,



           calcflag: [0 , []]   ,

           dbflag:   [ , []],

           delflag  : [ false   , []]    , 

           perfomaflag: [ 2 , []],
  
          }));
  
          
  
    
  
  
            
      
        }
      
        }
  
  
  
  
  
  onSubmit(){
    
        var  valflag:Number =0 ;
    
          valflag  =this.validnew( )  ;

        const control = <FormArray>this.registerForm.controls['invoice'];
  

       var answer =  confirm("Save data?");
               
         if (answer  && valflag==0) { 
        this.userService.saveSalesInvoice(JSON.stringify(this.registerForm.value)   ).subscribe(data => {this.saveSIProducts(data)},
          errorCode => console.log(errorCode));
          }
    
  
      
    }
      
  
  
  saveSIProducts(data:any){
  
  
   const control = <FormArray>this.registerForm.controls['invoice'];

   if(data==1){ 
    this.userService.saveSIProducts(JSON.stringify( control.value ) ) .subscribe(data => {this.savevalid(data)},
    errorCode => console.log(errorCode));
   }
  
  }
  
  

    
  
  onSubmit1(){
    
        var  valflag:Number =0 ;
    
          valflag  =this.validnew( )  ;

        const control = <FormArray>this.registerForm.controls['invoice'];
  


       var answer =  confirm("Save data?");
               
         if (answer  && valflag==0) { 
        this.userService.saveSalesInvoice1(JSON.stringify(this.registerForm.value)   ).subscribe(data => {this.saveSIProducts1(data)},
          errorCode => console.log(errorCode));
          }
    
  
      
    }
      
  
  
    saveSIProducts1(data:any){
  
  
   const control = <FormArray>this.registerForm.controls['invoice'];

   if(data==1){ 
    this.userService.saveSIProducts1(JSON.stringify( control.value ) ) .subscribe(data => {this.savevalid(data)},
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
  
       calc( e){
    
         
    if(e.keyCode == 9){
      
  
          this.calcGST()  ; 
  
    }
    
          }
  
  
  
   
  
          
  
  
          calcGST(){
            
           
           
          
  
       const control = <FormArray>this.registerForm.controls['invoice'];
            
       var sprod=control.value ;
     
  
     
       var preqty:number=0;
       var preprodprice:number=0;
     
       var prefree:number=0;
        var premrp:number=0;
       var predisc :number=0;
       var presgst:number =0;
       var precgst:number =0;
       var preigst:number = 0;
     
       var  pretotprice:number =0;
        var pretotfreeprice:number =0;
        var pretotmrp:number =0;
     
       var discount:number =0;
       var sgstamt :number=0;
       var cgstamt :number =0;
       var igstamt :number =0;
     
     
       var totdiscount :number = 0;
       var totsgstamt:number  =0;
       var totcgstamt :number =0;
       var totigstamt :number =0;
     
        var totutgstamt :number =0;
     
       var totgstamt:number  =0;
     
       var totaltaxableamt :number = 0;
    
       var totaltaxamt :number = 0;
     
       var totalincamt :number = 0;
     
     
       var totalexclamt :number = 0;
     
     
       var grandtotal :number = 0;
     
     
       var totalproduct :number = 0;
     
       var totqty :number =0;
       var subtotal:number  =0;
       var convfactor:number  =0;
       var gstflag:number  =0;
  
       var  frgstflag:number  =0;
       var  freeflag:number  =0;
       
       var prevat:number =0;
       var totvatamt:number  =0;
       var  vatamt :number=0;
       
       var  prodcount :number=0;
  
        var inv  ;
     
       
  
  
    
      
        for (this.i = 0; this.i < sprod.length; this.i++) {
          
          
         if(parseInt(sprod[this.i].calcflag)!=1) { 
            
               
             if(parseInt(sprod[this.i].indvqty) ){
              preqty=parseInt(sprod[this.i].indvqty);
          
            }else{
              preqty=0;
            }
            
          
            if(parseInt(sprod[this.i].indvfreeqty) ){
             prefree=parseInt(sprod[this.i].indvfreeqty);
          
              }else{
             prefree=0;
              }
          
                
                if(parseInt(sprod[this.i].unitprice) ){
                  preprodprice=parseInt(sprod[this.i].unitprice);
            
                }else{
                  preprodprice=0;
                }
            
            
           
            
               if(parseInt(sprod[this.i].mrp) ){
                  premrp=parseInt(sprod[this.i].mrp);
            
                }else{
                  premrp=0;
                }
            
            
            
                if(parseInt(sprod[this.i].unitdiscount)){
                  predisc= parseInt(sprod[this.i].unitdiscount);
            
                }else{
                  predisc=0;
                }
            
              
                if( parseInt(sprod[this.i].unitvat)){
                  prevat=parseInt(sprod[this.i].unitvat) ;
              
              
                }else{
                  prevat=0;
              
                
                }
  
  
                if( parseInt(sprod[this.i].unitsgst)){
                  presgst=parseInt(sprod[this.i].unitsgst) ;
              
            
                }else{
                  presgst=0;
            
                
                }
                if(parseInt(sprod[this.i].unitcgst)){
                  precgst=parseInt(sprod[this.i].unitcgst)  ;
              
            
                }else{
                  precgst=0;
            
                
                }
            
                if( parseInt(sprod[this.i].unitigst) ){
                  preigst=  parseInt(sprod[this.i].unitigst) ;
              
            
                }else{
                  preigst=0;
            
                
                }
            
            
                if( parseInt(sprod[this.i].gstflag) ){
                  gstflag=  parseInt(sprod[this.i].gstflag) ;
              
            
                }else{
                  gstflag=0;
            
                
                }
            
                if( parseInt(sprod[this.i].frgstflag) ){
                  frgstflag=  parseInt(sprod[this.i].frgstflag) ;
               
              
                 }else{
                  frgstflag=0;
              
                 
                 }
              
                 if( parseInt(sprod[this.i].freeflag) ){
                  freeflag=  parseInt(sprod[this.i].freeflag) ;
               
              
                 }else{
                  freeflag=0;
              
                 
                 }
                 
          
             
                if( parseInt(sprod[this.i].convfactor) ){
                  convfactor=  parseInt(sprod[this.i].convfactor) ;
              
            
                }else{
                  convfactor=0;
            
                
                }
            
                if(freeflag == 0){
                        sprod[this.i].indvfreeqty=0  ;
                        discount=0 ;
                        prefree=0 ;
               } else {
      
                prodcount+=1  ;
               }
                
            
                
                  sprod[this.i].subtotal= preqty* preprodprice;
            
                  sprod[this.i].totalqty= convfactor* preqty;
                  sprod[this.i].totalfreeqty= convfactor* prefree;
            
                  pretotprice=  preqty* preprodprice;
            
                  discount= (pretotprice *predisc)/100;
          
          
           
          
                  if(gstflag == 0) {
                    if(frgstflag == 0) {
          
                     vatamt=   ((pretotprice-discount) *prevat)/100;
          
                     sgstamt=   ((pretotprice-discount) *presgst)/100;
                     cgstamt=   ((pretotprice-discount) *precgst)/100;
                     igstamt=   ((pretotprice-discount) *preigst)/100;
          
                 
                             
                      }
                  else {
          
                   
                  vatamt=   (((preqty+prefree)*preprodprice-discount) *prevat)/100;  
          
                  sgstamt=   (((preqty+prefree)*preprodprice-discount) *presgst)/100;  
                  cgstamt=   (((preqty+prefree)*preprodprice-discount) *precgst)/100;  
                  igstamt=   (((preqty+prefree)*preprodprice-discount) *preigst)/100;        
          
          
                     }                     
                       }
                  else {
          
                   vatamt  =  (preqty+prefree)*(premrp-(premrp/(1+prevat/100)))   ; 
          
                   sgstamt  =  (preqty+prefree)*(premrp-(premrp/(1+presgst/100)))   ; 
                   cgstamt  =  (preqty+prefree)*(premrp-(premrp/(1+precgst/100)))   ;   
                   igstamt  =  (preqty+prefree)*(premrp-(premrp/(1+preigst/100)))   ;             
          
                 }
          
          
            
                 if(freeflag == 1  || freeflag == 0) {
            
                  sprod[this.i].vatamt=vatamt;  
          
                  sprod[this.i].sgstamt=sgstamt;
                  sprod[this.i].cgstamt=cgstamt;
                  sprod[this.i].igstamt=igstamt;
            
            
                  totvatamt+=vatamt   ;
                  
                  totsgstamt+=sgstamt   ;
                  totcgstamt+= cgstamt   ;
                  totigstamt+=igstamt    ;
                    
          
                 } 
                 
                 
                 if(freeflag == 1){
          
          
            
                   totalproduct=prodcount ;
                   totqty+=preqty;
                   subtotal+=pretotprice;
                   totdiscount+=discount  ;
          
            
                  }
            

                }
            
                }
  
  
  
  
  
       
           totgstamt =totsgstamt+totcgstamt+totigstamt;
       
            grandtotal=subtotal +totgstamt-totdiscount  ;
     
           if(gstflag==0){
     
            totalincamt=grandtotal  ;
     
           } else{
       
             totalexclamt=grandtotal  ;
     
             }
     
     
             totaltaxableamt=subtotal  ;
     
             totaltaxamt=  totgstamt  ;
     
             control.patchValue(sprod);
                    this.registerForm.patchValue({
                           
                     
                     totalitems:  prodcount , 
                     totaldiscount:  totdiscount ,
                     totaltaxamt: totaltaxamt ,
                     taxableamt:  totaltaxableamt ,            
                     totalinclamt:totalincamt ,
                     totalexclamt: totalexclamt , 
                     grandtotal: grandtotal ,
                 
        
                     createdby:   this.selobj .userid,
                     locrefid:   this.selobj .locrefid,
                     locname:  this.selobj.locname,      
                     totalamount:   subtotal ,
             
                    });
     
     
  
     
     
     
   
     }
  
  
     viewEdit() {
        
  
     this.viewSISalesInvoice();
  
    
    this.viewSIProducts();
    
  
   }
  
     viewSISalesInvoice() {
      var   frmdata={ frmint1 : this.registerForm.get('id').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
    this.userService.viewSISalesInvoice( JSON.stringify(frmdata)  ).subscribe(data => {this.viewServSalesInvoice(data)   },
      errorCode => console.log(errorCode));
  
  
     }
  
  
     viewSIProducts() {
      var   frmdata={ frmint1 : this.registerForm.get('id').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
            this.userService.viewSIProducts( JSON.stringify(frmdata) ).subscribe(data => {this.viewServSIProducts(data)},
              errorCode => console.log(errorCode));
        
      
       }
  
  
   viewServSalesInvoice(data : any){
  
    var  v   = 0  ;
  
 
     this.registerForm.patchValue({




     id: data[0][v++   ]  ,    
    salesbilltype: data[0][v++   ]   ,    
    salesbillno: data[0][v++   ]   , 
    billdate: data[0][v++   ]  ,     
    customerrefid: data[0][v++   ]  ,
    doctorrefid: data[0][v++   ]  ,  
    totalamount: data[0][v++   ]  ,    
    totalitems: data[0][v++   ]  ,    
    totaldiscount:  data[0][v++   ]  ,  
    taxableamt: data[0][v++   ]  ,    
    totaltaxamt:  data[0][v++   ]  ,  
    totalinclamt: data[0][v++   ]  , 
    totalexclamt: data[0][v++   ]  ,
     grandtotal : data[0][v++   ]  , 

  
 
     createdby:  data[0][v++   ]  ,  
     locrefid:   this.selobj .locrefid,
     locname:  this.selobj.locname,
    
         

      prescpath: data[0][v++   ]  , 
     paymenttype: data[0][v++   ]  ,
     ptrefno : data[0][v++   ]  , 

     dummy1 : data[0][v++   ]  , 
     clientcdate  : data[0][v   ]  , 
     clientcdate1  : data[0][v++   ]  , 

      date  :data[0][v++   ]   , 



     });
  
  



     }
  
  
  
  
          viewServSIProducts(data : any){
  


  
     const control = <FormArray>this.registerForm.controls['invoice'];
  
     while (control.length !== 0) {
      control.removeAt(0) ;
       }
  



       
  
       this.init() ;
  
        var  v   = 0  ;
  
    for (this.i = 0; this.i < data.length; this.i++) {
  
  
      v =  1  ;
  
      control.insert(0,  this.formBuilder.group({
   
        id:  [ data[this.i][v++    ] , []]  ,  
        salesrefid:  [ data[this.i][v++    ] , []]  ,  
        drugproductid:  [ data[this.i][v++    ] , []]  ,   
        batchrefid:  [ data[this.i][v++    ] , []]  ,  
        totalqty:  [ data[this.i][v++    ] , []]  ,  
        totalfreeqty: [ data[this.i][v++    ] , []]   ,
        unitprice:  [ data[this.i][v++    ] , []]  , 
        mrp:  [ data[this.i][v++    ] , []]  , 
        expiry:  [ data[this.i][v++    ] , []]  , 
        unitdiscount:  [ data[this.i][v++    ] , []]  ,  
        unitvat:  [ data[this.i][v++    ] , []]  ,     
        unitsgst:  [ data[this.i][v++    ] , []]  ,   
        unitcgst:  [ data[this.i][v++    ] , []]  , 
        unitigst:  [ data[this.i][v++    ] , []]  , 
        discountamt:[ data[this.i][v++    ] , []]   ,
        vatamt:  [ data[this.i][v++    ] , []]  , 
        sgstamt:  [ data[this.i][v++    ] , []]  ,   
        cgstamt:  [ data[this.i][v++    ] , []]  ,    
        igstamt:  [ data[this.i][v++    ] , []]  , 
        subtotal:  [ data[this.i][v++    ] , []]  ,  
        
     
        createdby   : [this.selobj.userid   , []], 
        locrefid   : [this.selobj.locrefid, []],
        locname   : [this.selobj.locname, []],
        drgtyp:[ data[this.i][v++    ] , []]  ,
        gstflag:[ data[this.i][v++    ] , []]  ,
        frgstflag:[ data[this.i][v++    ] , []]  ,
        freeflag:[ data[this.i][v++    ] , []]  ,
        priceflag:[ data[this.i][v++    ] , []]  ,
        discautoflag:  [ data[this.i][v++    ] , []] ,
        indvqty: [ data[this.i][v++    ] , []]  ,
        indvfreeqty:[ data[this.i][v++    ] , []]   ,
        convfactor:  [ data[this.i][v++    ] , []]   ,
        crntstkqty  : [ data[this.i][v++    ] , []]   ,
        clientcdate : [ data[this.i][v    ] , []]   ,
        clientcdate1 : [ data[this.i][v++    ] , []]   ,

        productname: [ data[this.i][0   ] , []]    ,
        calcflag: [0 , []]   ,
        dbflag:   [ 1 , []],
   
        delflag  : [ false   , []]    , 

        perfomaflag: [ 2 , []],
     
  


  
  
     
     
     
    

      

    
    
 
   










        
   
  
      }));
  
  

        
  
    }
  

 



    }
  
  
  
    
    init(){
      const control = <FormArray>this.registerForm.controls['invoice'];
      var data=[ [],[],[],[],[],[],[],[] ];
       
      for (this.i = 0; this.i < data.length; this.i++) {
  
       control.push(this.formBuilder.group({
         
           salesprdtid:  [ , []] ,
           salesrefid: [ , []] ,
           drugproductid:  [ , []] ,
           batchrefid:[ , []] ,
       
       
     
          totalqty: [ , []] ,
          totalfreeqty: [ , []] ,
          unitprice:   [ , []] ,      
          mrp: [ , []] ,
          expirydate:  [ , []] ,
        
       
          unitdiscount:  [ , []] ,
          unitvat:  [ , []] ,
          unitsgst: [ , []] ,
          unitcgst:  [ , []] ,
          unitigst:   [ , []] , 
    
       
          discountamt : [ , []] ,
          vatamt: [ , []] ,
          sgstamt: [ , []] ,
          cgstamt: [ , []] ,
          igstamt: [ , []] ,
     
   
   
          subtotal: [ , []] ,
      
          clientcdate: [ this.dateformat.transform04()   , []],
          clientcdate1: [ this.dateformat.transform04()   , []],

          createdby   : [ , []] ,
          locrefid   : [ , []] ,
          locname   : [ , []] ,
     
          drgtyp: [ , []] ,
          gstflag: [ , []] ,
          frgstflag:  [ , []]  ,
          freeflag:  [    , []]  ,
  
          priceflag: [ , []],
          discautoflag:   [ , []],
          convfactor:   [ , []]  ,
          indvqty: [ , []] ,
          indvfreeqty: [ , []] ,
         
        
  
   
  
          crntstkqty: [ , []]  ,
          productname: [, []]   ,

          dbflag:   [ , []],
  

          delflag  : [ false   , []]    , 

          calcflag: [1  , []]   ,

          perfomaflag: [ 2 , []],

         }));
  
  
     }
  
  
  
   }
  
  
  
  
     deleteSalesInvoice(){
        
    
     var   frmdata={ frmint1 : this.registerForm.get('id').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;

     var answer =  confirm("Delete data?");
     
    if (answer) { 
      this.userService.deleteSalesInvoice( JSON.stringify(frmdata) ).subscribe(data => {  }, 
        errorCode => console.log(errorCode));
          
      }
          
      }
  


      
     remove(id:number){
      const control = <FormArray>this.registerForm.controls['invoice'];

      var  val =control.at(id).value ;
      if(val.dbflag!=1){
        control.removeAt(id) ;
      }

     }


     



     validnew():Number{
      var  valflag =0 ;
    
    

      
      const control = <FormArray>this.registerForm.controls['invoice'];
      var   invoicedata=  control.value  ;
        

              

     for (this.i = 0; this.i < invoicedata.length; this.i++) {
                                
                                                                                                                                                     
                                                                                          
          if(parseInt(invoicedata[this.i].totalqty  ) > parseInt(invoicedata[this.i].crntstkqty  )){
            valflag=1 ;

        this.notificationsComponent.addToast({title:'Error', msg:'Qty > Stkqty  ', timeout: 5000, theme:'default', position:'top-right',type:'error'});     
          }       

          }


       return   valflag;
    
    }



}