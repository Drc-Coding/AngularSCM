
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {purcGatePassViewService} from './purcGatePassView.service'  ;
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-purcGatePassView',
  templateUrl: './purcGatePassView.component.html',
  providers: [purcGatePassViewService]
})
export class purcGatePassViewComponent implements OnInit {

  data = [];

  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  
  billtyperefid =2;
  selobj ;
  viewpurchasegatepass: FormGroup;
  gifFail: boolean=true;
    constructor(private userService: purcGatePassViewService,private formBuilder:FormBuilder) {


      this.viewpurchasegatepass=this.formBuilder.group({
        companyid: ['', []],
        branchid: ['', []],
        locname: ['', []],
        locref: ['', []],
      });

    }
  
    ngOnInit() {

      setTimeout(() => {

        this.userService.viewDeliveryChallan(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,
          AppComponent.locrefID1,this.billtyperefid).subscribe(data => {this.data=data, this.setData(data), alert(data) },
          errorCode => console.log(errorCode));
          this.gifFail=false;

        },3000);
  
    }
 
    setData(data :any){

      if(data!=null||undefined){
        this.viewpurchasegatepass.get('companyid').setValue(data[0][0]);
        this.viewpurchasegatepass.get('branchid').setValue(data[0][1]);
        this.viewpurchasegatepass.get('locname').setValue(data[0][2]);
        this.viewpurchasegatepass.get('locref').setValue(data[0][3]);
      }
      
    }
}