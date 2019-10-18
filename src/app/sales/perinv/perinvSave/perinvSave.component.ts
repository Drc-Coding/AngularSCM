
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators  ,  FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {perinvSaveService} from './perinvSave.service'  ;
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;



import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 






@Component({
  selector: 'app-perinvSave',
  templateUrl: './perinvSave.component.html',

  providers: [perinvSaveService   ,    NgbDropdownConfig  , NotificationsComponent  , dateFormatPipe]
 
})
export class perinvSaveComponent implements OnInit {



  
         registerForm: FormGroup;
    
         customers=[];
  
         doctors=[];
  
         sinvoicedata=[];
  
         prcsettings=[];
  
  
  
         i;
  
      
       
         autoincr  ;
     
         autoval =  0    ;
            
         autoinc =  0    ;
  
         autodata =[]  ;
  
   
        autodatacopy =[]  ;
  
        selobj  ;
  
        drgid;
  
  
        ignoreflag   ;
  
      
        
        priceselflag  ;
       
 
  
    
      constructor(private userService: perinvSaveService ,    private   dateformat: dateFormatPipe ,private formBuilder: FormBuilder   ,config: NgbDropdownConfig  , private notificationsComponent:NotificationsComponent    ) {
    
          config.autoClose = false;
      }
    
      ngOnInit() {
    
  

  
        this.selobj  = {   userid  :'0' , locrefid  :'0' , locname :'0'    }  ;
  
  
  
  
        
  
        this.registerForm = this.formBuilder.group({
          
             
          salesbillid: [  , []],    
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
  
         autonamenew : [, []]  ,
  
         subtotal  : [, []]  ,
         roundoff  : [, []]  ,
         tempstock: [, []]  ,
  
         freeflag: [, []]  ,
     
         discautoflag: [, []]  ,
  
         custdiscamt: [, []]  ,

         prescpath:  [, []]  ,
         paymenttype:  [, []]  ,
         ptrefno :  [, []]  ,
  

         clientcdate: [ this.dateformat.transform04()   , []],
         clientcdate1: [ this.dateformat.transform04()   , []],

          date: [this.dateformat.transform05(Date.now())   , []],
             
         invoice:  this.formBuilder.array([
          
          ]),
   
  
        }) ;
    
  
  
  
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
        this.userService.viewCustomers( JSON.stringify(frmdata)  ).subscribe(data => {      this.customers= data    },
          errorCode => console.log(errorCode));  
          this.userService.viewDoctors( JSON.stringify(frmdata)).subscribe(data => {      this.doctors= data    },
            errorCode => console.log(errorCode));  
  
  
            this.userService.viewPriceSettings( JSON.stringify(frmdata)).subscribe(data => {      this.prcsettings= data   },
              errorCode => console.log(errorCode)); 
  
  
  
    
    $( document ).ready(function() {
  
  
   
    
    });
    
  
    
    $('.boxname ').hide()  ;
         
    this.registerForm.get('freeflag').setValue(1);
  

    this.init() ;

    
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
          this.userService.viewSIProductNames( JSON.stringify(frmdata) ).subscribe(data => {      this.autodata= data    },
          errorCode => console.log(errorCode));  
  
  
  
              }
  
       this.viewvalue(this.autodata);
  
      
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
                            this.userService.viewSIProductName( JSON.stringify(frmdata) ).subscribe(data => {      this.viewServWareHouseStock(data ,stktype )        },
                             errorCode => console.log(errorCode));
                        
                             $("#autoname").focus();
                         
                              $('.boxname ').hide()  ;
                       
                             this.registerForm.get('autonamenew').setValue('')  ;
                
