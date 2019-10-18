import { Component, OnInit } from '@angular/core';
import { providers } from 'ng2-toasty';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { salespickingService } from '../salespicking.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-savepick',
  templateUrl: './savepick.component.html',
  styleUrls: ['./savepick.component.css'],
  providers:[salespickingService,NotificationsComponent]
})
export class SavepickComponent implements OnInit {
  salespickingForm:any;
  calcflag:any;
  solist:any;
  soid:any;
  salesorder:any;
  slsprod:any;
  sotype:any;
  sino;any;
  empname:any;
  constructor(private formbuilder: FormBuilder, private router:Router,private appcomponent:AppComponent,private notificationcomponent: NotificationsComponent,
    private salespicking: salespickingService , private Notificationcomponent:NotificationsComponent) { 
    this.salespickingForm = this.formbuilder.group({
      
      createdBy:['',[]],
      modifiedby:['',[]],
      companyrefid:['',[]],
      branchrefid:['',[]],
      locname:['',[]],
      locrefid:['',[]],
      calcflag:['',[]],
      emprefid:['',[Validators.required]],
      picktypeno:['',[]],
      picktyperefid:['',[]],
      countryrefid:['',[]],
      returnid:['',[]],
      qrcoderefid:['',[]],
      barcoderefid:['',[]],
      putawayrefid:['',[]],
      sotype:['',[]],
      salesorderrefid:['',[Validators.required]],
      salesinvoiceno:['',[]],
      slsinvoice:['',[]],
      sotypename:['',[]],
      custrefid:['',[]],
      custemcode:['',[]],
      custemname:['',[]],
      custemmobno:['',[]],
      totalprod:['',[]],
      orderdate:['',[]],
      clientcdate:[AppComponent.date,[]],
      SOrederproduct:this.formbuilder.array([]),
      
    });
  }
  ngOnInit() {
    
    this.salespickingForm.get('companyrefid').setValue(AppComponent.companyID);
    this.salespickingForm.get('branchrefid').setValue(AppComponent.branchID);
    this.salespickingForm.get('locname').setValue(AppComponent.locRefName1);
    this.salespickingForm.get('locrefid').setValue(AppComponent.locrefID1);
    // this.salespickingForm.get('salesorderid').setValue(this.soid);
    
    //get sales Order
    this.salespicking.getSalesorder(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.solist = data},
      
      
      err =>{
        console.log('Error Occured ');
      });
    this.salespicking.getEmployedata(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.empname = data},
      err => {
      console.log('Error Occured');
      });
  
    //Get SO Product Details
        
  }
        //Get Sales Order Details
    getsodata(){    
        this.salespicking.getSOdetails(this.salespickingForm.get('salesorderrefid').value).subscribe(data => {
          this.sodetails(data),
         this.getsiprod(data[0][0])},
          // this.salespicking.getSOtype(this.soid).subscribe(data => {this.sotype= data},
            // this.salespicking.getSiNo(this.soid).subscribe(data => {this.sino = data },
        
        err => {
          console.log('Error Occured');
        });
     
    
      }
 //get SI Products     
        
getsiprod(data:number){
   data=this.salespickingForm.get('salesinvoiceno').value;
 
  this.salespicking.GetSOproduct(data).subscribe(data => {
    this.soproduct(data)},
    err =>{
      console.log('Error Occured');
    
  });
}
//Get Sales Order Grid Details
i;
  sodetails(data:any)  {
    if (data !== undefined || data !== null){
       for(this.i = 0; this.i < data.length; this.i++){
        this.salespickingForm.patchValue(this.fetchsodata(
          data[this.i][0],
          data[this.i][1],
          data[this.i][2],
          data[this.i][3],
          data[this.i][4],
          data[this.i][5],
          data[this.i][6],
          data[this.i][7],
          data[this.i][8]  
));
    }
   }
}
  fetchsodata(slsinvid:any, slsinvno:any,sotypeid:any, sotype:any, custid:any,cuscode:any,custname:any,cusmobno:any,sodate:any){
      return {
        
        salesinvoiceno:slsinvid,
        slsinvoice:slsinvno,
        sotype:sotypeid,
        sotypename:sotype,
        custrefid:custid,
        custemcode:cuscode,
        custemname:custname,
        custemmobno:cusmobno,
        orderdate:sodate,
        salesorderrefid:this.salespickingForm.get('salesorderrefid').value,
   
      }
  }
 //Get Table Data 
