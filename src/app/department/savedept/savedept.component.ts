import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
@Component({
  selector: 'app-savedept',
  templateUrl: './savedept.component.html',
  styleUrls: ['./savedept.component.css']
})
export class SavedeptComponent implements OnInit {

  departmentForm: FormGroup;
  departmentname = [];
  companyrefid: any;
  locname: any;
  locrefid: any;
  branchid: any;
  clientcdate: any;
  
  constructor(private departmentservice: DepartmentService, private router: Router, 
    private formBuilder: FormBuilder,private notifications: NotificationsComponent) {

    this.departmentForm = this.formBuilder.group({
      departmentname: [,[Validators.required] ],
      clientcdate: [, []],
      companyrefid: [, []],
      branchrefid: [, []],
      locrefid: [, []],
      locname: [, []],
    });

   }

  ngOnInit() {
    
    this.departmentForm.get('companyrefid').setValue(AppComponent.companyID);
    this.departmentForm.get('branchrefid').setValue(AppComponent.branchID);
    this.departmentForm.get('locname').setValue(AppComponent.locrefID);
    this.departmentForm.get('locrefid').setValue(AppComponent.locrefID1);
  }

  onSubmit() {
    this.departmentservice.isExist(this.departmentForm.get('departmentname').value).subscribe(data => {
    if (data == true) {
      this.notifications.addToast({ title: 'Error Message', msg: 'Role Name is Already Exist', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      this.departmentForm.get('departmentname').setValue("");
     
    }else{
    this.departmentForm.get('clientcdate').setValue(AppComponent.date);
    this.departmentservice.savedept(this.departmentForm.value).subscribe(
      data => {});
    }
  });

  }
 
}
