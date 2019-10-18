import {patientAlertService} from '../patientAlert.service';
import {Component, OnInit, Injectable} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router, ActivatedRoute} from '@angular/router';
import 'jquery';

import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-viewPatientAlert',
  templateUrl: './viewPatientAlert.component.html',
  styleUrls: ['./viewPatientAlert.component.css'],
  providers: [patientAlertService]
})
  

export class viewPatientAlertComponent implements OnInit {

  public data=[];
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(private userService: patientAlertService, private route: Router) {

     if ("admin" == AppComponent.userID.substring(0, 5)) { 
     this.userService.patientAlertViewByAdmin().subscribe(data => {this.data = data},
      err => {
        console.log('Error get values from services in Branch Component');
      });
    }else{
      this.userService.patientAlertView(AppComponent.companyID,AppComponent.branchID,AppComponent.locrefID,AppComponent.locRefName).subscribe(data => {this.data = data},
        err => {
          console.log('Error get values from services in Branch Component');
        });
    }
    

  }


  // private employeeDelete(id:number): void { 
  //   this.userService.employeeDelete(id).subscribe(data=>console.log=data);
  //   this.userService.employeeView().subscribe(data => {this.data = data});
  // }


  private employeeDelete(id:number): void { 
    this.userService.employeeDelete(id).subscribe(data=>{alert("Employee "+data);
      if(data==1){
         alert("Employee  is succesfully Deleted");
        window.location.reload();
       // window.location.replace('employeeinfo/viewEmployee');
      }
    });
  }
  ngOnInit() {

  }

}







