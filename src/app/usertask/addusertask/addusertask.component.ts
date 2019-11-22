import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Usertaskservice } from '../usertask.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';



@Component({
    selector: 'app-usertask',
    templateUrl: './addusertask.component.html',
    styleUrls: ['./addusertask.component.css'],
    providers: [Usertaskservice, NotificationsComponent]
})


export class AddUsertaskComponent implements OnInit {

    usertask: FormGroup;
    selobj;
    dept: any;
    subdept: any;
    division: any;
    subdivision: any;
    returnFlag: boolean;
    tasktype: any;
    taskspriority: any;
    empname: any;




    constructor(private usertaskservice: Usertaskservice, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent) { }




    ngOnInit() {

        this.selobj = {
            userid: AppComponent.userID, locrefid: AppComponent.locrefID1,
            locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
            companyid: AppComponent.companyID, branchrefid: AppComponent.branchID
        };

        this.usertaskservice.getDept(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid).subscribe(data => { this.dept = data },
                err => {
                    console.log('Error Occured ');
                });





        const companyrefid = new FormControl();

        const branchrefid = new FormControl();
        const locname = new FormControl();
        const locrefid = new FormControl();

        const subdivisionid = new FormControl();

        const task_type_id = new FormControl();
        const task_number = new FormControl('0');
        const task_title = new FormControl();
        const deptid = new FormControl();
        const subdeptid = new FormControl();
        const divisionid = new FormControl();
        const employeeid = new FormControl(0);
        const task_start_date = new FormControl();
        const task_due_date = new FormControl();
        const task_start_time = new FormControl();
        const task_due_time = new FormControl();
        const priority_id = new FormControl();
        const task_status_id = new FormControl(0);
        const createdby = new FormControl(0);
        const modifiedby = new FormControl(0);
        const description = new FormControl();
        const status = new FormControl(0);
        // const completed_date = new FormControl('0');
        // const response_date = new FormControl('0');
        // const clientcdate = new FormControl(this.dateformat.transform04());
        //const clientmdate = new FormControl('0');
        const createddate = new FormControl();
        const modifieddate = new FormControl();
        const task_assigned_by = new FormControl(0);
        const task_assigned_to = new FormControl(0);
        const task_modified_by = new FormControl(0);
        const group_task_flag = new FormControl(0);
        const userid = new FormControl();
        //const document_title = new FormControl();
        // const related_document= new FormControl();

        this.usertask = new FormGroup({


            subdivisionid: subdivisionid,
            task_type_id: task_type_id,
            task_number: task_number,
            task_title: task_title,
            deptid: deptid,
            subdeptid: subdeptid,
            divisionid: divisionid,
            employeeid: employeeid,
            task_start_date: task_start_date,
            task_due_date: task_due_date,
            task_start_time: task_start_time,
            task_due_time: task_due_time,
            priority_id: priority_id,
            task_status_id: task_status_id,
            createdby: createdby,
            modifiedby: modifiedby,
            description: description,
            status: status,
            // completed_date: completed_date,
            // response_date: response_date,
            // clientcdate: clientcdate,
            // clientmdate: clientmdate,
            createddate: createddate,
            modifieddate: modifieddate,
            //  related_document:related_document,
            // document_title: document_title,
            task_assigned_by: task_assigned_by,
            task_assigned_to: task_assigned_to,
            task_modified_by: task_modified_by,
            group_task_flag: group_task_flag,
            userid: userid,
            companyrefid: companyrefid,
            branchrefid: branchrefid,
            locname: locname,
            locrefid: locrefid


        });

        this.usertask.get('companyrefid').setValue(AppComponent.companyID);
        this.usertask.get('branchrefid').setValue(AppComponent.branchID);
        this.usertask.get('locname').setValue(AppComponent.locrefID);
        this.usertask.get('locrefid').setValue(AppComponent.shopID);
        this.usertask.get('task_type_id').setValue('opt1');
        this.usertask.get('deptid').setValue('opt1');
        this.usertask.get('subdeptid').setValue('opt1');
        this.usertask.get('divisionid').setValue('opt1');
        this.usertask.get('subdivisionid').setValue('opt1');
        this.usertask.get('employeeid').setValue('opt1');
        this.usertask.get('priority_id').setValue('opt1');







        this.usertaskservice.getTaskType(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid).subscribe(data => { this.tasktype = data },
                err => {
                    console.log('Error Occured getTaskType() ');
                });


        this.usertaskservice.getTaskPriority(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid).subscribe(data => { this.taskspriority = data },
                err => {
                    console.log('Error Occured ');
                });


    }

