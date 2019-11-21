import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { salesOrderServicenew } from '../salesordernew.services';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
@Component({
    selector: 'app-viewSalesOrder',
    templateUrl: './viewsalesordernew.component.html',
})

export class viewSalesOrderComponentnew implements OnInit {
    public data: any;
    public rowsOnPage: number = 10;
    public filterQuery: string = "";
    public sortBy: string = "";
    public sortOrder: string = "desc";
   
    deviceObj: any;

    constructor(private viewOrder: salesOrderServicenew, private route: Router,private dateformat: dateFormatPipe,
        private fb: FormBuilder,private appComponent: AppComponent) {
  

     }


    ngOnInit() {
     
        if (AppComponent.shopID != 0) {
            this.viewOrder.viewSalesorder(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data =>{ this.data = data},
                err => {
                    console.log('Error Occured On viewSalesorder()');
                });
               
                this.devicedetails();
                this.deviceObj.apiname="api/getallSalesorderview";
                this.deviceObj.description="View SalesOrder";

                this.viewOrder.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
        }
        if (AppComponent.warehouseID != 0) {
            this.viewOrder.viewSalesorder(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.data = data,
                err => {
                    console.log('Error Occured On viewSalesorder()');
                });


                this.devicedetails();
                this.deviceObj.apiname="api/getallSalesorderview";
                this.deviceObj.description="View SalesOrder";

                this.viewOrder.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});

        }
        if (AppComponent.hospitalID != 0) {
            this.viewOrder.viewSalesorder(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.data = data,
                err => {
                    console.log('Error Occured On viewSalesorder()');
                });

                this.devicedetails();
                this.deviceObj.apiname="api/getallSalesorderview";
                this.deviceObj.description="View SalesOrder";

                this.viewOrder.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});

        }
    }



    devicedetails(){

        this.deviceObj = {

            userid: AppComponent.userID,
            companyrefid: AppComponent.companyID,
            branchrefid: AppComponent.branchID,
            locname: AppComponent.locRefName1,
            locrefid: AppComponent.locrefID1,
            clientcdate:this.dateformat.transform04(),
            ipaddress: this.appComponent.ipAddress, 
            browsertype: this.appComponent.browser,
            ostype: this.appComponent.os,
            osversion: this.appComponent.osversion,
            devicetype: this.appComponent.devicetype,
            description:'',
            apiname:''

          };
      
    }


    deleteSalesOrder(id: number) {
        
    var answer = confirm("Delete data?");
    if (answer) {
        this.viewOrder.cancelSalesdata(id).subscribe(data =>
        err => {
            console.log('Error Occured On cancelSalesorder()');
        });

        //Send Details for Activity
        
        this.devicedetails();
        this.deviceObj.apiname="api/deletesalesOrder";
        this.deviceObj.description="Removed SalesOrder Data"
        
        this.viewOrder.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});

        this.ngOnInit();
       }

    }

    addOrder() {
        this.route.navigate(['SalesOrder/SalesOrder']);
    }

}


