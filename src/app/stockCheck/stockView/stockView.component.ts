import {stockViewService} from './stockView.services';
import {Component, OnInit, Injectable} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router, ActivatedRoute} from '@angular/router';
import 'jquery';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-stockView',
  templateUrl: './stockView.component.html',
  styleUrls: ['./stockView.component.css'],
  providers: [stockViewService]
})
  

export class stockViewComponent implements OnInit {

  public data=[];
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";

  
  purchaseOrder: FormGroup;
  constructor(private userService: stockViewService, private route: Router,private formBuilder:FormBuilder) {
    this.purchaseOrder = this.formBuilder.group({
      companyid: ['', []],
      branchid: ['', []],
      locname: ['', []],
      locref: ['', []],
    });
    this.purchaseOrder.get('companyid').setValue(AppComponent.companyID);
    this.purchaseOrder.get('branchid').setValue(AppComponent.branchID);
    this.purchaseOrder.get('locname').setValue(AppComponent.locrefID);

    

    if (AppComponent.usertype == "\"SuperAdmin\" ") { 
      this.userService.superAdminViewStock().subscribe(data => {this.data = data},
        err => {
          console.log('Error get values from services in Branch Component');
        });
      }
    else{
      this.userService.viewStock(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data = data,this.setdata(data)},
        err => {
          console.log('Error get values from services in Branch Component');
        });
      }
  
    
  }
setdata(data:any){
  if(data!=null||undefined){
    this.purchaseOrder.get('companyid').patchValue(data[0][0]);
    this.purchaseOrder.get('branchid').setValue(data[0][1]);
    this.purchaseOrder.get('locname').setValue(data[0][2]);
    this.purchaseOrder.get('locref').setValue(data[0][3]);
  }
}

  

 
  ngOnInit() {

  }

}







