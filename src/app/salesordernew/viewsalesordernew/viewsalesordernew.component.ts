import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { salesOrderServicenew } from '../salesordernew.services';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
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
    constructor(private viewOrder: salesOrderServicenew, private route: Router) { }

    ngOnInit() {
        if (AppComponent.shopID != 0) {
            this.viewOrder.viewSalesorder(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data =>{ this.data = data},
                err => {
                    console.log('Error Occured On viewSalesorder()');
                });
        }
        if (AppComponent.warehouseID != 0) {
            this.viewOrder.viewSalesorder(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.data = data,
                err => {
                    console.log('Error Occured On viewSalesorder()');
                });
        }
        if (AppComponent.hospitalID != 0) {
            this.viewOrder.viewSalesorder(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.data = data,
                err => {
                    console.log('Error Occured On viewSalesorder()');
                });
        }
    }

    deleteSalesOrder(id: number) {

        
    var answer = confirm("Delete data?");
    if (answer) {
        this.viewOrder.cancelSalesdata(id).subscribe(data =>
        err => {
            console.log('Error Occured On cancelSalesorder()');
        });
        this.ngOnInit();
       }

    }

    addOrder() {
        this.route.navigate(['SalesOrder/SalesOrder']);
    }

}


