
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {challanViewService} from './purchaseChallanView.service'  ;
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-purchaseDeliveryChallan',
  templateUrl: './purchaseChallanView.component.html',
  providers: [challanViewService]
})
export class purchaseChallanViewComponent implements OnInit {


  data = [];

  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  
  selobj ;
  viewpurchase: FormGroup;
  gifFail: boolean=true;

    constructor(private userService: challanViewService,private formBuilder:FormBuilder) {

      this.viewpurchase=this.formBuilder.group({
        companyid: ['', []],
        branchid: ['', []],
        locname: ['', []],
        locref: ['', []],
      });
    }
  
    ngOnInit() {
  
      setTimeout(() => {

        this.userService.viewDeliveryChallan(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data=data,this.setData(data) },
          errorCode => console.log(errorCode));
          this.gifFail=false;
      },3000);
  
    }
  
  
    setData(data :any){

      if(data!=null||undefined){
        this.viewpurchase.get('companyid').setValue(data[0][1]);
        this.viewpurchase.get('branchid').setValue(data[0][2]);
        this.viewpurchase.get('locname').setValue(data[0][3]);
        this.viewpurchase.get('locref').setValue(data[0][4]);
      }
      
    }



}