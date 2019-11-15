
import {Component, OnInit   ,ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators ,FormArray } from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;


import {slsRetSaveService} from './slsRetSave.service' ;


import { DxDataGridComponent } from "devextreme-angular";


import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 


import { AppComponent } from '../../../app.component';





@Component({
  selector: 'app-slsRetSave',
  templateUrl: './slsRetSave.component.html',
  providers: [slsRetSaveService  ,NgbDropdownConfig  , NotificationsComponent  , dateFormatPipe ]
})
export class slsRetSaveComponent implements OnInit {

    registerForm: FormGroup;

    registerForm1: FormGroup;
  
    invoices=[];
    i;
    selobj;
    truncatepos=2;
    deviceObj:any;

    constructor(private userService: slsRetSaveService  ,    private   dateformat: dateFormatPipe ,private formBuilder: FormBuilder ,config: NgbDropdownConfig  ,  
    private notificationsComponent:NotificationsComponent,private router: Router,private appComponent: AppComponent) {
  
        config.autoClose = false;
    }
  
    ngOnInit() {
  

      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1  , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID  
        , branchrefid  :AppComponent.branchID     , vatdispflag  :AppComponent.vatDispFlag   , boxdispflag  :AppComponent.BoxDispFlag  
        , stripdispflag  :AppComponent.StripDispFlag    , tabdispflag  :AppComponent.TabDispFlag }  ;

      
      this.registerForm = this.formBuilder.group({

       
        srid: [  , []],    
        srno: [  , []],    
        srdate: [  , []], 
        invoiceno: [  , []],
        customerrefid: [  , []],  
        doctorrefid: [  , []],  
        totalamount: [  , []],    
        totalitems: [  , []],    
        totaldiscount: [  , []],   
        taxableamt: [  , []],    
        totaltaxamt: [  , []],    
        totalinclamt: [  , []], 
        totalexclamt: [  , []],     
        grandtotal : [  , [ Validators.min(1 )]], 
       

        createdby:   [this.selobj .userid , []]      ,
        locrefid:   [ this.selobj .locrefid, []]      ,
        locname:     [ this.selobj .locname  , []]     ,
               countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],
   
       customername: [, []]  ,
       autonamenew: [, []]  ,

       subtotal  : [, []]  ,
       roundoff  : [, []]  ,


     clientcdate: [ this.dateformat.transform04()   , []],
     clientcdate1: [ this.dateformat.transform04()   , []],

          date: [this.dateformat.transform05(Date.now())   , []],
          vatdispflag: [ this.selobj.vatdispflag , []], 
          boxdispflag: [  this.selobj.boxdispflag  , []],        
          stripdispflag: [  this.selobj.stripdispflag , []],                    
          tabdispflag: [this.selobj.tabdispflag , []], 
    
       invoice:  this.formBuilder.array([
        
        ]),
     dummy:  this.formBuilder.array([
          
           ]),
  
      }) ;
  

      this.registerForm1 = this.formBuilder.group({
   
        debitaccount: [ 20 , []]     ,    
        creditaccount: [2 , []]     ,  
         
        debitamount: [  , []]     ,     
        creditamount:[  , []]     ,             
        draccname: [ 'Sales  income' , []]     ,     
        craccname:[ 'Accounts Receivable' , []]     , 
        invoiceno: [  , []]   , 
           
        invoicebalamt: [  , []]     , 
        clientcdate : [ this.dateformat.transform04()  , []]  , 
        clientcdate1 : [  this.dateformat.transform04()  , []]  , 
        
        cashflag : [  , []]  , 

        jrnltype : [   6 , []]  , 

        jrnlname :  [ 'CreditNote' , []]  , 
        bulkflag :  [  , []]  , 
      
      
 
        personid: [  , []]  , 
        persontype :   [ 1 , []]  , 
        invoicetype: [ 2 , []]  , 
      
      
        paymenttype: [  , []]  ,
        ptrefno: [  , []]  ,
      
       createdby   : [this.selobj.userid   , []], 
       locrefid   : [this.selobj.locrefid, []],
       locname   : [this.selobj.locname, []],

                    countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],


       purcflag: [1  , []]  , 
       calcflag: [0  , []]   ,
     
     }) ;


      var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname  , companyid  :this.selobj.companyid   } ;  

      this.userService.viewSalesInvoiceNo(JSON.stringify(frmdata)  ).subscribe(data =>{this.invoices = data },
        errorCode => console.log(errorCode));






  $( document ).ready(function() {
  
  
 
  
  });
    

  this.init() ;


  
    }


    
  devicedetails(){

    this.deviceObj = {

        userid: AppComponent.userID,
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,
        clientcdate:this.dateformat.transform04(),
        ipaddress: this.appComponent.ipAddress, 
        browsertype: this.appComponent.browser,
        ostype: this.appComponent.os,
        osversion: this.appComponent.osversion,
        devicetype: this.appComponent.devicetype,
        description:'',
        apiname:''

      };
  
}



