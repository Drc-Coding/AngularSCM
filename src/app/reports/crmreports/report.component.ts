
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../app.component';
import {crmReportService} from './report.services';


@Component({
 selector: 'app-report',
 templateUrl: './report.component.html',
 providers: [crmReportService]
})
export class reportComponent implements OnInit {
 private myForm: FormGroup;

 branchid: any;
 locname: any;
 locrefid: any;
 companyrefid: any;
 status: number=0;
patientid= [];
 reportvar;
 reportvar1;

 patname: any;
 constructor(private crmservice:crmReportService,private formBuilder:FormBuilder) {

 //   let custname = new FormControl('', Validators.required);
  // this.myForm = new FormGroup({
 //   custname: custname});
 }


 ngOnInit() {

   this.myForm = this.formBuilder.group({
     
       from_date: ['', Validators.required],

       to_date: ['', Validators.required],
       custname:['',[]]
   
   });

   this.branchid=  AppComponent.branchID;
   this.locname=  AppComponent.locRefName1;
   this.locrefid= AppComponent.locrefID1;
   this.companyrefid= AppComponent.companyID;
   this.reportvar= this.myForm.get("from_date").value;
   this.reportvar1= this.myForm.get("to_date").value;
  
  this.myForm.get('custname').setValue('opt1');
  
  this.crmservice.getCustomerInfo(this.companyrefid,this.branchid,this.locname,this.locrefid).subscribe(data => this.patientid = data,
     err => {
       console.log('Error Occured ');

     });


 }
 getCustomer() {
   this.patname=this.myForm.get('custname').value;

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

}

