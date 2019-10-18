
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {gatePassViewService} from './gatePassView.service'  ;
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-gatePassView',
  templateUrl: './gatePassView.component.html',
  providers: [gatePassViewService]
})
export class gatePassViewComponent implements OnInit {


  billtyperefid = 3;
  data = [];
  
  selobj ;
    constructor(private userService: gatePassViewService) {}
  
    ngOnInit() {
        this.userService.viewDeliveryChallan(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1, this.billtyperefid).subscribe(data => {this.data=data },
          errorCode => console.log(errorCode));
  
        
    }
 
}