
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,UrlTree} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Http} from '@angular/http';
import {hrmsReportModule} from './report.services';
import { AppComponent } from '../../app.component';

// import {UrlTree} from '@'



@Component({
 selector: 'app-report',
 templateUrl: './report.component.html',
})
export class reportComponent implements OnInit {

  

private myForm: FormGroup;
companyid: any;
branchid: any;
locname: any;
locrefid: any;
companyrefid: any;
status: number=0;
from_date: any;
to_date: any;



reportvar: any;
reportvar1: any;

constructor(private formBuilder: FormBuilder , private router: Router, public http:Http,private appComponent: AppComponent) { }

ngOnInit() {
  // alert(AppComponent.companyID);
   this.myForm = this.formBuilder.group({
     
       from_date: ['', Validators.required],

       to_date: ['', Validators.required]
   
   });

   this.companyid= AppComponent.companyID;
  this.branchid=  AppComponent.branchID;
  this.locname=  AppComponent.locRefName1;
  this.locrefid= AppComponent.locrefID1;
  this.companyrefid= AppComponent.companyID;
  this.reportvar= this.myForm.get("from_date").value;
  this.reportvar1= this.myForm.get("to_date").value;
 
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

 
}

}