p;
j;
soproduct(data:any){
  const getData = <FormArray>this.salespickingForm.controls['SOrederproduct']
   getData.controls = [];
    if(data !== undefined || data == null){
      for(this.p = 0; this.p< data.length; this.p++ ){
        getData.push(this.fetchsoproduct(
            data[this.p][0],
            data[this.p][1],
            data[this.p][2],
            data[this.p][3],
            data[this.p][4],
            data[this.p][5],
            data[this.p][6],
            data[this.p][7],
            data[this.p][8]   
            
        )       
          )
        }
  
      }
    }
      fetchsoproduct(prodcode:any,proname:any,dosg:any,formual:any,batname:any,exdate:any,reqty:any,avlqty:any, batchno :any){
      return this.formbuilder.group({
                 drugproductrefid:prodcode,
                 brandname:proname,
                 dosage:dosg,
                 formulation:formual,
                 batchrefid:batchno,
                 batchname:batname,
                 expirydate:exdate,
                 availqty:avlqty,
                 invoiceqty:reqty,
                 qty:'',
                 shelfno:'',
                 blockno:'',
                 rackno:'',
                 pickedqty:'',
                 returnqty:'',
                 remarks:'',
                 companyrefid:[AppComponent.companyID,[]],
                 branchrefid:[AppComponent.branchID,[]],
                 locname:[AppComponent.locRefName1,[]],
                 locrefid:[AppComponent.locrefID1,[]],
                 countryrefid:[AppComponent.countryID,[]],  
      })
    } 


    calculation() {
   
      let invoiceqty: any = 0;
      let availqty: any = 0;
      let pickedqty: any = 0;
      let returnqty: any = 0;
      let totalqty: any = 0;
      let qty:any;
      const getData = <FormArray>this.salespickingForm.controls['SOrederproduct'];
      let setData = getData.value;
      for(this.j = 0; this.j < setData.length; this.j++) {
  
      if(setData[this.j].pickedqty)
        {
  
        if((setData[this.j].pickedqty ) >= (setData[this.j].invoiceqty) ) {
          pickedqty = parseInt(setData[this.j].pickedqty);
         
          
        } else {
          this.Notificationcomponent.addToast({ title: 'Error Message', msg: 'Check the Invoice Qty....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
         
        }
          setData[this.j].returnqty = pickedqty - parseInt(setData[this.j].invoiceqty);
  
                
       
          //  getData.controls[this.j].get('returnqty').setValue(34) ;
           //control.controls[i].get('selectflag').setValue(true);
  
     
      
      
       if(setData[this.j].qty){
         qty = parseInt(setData[this.j].qty);
       }
       else{
         qty = 0;
       }
       (setData[this.j].qty) = setData[this.j].invoiceqty;
      
       }
  
       getData.patchValue(setData);
  
  
      }
    }
  
    onSubmit() {
      const getData = <FormArray>this.salespickingForm.controls['SOrederproduct'];
      let data:any = getData.value    
      this.salespickingForm.get('totalprod').setValue(data.length);
      this.salespicking.Savesalespick(JSON.stringify(this.salespickingForm.value)).subscribe(data =>
         {
         if(data == true){
          // const getData = this.salespickingForm.controls['SOrederproduct'];
          this.salespicking.Savepickproduct(JSON.stringify(getData.value)).subscribe(
            data => {
              if(data == true){
                this.notificationcomponent.addToast({title: 'success msg', msg: 'Data Saved Successfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success'});
              setTimeout(() => {
                this.router.navigate(['Picking/ViewPicking']);
              },2000);
              }
              else{
                this.notificationcomponent.addToast({title: 'Error Msg', msg: 'Data not Save..', timeout: 5000, theme:'default', position: 'top-right', type: 'error'});
              }
            },
            error => console.log("Error Occure in SavePick"))
          
        
          }
    })
  
// Need So Date    
         
           } 
      
    

          }
  
