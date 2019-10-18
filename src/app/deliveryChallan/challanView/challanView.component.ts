
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
  
  selobj ;
    constructor(private userService: challanViewService) {}
  
    ngOnInit() {
  
  
    //alert("onInitCalling");
       
        this.userService.viewDeliveryChallan(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {this.data=data },
          errorCode => console.log(errorCode));
  
        
    }
  
  
  
   



}