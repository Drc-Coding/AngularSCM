
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {salesGatePassViewService} from './salesGatePassView.service'  ;
import { AppComponent } from 'app/app.component';


@Component({
  selector: 'app-salesGatePassView',
  templateUrl: './salesGatePassView.component.html',
  providers: [salesGatePassViewService]
})
export class salesGatePassViewComponent implements OnInit {

  data = [];

  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  
  billtyperefid =1;
  selobj ;
    constructor(private userService: salesGatePassViewService) {}
  
    ngOnInit() {
        this.userService.viewDeliveryChallan(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,
          AppComponent.locrefID1, this.billtyperefid).subscribe(data => {this.data=data },
          errorCode => console.log(errorCode));
  
        
    }
 
}