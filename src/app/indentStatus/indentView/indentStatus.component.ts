import {indentStatusService} from './indentStatus.services';
import {Component, OnInit, Injectable} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router, ActivatedRoute} from '@angular/router';
import 'jquery';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-indentView',
  templateUrl: './indentStatus.component.html',
  styleUrls: ['./indentStatus.component.css'],
  providers: [indentStatusService]
})
  

export class indentStatusViewComponent implements OnInit {

  public data=[];
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  indentStatus: FormGroup; 


  constructor(private userService: indentStatusService, private route: Router,private formBuilder:FormBuilder) {
   
   
   
    this.indentStatus=this.formBuilder.group({
      companyid: ['', []],
      branchid: ['', []],
      locname: ['', []],
      locref: ['', []],
    });

 
   // this.indentStatus.get('companyid').setValue(AppComponent.companyID);
   // this.indentStatus.get('branchid').setValue(AppComponent.branchID);
   // this.indentStatus.get('locname').setValue(AppComponent.locrefID);

    // if (AppComponent.usertype == "\"SuperAdmin\" ") {  
        
    //   this.userService.superIndentStatusView().subscribe(data => {this.data = data},
    //     err => {
    //       console.log('Error get values from services in Branch Component');
    //     });

    // }else {    
   
   // }

  }


  ngOnInit() {
    this.userService.viewIndentStatus(AppComponent.companyID,AppComponent.branchID,
    AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data = data,this.setData(data)},

      err => {
        console.log('Error get values from services in Branch Component');
      });

  }


  setData(data:any){

    if(data!=null||undefined){
      this.indentStatus.get('companyid').setValue(data[0][0]);
      this.indentStatus.get('branchid').setValue(data[0][1]);
      this.indentStatus.get('locname').setValue(data[0][2]);
      this.indentStatus.get('locref').setValue(data[0][3]);
    }
    
  }

}







