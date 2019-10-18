
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../app.component';
import {vendorReportModule } from './report.services';



@Component({
 selector: 'app-report',
 templateUrl: './report.component.html',
 providers: [vendorReportModule]
})
export class reportComponent implements OnInit {

 private myForm: FormGroup;
 branchid: any;
 locname: any;
 locrefid: any;
 companyrefid: any;
 status: number=0;
 from_date: any;
 to_date: any;
 reportvar: any;
 reportvar1: any;
 distributorId = [];
 dname;

 constructor(private formBuilder: FormBuilder,private route: Router, private vendorservice: vendorReportModule) {}

 ngOnInit() {
   this.myForm = this.formBuilder.group({
     
     from_date: ['', Validators.required],

     to_date: ['', Validators.required],

     distname: ['',[] ]
    
 
 });

//this.myForm.get('companyid').setValue(AppComponent.companyID);
//this.reportvar  = {   companyid  : AppComponent.companyID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1    , branchid  :AppComponent.branchID   }  ;
//this.reportvar = AppComponent.companyID;
// alert(AppComponent.companyID);

this.branchid=  AppComponent.branchID;
this.locname=  AppComponent.locRefName1;
this.locrefid= AppComponent.locrefID1;
this.companyrefid= AppComponent.companyID;
this.reportvar= this.myForm.get("from_date").value;
this.reportvar1= this.myForm.get("to_date").value;
 
this.myForm.get('distname').setValue('opt1');
  
this.vendorservice.getDistributorInfo().subscribe(data => this.distributorId = data,
err => {
     console.log('Error Occured ');




 });
 }

getDistributor(){
   this.dname=this.myForm.get('distname').value;

     
     
       
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
}

datefetch(){

   this.reportvar= this.myForm.get("from_date").value;
   this.reportvar1= this.myForm.get("to_date").value;
}

onSubmit(){
 //  this.reportvar= this.myForm.get("from_date").value;
 //  this.reportvar1= this.myForm.get("to_date").value;
  
}
}

