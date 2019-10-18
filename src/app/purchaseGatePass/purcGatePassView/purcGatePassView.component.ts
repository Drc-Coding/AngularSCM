
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
  
  selobj ;
    constructor(private userService: purcGatePassViewService) {}
  
    ngOnInit() {
        this.userService.viewDeliveryChallan(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data=data },
          errorCode => console.log(errorCode));
  
        
    }
 
}