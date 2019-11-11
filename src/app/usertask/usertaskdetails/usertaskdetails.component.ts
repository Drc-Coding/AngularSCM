import { Component, OnInit } from '@angular/core';
import { Usertaskservice } from '../usertask.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from 'app/app.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-usertaskdetails',
  templateUrl: './usertaskdetails.component.html',
  styleUrls: ['./usertaskdetails.component.css'],
  providers: [Usertaskservice, NotificationsComponent]
})
export class UsertaskdetailsComponent implements OnInit {


  taskid: any;
  private taskValue: any;
  usertaskdetails: FormGroup;
  public rowsOnPage: number = 10;
  public sortBy: string = "";
  public sortOrder: string = "desc";

  selobj;

  constructor(private usertaskservice: Usertaskservice, private route: ActivatedRoute, private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) {
  }



  ngOnInit() {

    this.taskValue = this.route.params.subscribe(params => {
      this.taskid = +params['id'];
    });


    // this.taskid = this.route.snapshot.paramMap.get('id');

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
      locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID, branchrefid: AppComponent.branchID
    };






    this.usertaskservice.getTaskValues(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid, this.taskid).subscribe(data => this.getTaskData(data),
        error => {
          console.log('Error occured in getTaskValues()')
        });


   
   
        this.usertaskservice.getAssignedBy(this.taskid).subscribe(data => {
      if (data) {


        this.usertaskdetails.get('task_assigned_by').setValue(data);
      }   },
      error => {
        console.log('Error occured in getTaskValues()')
      });


      
    this.usertaskservice.getAssignedTo(this.taskid).subscribe(data => {
      if (data) {
        this.usertaskdetails.get('task_assigned_to').setValue(data);
      }

    },
      error => {
        console.log('Error occured in getTaskValues()')
      });






    this.usertaskdetails = this.formBuilder.group({

      task_id: ['', []], task_number: ['', []], task_type_id: ['', []], task_title: ['', []], deptid: ['', []],
      subdeptid: ['', []], divisionid: ['', []], subdivisionid: ['', []], employeeid: ['', []], task_start_date: ['', []],
      task_due_date: ['', []], priority_id: ['', []], task_status_id: ['', []], createdby: ['', []], modifiedby: ['', []],
      companyrefid: ['', []], branchrefid: ['', []], locname: ['', []], locrefid: ['', []], description: ['', []], status: ['', []],
      completed_date: ['', []], response_date: ['', []], clientcdate: ['', []], clientmdate: ['', []], createddate: ['', []],
      modifieddate: ['', []], task_assigned_by: ['', []], task_assigned_to: ['', []], task_modified_by: ['', []],
      group_task_flag: ['', []], task_start_time: ['', []], task_due_time: ['', []]

    });




  } // ngOnInit end






  getTaskData(data: any) {

    let k;
    let temp: number = 0;
    if (data !== undefined || data !== null) {
      for (k = 0; k < data.length; k++) {
        this.usertaskdetails.patchValue(this.fetchEidtdata(
          data[k][0],
          data[k][1],
          data[k][2],
          data[k][3],
          data[k][4],
          data[k][5],
          data[k][6],
          data[k][7],
          data[k][8],
          data[k][9],

        ));
      }
    }
  }


  fetchEidtdata(arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any, arg7: any, arg8: any, arg9: any) {

    return {


      task_type_id: arg0,
      task_assigned_by: arg1,
      task_assigned_to: arg2,
      createddate: arg3,
      task_due_date: arg4,
      completed_date: arg5,
      priority_id: arg6,
      response_date: arg7,
      task_status_id: arg8,
      description: arg9,

    }
  }










}