import { EmployeeService } from '../emp.services';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';
import 'jquery';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

@Component({
  selector: 'app-viewEmployee',
  templateUrl: './viewEmployee.component.html',
  styleUrls: ['./viewEmployee.component.css'],
  providers: [EmployeeService, NotificationsComponent]
})


export class viewEmployeeComponent implements OnInit {

  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(private userService: EmployeeService, private route: Router, private notificationsComponent: NotificationsComponent) {
  }
  ngOnInit() {


    this.userService.employeeViewByID(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.data = data },
      err => {
        console.log('Error in view Employee Service');
      });



      

    if (AppComponent.usertype == "\"SuperAdmin\" ") {
      this.userService.employeeView().subscribe(data => { this.data = data },
        err => {
          console.log('Error in view Employee Service');
        });
    } 
    
    else {

      alert('HI');
      this.userService.employeeViewByID(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.data = data },
        err => {
          console.log('Error in view Employee Service');
        });
    }

  }






  private employeeDelete(id: number): void {
         
    var answer = confirm("Delete data?");
    if (answer) {
    this.userService.employeeDelete(id).subscribe(data => {
      //alert("Employee " + data);
      if (data == 1) {
        // alert("Employee  is succesfully Deleted");
        //window.location.reload();
        // window.location.replace('employeeinfo/viewEmployee');
        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA DELETED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
      }
    });
  }
  }
 

}







