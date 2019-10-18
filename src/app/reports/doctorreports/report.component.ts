
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../app.component';



@Component({
 selector: 'app-report',
 templateUrl: './report.component.html',
})
export class reportComponent implements OnInit {


 branchid: any;
 locname: any;
 locrefid: any;
 companyrefid: any;
 status: number=0;

 constructor(private appComponent: AppComponent) {}

 ngOnInit() {
   this.branchid=  AppComponent.branchID;
   this.locname=  AppComponent.locRefName1;
   this.locrefid= AppComponent.locrefID1;
   this.companyrefid= AppComponent.companyID;


 }



}