    basicValidation(): boolean {

        if (this.usertask.get('task_title').value == null) {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Task Title....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }


        else if (this.usertask.get('deptid').value == "opt1") {



            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Department....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }


        else if (this.usertask.get('subdeptid').value == "opt1") {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Sub Department..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }

        else if (this.usertask.get('divisionid').value == "opt1") {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Division..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }

        else if (this.usertask.get('subdivisionid').value == "opt1") {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter  Sub Division..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }



        else if (this.usertask.get('employeeid').value == "opt1") {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter  Sub Division..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }





        else if (this.usertask.get('task_start_time').value == null) {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please check Start Time..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }

        else if (this.usertask.get('task_due_time').value == null) {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please check  Due Time..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }

        else if (this.usertask.get('task_start_date').value == null) {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please check  Start date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }

        else if (this.usertask.get('task_due_date').value == null) {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please check  Due date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }

        else if (this.usertask.get('priority_id').value == "opt1") {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Priority..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }


        return true;

    }



    onSubmit() {

        this.returnFlag = this.basicValidation();


        if (this.returnFlag) {

            if (new Date(this.usertask.controls['task_start_date'].value) > new Date(this.usertask.controls['task_due_date'].value)) {


                this.notificationsComponent.addToast({
                    title: 'Error', msg: 'Please check task due date greater than task start date....', timeout: 5000, theme:
                        'default', position: 'top-right', type: 'error'
                });

            }



            else {


                this.usertask.get('userid').setValue(parseInt(AppComponent.userID));

                this.usertask.get('task_assigned_to').setValue(this.usertask.get('employeeid').value)

                this.usertaskservice.saveTaskAssignment(JSON.stringify(this.usertask.value)).subscribe(data => {
                    this.savevalid(data);





                });

            }

        }


    }


    savevalid(data: any) {


        if (data) {
            this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });

        } else if (!data) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
    }







    // getSubDivision(){

    // this.usertaskservice.getSubDivision(this.selobj.companyid,this.selobj.branchrefid,this.selobj.locname,
    //     this.selobj.locrefid, this.usertask.get('divid').value  ).subscribe(data =>{ this.subdept = data},
    //     err => {
    //       console.log('Error Occured ');
    //     });


    // }

    getSubDept() {

        this.usertaskservice.getSubDept(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, this.usertask.get('deptid').value).subscribe(data => { this.subdept = data },
                err => {
                    console.log('Error Occured ');
                });


    }

    getEmployee() {

        this.usertaskservice.getEmployee(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, this.usertask.get('deptid').value).subscribe(data => { this.empname = data },
                err => {
                    console.log('Error Occured ');
                });


    }




    getDivision() {

        this.usertaskservice.getDivision(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, this.usertask.get('deptid').value, this.usertask.get('subdeptid').value).subscribe(data => { this.division = data },
                err => {
                    console.log('Error Occured ');
                });


    }

    getSubDivision() {

        this.usertaskservice.getSubDivision(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid, this.usertask.get('deptid').value, this.usertask.get('subdeptid').value, this.usertask.get('divisionid').value).subscribe(data => { this.subdivision = data },
                err => {
                    console.log('Error Occured ');
                });


    }














}


