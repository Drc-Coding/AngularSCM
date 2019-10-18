
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../app.component';
import {purchaseReportModule} from './report.services';
import { dateFormatPipe } from '../..//notifications/notifications.datepipe';


@Component({
 selector: 'app-report',
 templateUrl: './report.component.html',
 providers:[purchaseReportModule]
})
export class reportComponent implements OnInit {
 private myForm: FormGroup;
 branchid: any;
 locname: any;
 locrefid: any;
 companyrefid: any;
 status: number=0;
 country = [];
 state = [];
 city = [];
 countrycode = [];
 varcity;
 reportvar;
 reportvar1;
 pi_date;
 batch_no;
 pi_no;
 distributorId = [];
 dname;
 polist = [];
 varpro:any;
 characters =[];
 charact = [];
 date: any;
 vatno: any;
 batchname:any;
 varbatch:any;
 pinumber= [];
 constructor(private formBuilder: FormBuilder,private purchaseservice: purchaseReportModule, private dateformat: dateFormatPipe) {}

 ngOnInit() {
   this.myForm = this.formBuilder.group({
    
     from_date: ['', Validators.required],

     to_date: ['', Validators.required],
  pidate:  ['',Validators.required],
  batchno:['', Validators.required],
  pino:['', Validators.required],
  countryid: ['', []],
     stateid: ['', []],
     city: ['', []],
     countrycode: ['', []],
  distname: ['',[] ],
  productid: ['', []],
  vat:['',[]],
  batchid: ['',[]]

 });

  
   this.branchid=  AppComponent.branchID;
   this.locname=  AppComponent.locRefName1;
   this.locrefid= AppComponent.locrefID1;
   this.companyrefid= AppComponent.companyID;
   this.date= AppComponent.date;
   this.date =  [this.dateformat.transform05(Date.now())];
   this.reportvar= this.myForm.get("from_date").value;
   this.reportvar1= this.myForm.get("to_date").value;
   this.batch_no=this.myForm.get("batchno").value;
   this.pi_no=this.myForm.get("pino").value;
   this.myForm.get('distname').setValue('opt1');
   this.myForm.get('countryid').setValue("0");
   this.myForm.get('stateid').setValue("0");
   this.myForm.get('city').setValue("0");
   this.myForm.get('countrycode').setValue("0");
   this.myForm.get('productid').setValue("0");
   this.myForm.get('vat').value;
   
   this.purchaseservice.getCountry().subscribe(data => this.country = data,
     err => {
       console.log('Error Occured getCountry()');
     });
     this.purchaseservice.getpurchaseinvoice(AppComponent.companyID , AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {this.pinumber=data, err => {
      console.log('Error Occured getPinvoice()');
    }});
    

     this.purchaseservice.getProductlist(this.companyrefid, this.branchid, AppComponent.shopID,  this.locrefid,  this.locname).subscribe(data => this.polist = data,
        err => {
          console.log('Error Occured On getProductlist()');
        }
      );


this.dname=  this.purchaseservice.getDistributorInfo().subscribe(data => this.distributorId = data,
err => {
     console.log('Error Occured ');




 });
}
 getDistributor() {
  this.dname=this.myForm.get("distname").value;
 }
 setDateRange(): void {
   // Set date range (today) using the patchValue function
   let date = new Date();
   this.myForm.patchValue({from_date:  {
       beginDate: {
           year: date.getFullYear(),
           month: date.getMonth() + 1,
           day: date.getDate()
       },
       endDate: {
           year: date.getFullYear(),
           month: date.getMonth() + 1,
           day: date.getDate()
       }
   }});
   let date2 = new Date();
   this.myForm.patchValue({to_date: {
     beginDate: {
         year: date2.getFullYear(),
         month: date2.getMonth() + 1,
         day: date2.getDate()
     },
     endDate: {
         year: date2.getFullYear(),
         month: date2.getMonth() + 1,
         day: date2.getDate()
     }
 }});

 let date3 = new Date();
 this.myForm.patchValue({pidate:  {
     beginDate: {
         year: date3.getFullYear(),
         month: date3.getMonth() + 1,
         day: date3.getDate()
     },
     endDate: {
         year: date3.getFullYear(),
         month: date3.getMonth() + 1,
         day: date3.getDate()
     }
 }});

}
getProduct(val: string) {
  this.purchaseservice.getProductlist(val,AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => {
     this.characters = [];     
     for (let i = 0; i < data.length; i++) {
       this.characters.push({ value: data[i][0], label: data[i][1] });

     }
   });

 }

getProValues(){
this.varpro=this.myForm.get('productid').value;

}


getBatch(val2: string) {
  this.purchaseservice.getbatchnamelist(val2,AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
     this.charact = [];     
     for (let i = 0; i < data.length; i++) {
       this.charact.push({ value: data[i][1], label: data[i][1] });

     }
   });

 }

getBatchValues(){
 this.batch_no=this.myForm.get('batchid').value;

}


getPinvoice(){
  this.pi_no = this.myForm.get('pino').value;
}

getState() {
    this.purchaseservice.getStates(this.myForm.get('countryid').value).subscribe(data => this.state = data,
      err => {
        console.log('Error Occured Get States');
      });
 
    this.purchaseservice.getCountrycode(this.myForm.get('countryid').value).subscribe(data => {
      this.countrycode = data,
        this.myForm.get('countrycode').setValue(data.toString());
    },
      err => {
        console.log('Error Occured Country Code');
      });
  }
 
 
  getCity() {
 this.purchaseservice.getCity(this.myForm.get('stateid').value).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Get City');
      });
  }
  cityid(){
    this.varcity=this.myForm.get('city').value;
 
  }

datefetch(){
 this.pi_date= this.myForm.get("pidate").value;
   this.reportvar= this.myForm.get("from_date").value;
   this.reportvar1= this.myForm.get("to_date").value;
}
view(){
 this.pi_no=this.myForm.get("pino").value;
// this.batch_no=this.myForm.get("batchno").value;
 this.vatno=this.myForm.get("vat").value;
}

}

