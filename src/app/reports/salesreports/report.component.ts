
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {salesreportService} from './report.services';

import {AppComponent} from '../../app.component';



@Component({
 selector: 'app-report',
 templateUrl: './report.component.html',
 providers: [salesreportService]
})
export class reportComponent implements OnInit {
 myForm: FormGroup;
 productinfo = [];
 patientid= [];
 country = [];
 state = [];
 city = [];
 countrycode = [];
 reportvar1;
 reportvar;
 varcity;
 patname: any;
 branchid: any;
 locname: any;
 locrefid: any;
 date: any;
 companyrefid: any;
 status: number=0;
 phcompany: any;
 vatno: any;
 stype: any;
 sotype = [];
 Manufacturername: any;
 constructor(private salesservice:salesreportService,private fb:FormBuilder) {
    this.myForm = this.fb.group({
     countryid: ['', []],
     stateid: ['', []],
     city: ['', []],
     countrycode: ['', []],
     from_date: ['', Validators.required],
     
     Manufacturernameid: ['',[]],
     to_date: ['', Validators.required],
     custname:['',[]],
     vat:['',[]],
     sotype:['',[]]


   });
 }


 ngOnInit() {
   this.branchid=  AppComponent.branchID;
   this.locname=  AppComponent.locRefName1;
   this.locrefid= AppComponent.locrefID1;
   this.companyrefid= AppComponent.companyID;
   this.date= AppComponent.date;
   this.myForm.get('custname').setValue('opt1');
   this.myForm.get('countryid').setValue("0");
   this.myForm.get('stateid').setValue("0");
   this.myForm.get('city').setValue("0");
   this.myForm.get('countrycode').setValue("0");
   this.myForm.get('vat').value;
this.salesservice.getsotype().subscribe(data => this.sotype = data,
  err => {
    console.log('Error Occured ');
   });

   this.salesservice.getCountry().subscribe(data => this.country = data,
     err => {
       console.log('Error Occured getCountry()');
     });
     this.reportvar= this.myForm.get("from_date").value;
     this.reportvar1= this.myForm.get("to_date").value;
     this.salesservice.getCustomerInfo(this.companyrefid,this.branchid,this.locname,this.locrefid).subscribe(data => this.patientid = data,
       err => {
         console.log('Error Occured ');
        });
 }
  getCustomer() {
   this.patname=this.myForm.get('custname').value;

 }
  
 getState() {
   this.salesservice.getStates(this.myForm.get('countryid').value).subscribe(data => this.state = data,
     err => {
       console.log('Error Occured Get States');
     });

   this.salesservice.getCountrycode(this.myForm.get('countryid').value).subscribe(data => {
     this.countrycode = data,
       this.myForm.get('countrycode').setValue(data.toString());
   },
     err => {
       console.log('Error Occured Country Code');
     });
 }


 getCity() {
this.salesservice.getCity(this.myForm.get('stateid').value).subscribe(data => this.city = data,
     err => {
       console.log('Error Occured Get City');
     });
 }
//  cityid(){
//    this.varcity=this.myForm.get('city').value;

//  }
 datefetch(){
      this.reportvar= this.myForm.get("from_date").value;
     this.reportvar1= this.myForm.get("to_date").value;
 }
 getmanufacturer(value: string) {
  this.Manufacturername = [];
  this.salesservice.getManufacturer(value).subscribe(data => {
    this.Manufacturername = [];
    for (let i = 0; i < data.length; i++) {
      this.Manufacturername.push({ value: data[i][0], label: data[i][1] });
    }
  },
    err => {
      console.log('Error Occured Get manufacturer');
    });

}
 view(){

  this.phcompany=this.myForm.get("Manufacturernameid").value;
  this.vatno=this.myForm.get("vat").value;
  this.stype= this.myForm.get('sotype').value;
  
  this.varcity=this.myForm.get('city').value;

 }
 onSubmit(){
  window.location.href = "http://204.93.193.244:8082/birt/frameset?__report=MedeilReports/Salesby Location/Salesby Location.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&cityid="+this.varcity+"&status="+0;
 }
}