onSubmit(){
  
    var  valflag:Number =0 ;
  
        valflag =this.validnew()  ;

     const control = <FormArray>this.registerForm.controls['invoice'];



      var answer =  confirm("Save data?");
             
       if (answer && valflag==0) { 
      this.userService.saveSalesReturn(JSON.stringify(this.registerForm.value)  ).subscribe(data => {this.saveSrProducts(data)  ,  this.saveCreditNote(data) },
        errorCode => console.log(errorCode));
        }

        this.router.navigate(['SalesReturn/ViewSalesReturn']);

  }
    



  saveSrProducts(data:any){
    
    
  const control = <FormArray>this.registerForm.controls['invoice'];
  if(data==1){ 
            this.userService.saveSrProducts(JSON.stringify( control.value) ) .subscribe(data => {this.savevalid(data)   },
            errorCode => console.log(errorCode));

  }
    
    }
    
    
      saveCreditNote(data:any){
    
 

              this.registerForm1.patchValue({
          
                       debitamount: this.registerForm.get('grandtotal').value      ,
                        creditamount:this.registerForm.get('grandtotal').value   ,
                        personid:this.registerForm.get('customerrefid').value ,
                 });   

        if(data==1){ 
            this.userService.saveCreditNote(JSON.stringify( this.registerForm1.value  ) ) .subscribe(data => {this.savevalid(data)},
            errorCode => console.log(errorCode));

        }
    
    
    }


    savevalid(data:any){
      if(data==1){ 
      
        this.devicedetails();
        this.deviceObj.apiname="api/slsretn/saveSalesReturn";
        this.deviceObj.description="SalesReturn Created";

        this.userService.adddevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
        
            this.notificationsComponent.addToast({title:'Success', msg:'Data  Saved  ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
            this.clear() ; 
    
          }else{
    
        this.notificationsComponent.addToast({title:'Error', msg:'Data Not  saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
    
      }
       
    }



   calc( event){
  
    if(event.keyCode == 9){
      
  
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
  
 
    var  freeflag:number  =0;

    var  frgstflag:number  =0;
    var prevat:number =0;
    var totvatamt:number  =0;
    var  vatamt :number=0;
    
    var  prodcount :number=0;

  
  
    var inv  ;
  
    
    for (this.i = 0; this.i < sprod.length; this.i++) {



   if(sprod[this.i].calcflag!=1){

  
     
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

      freeflag=1 ;
  
      if(freeflag == 0){
        
              discount=0 ;
              prefree=0 ;
     } else {

      prodcount+=1  ;
     }
  
      
        sprod[this.i].subtotal= (preqty* preprodprice).toFixed(2);
  
        sprod[this.i].totalqty= convfactor* preqty;
        sprod[this.i].totalfreeqty= convfactor* prefree;
  
        pretotprice=  preqty* preprodprice;
  
        discount= (pretotprice *predisc)/100;


   


        if(gstflag == 1) {
          if(frgstflag == 1) {

           vatamt=   ((pretotprice-discount) *prevat)/100;

           sgstamt=   ((pretotprice-discount) *presgst)/100;
           cgstamt=   ((pretotprice-discount) *precgst)/100;
           igstamt=   ((pretotprice-discount) *preigst)/100;

       
                   
            }
        else  if(frgstflag == 2) {

         
        vatamt=   (((preqty+prefree)*preprodprice-discount) *prevat)/100;  

        sgstamt=   (((preqty+prefree)*preprodprice-discount) *presgst)/100;  
        cgstamt=   (((preqty+prefree)*preprodprice-discount) *precgst)/100;  
        igstamt=   (((preqty+prefree)*preprodprice-discount) *preigst)/100;        


           }                     
             }
        else  if(gstflag == 2) {

         vatamt  =  (preqty+prefree)*(premrp-(premrp/(1+prevat/100)))   ; 

         sgstamt  =  (preqty+prefree)*(premrp-(premrp/(1+presgst/100)))   ; 
         cgstamt  =  (preqty+prefree)*(premrp-(premrp/(1+precgst/100)))   ;   
         igstamt  =  (preqty+prefree)*(premrp-(premrp/(1+preigst/100)))   ;             

       }


  
       if(freeflag == 1 || freeflag == 0) {
  
        sprod[this.i].vatamt=vatamt;  

        sprod[this.i].sgstamt=sgstamt;
        sprod[this.i].cgstamt=cgstamt;
        sprod[this.i].igstamt=igstamt;
  
  
        totvatamt+=vatamt   ;
        
        totsgstamt+=sgstamt   ;
        totcgstamt+= cgstamt   ;
        totigstamt+=igstamt    ;
          

       } 
       
       if(freeflag == 1  ){

         totalproduct=prodcount  ;
         totqty+=preqty;
         subtotal+=pretotprice;
         totdiscount+=discount  ;

  
        }
  

    }
  
      }
  
    



         totgstamt =totsgstamt+totcgstamt+totigstamt +totvatamt;
    
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
                             
                  totalitems: prodcount, 
                  totaldiscount:  totdiscount.toFixed(this.truncatepos)  ,
                  taxableamt:  totaltaxableamt.toFixed(this.truncatepos)  ,   
                  totaltaxamt: totaltaxamt.toFixed(this.truncatepos)  ,         
                  totalinclamt:totalincamt.toFixed(this.truncatepos)  ,
                  totalexclamt: totalexclamt.toFixed(this.truncatepos)  , 
                  grandtotal: grandtotal.toFixed(this.truncatepos) ,
                  roundoff  : (grandtotal-Number(grandtotal.toFixed(this.truncatepos))).toFixed(this.truncatepos) ,
     
                  createdby:   this.selobj .userid,
                  locrefid:   this.selobj .locrefid,
                  locname:  this.selobj.locname,      
                  totalamount:   subtotal.toFixed(this.truncatepos)  ,
          
                 });
  
 

  }



viewSInvoiceProduct() {
      

  this.viewSalesInvoice();

  
  this.viewSIProduct();
  

 }

 viewSalesInvoice() {

  var   frmdata={ frmint1 : this.registerForm.get('invoiceno').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname  , companyid  :this.selobj.companyid   } ;  
  this.userService.viewSalesInvoice(JSON.stringify(frmdata)    ).subscribe(data => {this.viewServMedcInvoice(data)},
    errorCode => console.log(errorCode));


}

  viewSIProduct() {
    var   frmdata={ frmint1 : this.registerForm.get('invoiceno').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;  
          this.userService.viewSIProduct(JSON.stringify(frmdata)   ).subscribe(data => {this.viewServSiProduct(data)},
            errorCode => console.log(errorCode));
    
   }


 viewServMedcInvoice(data:any){

       this.registerForm.get('customername').setValue(data[0][18]);
      this.registerForm.get('customerrefid').setValue(data[0][4]);
    
  }

viewServSiProduct(data:any) {
 


    var  v   = 0  ;

    const control = <FormArray>this.registerForm.controls['invoice'];

    

    
    while (control.length !== 0) {
      control.removeAt(0) ;
       }

       this.init()  ;
  
       /*    if(control.value[0].apprflag==1){


          }    */ 

  for (this.i = 0; this.i < data.length; this.i++) {


    v  = 1  ;
  
    control.insert(0,this.formBuilder.group({

                srproductid: [ , []]  ,  
                srrefid:  [ , []] ,  
                sirefid:  [data[this.i][v++    ] , []]  , 
                drugproductid:  [data[this.i][v++    ] , []]  ,   

                batchrefid:  [data[this.i][v++    ] , []]  ,  
                totalqty: [data[this.i][v++    ]  , []] , 
                unitprice:  [(data[this.i][v++]).toFixed(2) , []]  , 
                mrp:  [data[this.i][v++    ] , []]  , 
                expirydate:  [data[this.i][v++    ] , []]  ,  	
              
        
                unitdiscount:  [data[this.i][v++    ] , []]  ,  
                unitvat:  [data[this.i][v++    ] , []]  ,     
                unitsgst:  [data[this.i][v++    ] , []]  ,   
                unitcgst:  [data[this.i][v++    ] , []]  , 
                unitigst:  [data[this.i][v++    ] , []]  ,  
             
                dummy2:  [data[this.i][v++    ] , []]  , 
                discountamt:[ , []]   ,
                vatamt:  [data[this.i][v++    ] , []]  , 
                sgstamt:  [data[this.i][v++    ] , []]  ,   
                cgstamt:  [data[this.i][v++    ] , []]  ,    
                igstamt:  [data[this.i][v++    ] , []]  ,  

               clientcdate: [ this.dateformat.transform04()   , []],
               clientcdate1: [ this.dateformat.transform04()   , []],
                createdby   : [this.selobj.userid   , []], 
                locrefid   : [this.selobj.locrefid, []],
                locname   : [this.selobj.locname, []],
                           countryrefid: [ this.selobj.countryrefid  , []],
                  companyrefid: [ this.selobj .companyid , []],
                  branchrefid: [ this.selobj .branchrefid , []],

                 subtotal:  [data[this.i][v++    ] , []]  ,  
                drgtyp:[data[this.i][v++    ] , []]  ,
                gstflag:[data[this.i][v++    ] , []]  ,
                frgstflag: [data[this.i][v++    ] , []]  ,
                convfactor: [data[this.i][v++    ] , []]  ,  
            
                crntsiqty:  [data[this.i][v++    ] , []], 
                crntstkqty: [data[this.i][v++    ] , []]  ,
                sinvrefid: [data[this.i][v++    ] , []]  , 
                siqty:  [data[this.i][v++    ] , []] , 
        
            
                productname:  [data[this.i][0    ] , []]     ,
            


                indvqty: [ , []]  , 
                
                calcflag: [0  , []]   ,

                delflag : [ false , []]   ,
                batchname  :  [data[this.i][v++    ] , []] , 
                stkmainrefid: [ data[this.i][v++    ] , []]   ,
                siprodrefid: [data[this.i][v++    ] , []]  , 
               }));
    

  }

}



init(){
  const control = <FormArray>this.registerForm.controls['invoice'];
  var data=[ [],[] ];


   
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
              countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],
      drgtyp: [ , []] ,
      gstflag: [ , []] ,
      frgstflag:  [ , []]  ,
      freeflag:  [    , []]  ,

      priceflag: [ , []],

      discautoflag:   [ , []],

     
      convfactor:   [ , []]  ,

      indvqty: [ , []] ,
      indvfreeqty: [ , []] ,
      crntsiqty: [ , []]  ,
      crntstkqty: [ , []]  ,
      productname: [, []]   ,

      siqty:  [  , []] , 



     calcflag: [1  , []]   ,  

       delflag : [ false , []]   ,

  stkmainrefid: [  , []]   ,
  siprodrefid: [ , []]  , 

     }));


 }



}



     remove( ){
      const control = <FormArray>this.registerForm.controls['invoice'];  


      const controlrem = <FormArray>this.registerForm.controls['dummy']; 

      var  valorg = control.value  ;


      for (this.i = 0; this.i < valorg.length; this.i++) {

        if((parseInt(valorg[this.i].calcflag)!=1) && (valorg[this.i].delflag!=true )  ) {   


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


      const control = <FormArray>this.registerForm.controls['invoice'];
  
      var     invoicedata= control.value ;
          
  
        for (this.i = 0; this.i < invoicedata.length; this.i++) {
                                                                 
                                             
       if(parseInt(invoicedata[this.i].totalqty  ) > parseInt(invoicedata[this.i].crntsiqty  )){
        valflag=1 ;  
  
          this.notificationsComponent.addToast({title:'Error', msg:'Qty > siqty  ', timeout: 5000, theme:'default', position:'top-right',type:'error'});     
            }    
  
       if(parseInt(invoicedata[this.i].totalqty  ) > parseInt(invoicedata[this.i].crntstkqty  ) ){
        valflag=1 ;    
           this.notificationsComponent.addToast({title:'Error', msg:'Qty > stkqty  ', timeout: 5000, theme:'default', position:'top-right',type:'error'});     
        }     
  
      }


   return   valflag;

}



clear(){
  
    this.ngOnInit() ;
  }


  


}