                             this.autodatacopy=[]  ;
                         }
                
                
                
                }
  
  
  
  
  
    
                viewvalue(data:any){
            
                
                 var r=0  ;
                  
  
                  for (this.i = 0; this.i < data.length; this.i++) {
  
                   r=this.i+1 ;
  
  
                     if(data[this.i][3]>0 ){
                    
              //        $("#autolist li:nth-child("+r+") input").css("background-color", "#FF00FF");
  
  
                     }else if(data[this.i][3]<data[this.i][4]){
  
  
  
        //              $("#autolist li:nth-child("+r+") input").css("background-color", "#87CEEB");
  
                     }else if(data[this.i][5]>0){
                      
         //             $("#autolist li:nth-child("+r+") input").css("background-color", "#8B008B");
  
                      } 
  
  
  
  
  
  
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
                     discflag:   [ , []],
                     discautoflag:   [ , []],
  
                    
                     convfactor:   [ , []]  ,
  
                     indvqty: [ , []] ,
                     indvfreeqty: [ , []] ,
  
                     crntstkqty: [ , []]  ,
                     productname: [, []]   ,
  
            
                       calcflag: [1  , []]   ,
  
                    }));
  
  
                }
  
           
  
              }
          
  
              
                viewServWareHouseStock(data : any , stktype : any ){
                  
                  var conversionfactor  ;
                  var unitprice  ;
                  const control = <FormArray>this.registerForm.controls['invoice'];
                   
               if(stktype==1){
            
                  conversionfactor=data[0][11] ;
                }else if(stktype==2){
                  conversionfactor=data[0][12] ;
            
                }else if(stktype==3){
            
                  conversionfactor= 1   ;
                }
        
  
  
  
  
  
  
  
  
          /*      if(control.value[0].apprflag==1){
  
                  while (control.length !== 0) {
                    control.removeAt(0) ;
                     }
                
  
                }  */
              
                  
                    for (this.i = 0; this.i < data.length; this.i++) {
    
  
                         if(this.prcsettings[0][1]==1){
                        
                            unitprice=   data[this.i][5  ]  ;
                            }else if(this.prcsettings[0][1]==2){
                              unitprice=    data[this.i][15   ]   ;
                        
                            }else if(this.prcsettings[0][1]==3){
                        
                              unitprice=   data[this.i][16   ]   ;
                           }else if(this.prcsettings[0][1] ==4){
                            
                            unitprice=   data[this.i][17   ]   ;
                           }else if(this.prcsettings[0][1]==5){
                            
                            unitprice=  data[this.i][18   ]   ;
                            }
  
  
                            unitprice=  20 ;
  
                  
                     
                        control.insert(0,this.formBuilder.group({
                        
                          salesprdtid:  [ , []] ,
                          salesrefid: [ , []] ,
                          drugproductid:  [data[this.i][ 1 ] , []]  , 
                          batchrefid: [data[this.i][ 2 ] , []]  , 
                      
                      
                    
                         totalqty: [ 0  , []]  , 
                         totalfreeqty: [ , []] ,
                         unitprice:   [unitprice , []]  ,          
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
                         discautoflag:   [ , []],
                         convfactor:   [ conversionfactor, []]  ,
                         indvqty: [ , []] ,
                         indvfreeqty: [ , []] ,
                       
  
                         crntstkqty: [data[this.i][ 3 ] , []]  ,
                         productname: [data[this.i][ 0 ] , []]   ,
                         calcflag: [0 , []]   ,
  
                        }));
              
                        
  

                        
                  
              }
  
                  
         }
  
  
  
  
  
  
  onSubmit(){
    var  valflag:Number =0 ;
    
          valflag  =this.validnew( )  ;
  
        const control = <FormArray>this.registerForm.controls['invoice'];


     

  
          var answer =  confirm("Save data?");
                  
            if (answer && valflag==0) { 
           this.userService.saveSalesInvoice(JSON.stringify(this.registerForm.value)).subscribe(data => {this.saveSIProducts(data)     },
             errorCode => console.log(errorCode));
             }
    
      
    }
      
  
  
  
  
  saveSIProducts(data:any){
  
      const control = <FormArray>this.registerForm.controls['invoice'];
      if(data==1){ 
          this.userService.saveSIProducts(JSON.stringify( control.value ) ) .subscribe(data => { this.savevalid(data)},
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
  
 
  

       setDiscAmt(){
        
                var custdiscamt:number=0;
        
                const control = <FormArray>this.registerForm.controls['invoice'];
                
                var sprod=control.value ;
        
                 if(parseInt(this.registerForm.get('custdiscamt').value)){
                
                  custdiscamt= parseInt(this.registerForm.get('custdiscamt').value)  ;
                 
                 }else{
        
                  custdiscamt=0  ;
                 }
        
                 if(custdiscamt<1){
        
                  for (this.i = 0; this.i < sprod.length; this.i++) {
                    if(sprod[this.i].calcflag!=1){
                    sprod[this.i].unitdiscount =0  ;
        
                      }
                  }
        
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
  
   var prevat:number =0;
   var presgst:number =0;
   var precgst:number =0;
   var preigst:number = 0;
  
   var  pretotprice:number =0;
    var pretotfreeprice:number =0;
    var pretotmrp:number =0;
  
   var discount:number =0;
  
   var  vatamt :number=0;
   var sgstamt :number=0;
   var cgstamt :number =0;
   var igstamt :number =0;
  
  
   var totdiscount :number = 0;
  
   var totvatamt:number  =0;
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
  
   var  prodcount:number  =0;
  
   var  prodcount :number=0;
   
   var  precustdisc:number =0;
  
  
  
    var inv  ;
  
  

    
    if(parseInt(this.registerForm.get('custdiscamt').value)>0 ){
      
      
          this.registerForm.get('discautoflag').setValue(1);
          }else{
      
            this.registerForm.get('discautoflag').setValue(0);
      
            this.registerForm.get('custdiscamt').setValue(0);
          }

          
  
    
    for (this.i = 0; this.i < sprod.length; this.i++) {
      

          if(parseInt(sprod[this.i].indvqty) ){
            preqty=parseInt(sprod[this.i].indvqty);
        
          }else{
            preqty=0;
          }
      
      
              
          if(parseInt(sprod[this.i].unitprice) ){
            preprodprice=parseInt(sprod[this.i].unitprice);
      
          }else{
            preprodprice=0;
          }
      
            
          if( parseInt(sprod[this.i].freeflag) ){
            freeflag=  parseInt(sprod[this.i].freeflag) ;
         
        
           }else{
            freeflag=0;
        
           
           }
      
      
          pretotprice=  preqty* preprodprice;
         
              if(freeflag == 1){
            
        
                     subtotal+=pretotprice;
               
               }
      
      
      
      
        }
        
      
        precustdisc= (this.registerForm.get('custdiscamt').value /subtotal)*100  ;
        
  
        subtotal=0;
        pretotprice=0;
    
      
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
             
             if( parseInt(sprod[this.i].unitvat)){
              prevat=parseInt(sprod[this.i].unitvat) ;
          
          
            }else{
              prevat=0;
          
            
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
            
  
           if( this.registerForm.get('discautoflag').value  == 1){
  
            sprod[this.i].unitdiscount =precustdisc;
            predisc= precustdisc;
        
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
      
      
        
             if(freeflag == 0  ||  freeflag == 1 ) {
        
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
                       
                 
                 totalitems:  totalproduct , 
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
  



  
  remove(id:number){
    const control = <FormArray>this.registerForm.controls['invoice'];

      control.removeAt(id) ;
 
   }

   
  
 

   validnew():Number{
    var  valflag =0 ;
  

    const control = <FormArray>this.registerForm.controls['invoice'];
    
           var   invoicedata=  control.value ;
                 
                         
         
         for (this.i = 0; this.i < invoicedata.length; this.i++) {
                                      
                    
             if(parseInt(invoicedata[this.i].totalqty  ) > parseInt(invoicedata[this.i].crntstkqty  )){
                     
               valflag=1 ;
    
           
    
    
    
    
    
    
               
              this.notificationsComponent.addToast({title:'Error', msg:'Qty > Stkqty  ', timeout: 5000, theme:'default', position:'top-right',type:'error'});     
                }   
                                                                                                                                 
                         
          }

  
     return   valflag;
  
  }



}