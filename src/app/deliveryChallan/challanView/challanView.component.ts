
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {challanViewService} from './challanView.service'  ;
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-deliveryChallan',
  templateUrl: './challanView.component.html',
  providers: [challanViewService]
})
export class challanViewComponent implements OnInit {

  data = [];
  
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  
  selobj ;
  gifFail: boolean=true;
  viewdelreceipt: FormGroup;

    constructor(private userService: challanViewService,private formBuilder:FormBuilder) {

      this.viewdelreceipt=this.formBuilder.group({
        companyid: ['', []],
        branchid: ['', []],
        locname: ['', []],
        locref: ['', []],
      });

    }
  
    ngOnInit() {
  
    setTimeout(() => {
        this.userService.viewDeliveryChallan(AppComponent.companyID,AppComponent.branchID,
          AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data=data,this.setData(data) },
          errorCode => console.log(errorCode));
          this.gifFail=false;
        },3000);
        
    }
  
  
    setData(data :any){

      if(data!=null||undefined){
        this.viewdelreceipt.get('companyid').setValue(data[0][1]);
        this.viewdelreceipt.get('branchid').setValue(data[0][2]);
        this.viewdelreceipt.get('locname').setValue(data[0][3]);
        this.viewdelreceipt.get('locref').setValue(data[0][4]);
      }
      
    }
   

}