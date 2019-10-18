import {indentStandService} from './indentStandView.services';
import {Component, OnInit, Injectable} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router, ActivatedRoute} from '@angular/router';
import 'jquery';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-indentStand',
  templateUrl: './indentStandView.component.html',
  styleUrls: ['./indentStandView.component.css'],
  providers: [indentStandService]
})
  

export class indentStandViewComponent implements OnInit {

  public data=[];
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  purchaseOrder: FormGroup;
  constructor(private userService: indentStandService, private route: Router,private formBuilder:FormBuilder) {
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
      this.userService.viewStock(AppComponent.companyID,AppComponent.branchID,AppComponent.locrefID1).subscribe(data => {this.data = data},
        err => {
          console.log('Error get values from services in Branch Component');
        });
      }
  
    
  }


  

 
  ngOnInit() {

  }

}







