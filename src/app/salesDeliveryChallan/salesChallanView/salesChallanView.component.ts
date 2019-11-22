
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {challanViewService} from './salesChallanView.service'  ;
import { AppComponent } from '../../app.component';
import { data } from 'jquery';

@Component({
  selector: 'app-salesdeliveryChallan',
  templateUrl: './salesChallanView.component.html',
  providers: [challanViewService]
})
export class salesChallanViewComponent implements OnInit {


 public  data = [];
 public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";


  viewchallan:FormGroup;
  
  selobj ;
  gifFail: boolean=true;

    constructor(private userService: challanViewService,private formBuilder:FormBuilder) {

      this.viewchallan=this.formBuilder.group({
        companyid: ['', []],
        branchid: ['', []],
        locname: ['', []],
        locref: ['', []],
      });

    }
  
    ngOnInit() {
  

      setTimeout(() => {
        this.userService.viewDeliveryChallan(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data=data,this.setData(data) },
          errorCode => {console.log(errorCode)});

          this.gifFail=false;
      },3000);

  
        
    }
  
         
    setData(data:any){

      if(data!=null||undefined){
        this.viewchallan.get('companyid').setValue(data[0][1]);
        this.viewchallan.get('branchid').setValue(data[0][2]);
        this.viewchallan.get('locname').setValue(data[0][3]);
        this.viewchallan.get('locref').setValue(data[0][4]);
      }
      
    }

  }