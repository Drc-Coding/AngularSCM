import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { viewInvoicesessionService } from '../viewPurchasesession/viewPurchasesession.services';
import { AppComponent } from '../../app.component';
@Component({
    /**@Author Ajith Kumar**/
    selector: 'app-viewCompany',
    templateUrl: './viewSessionAll.component.html',
    providers: [viewInvoicesessionService]
})

export class viewSessionAll implements OnInit {
    public data: any;
    public rowsOnPage: number = 10;
    public filterQuery: string = "";
    public sortBy: string = "";
    public sortOrder: string = "desc";
    constructor(private viewSession: viewInvoicesessionService) { }

    ngOnInit() {
        if (AppComponent.shopID != 0) {
            this.viewSession.viewSessionAll(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID, AppComponent.shopID).subscribe(data => this.data = data,


                err => {

                    console.log('Error occured On viewSessionAll()');
                });
        }
        if (AppComponent.hospitalID != 0) {
            this.viewSession.viewSessionAll(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID, AppComponent.hospitalID).subscribe(data => this.data = data,
                err => {
                    console.log('Error occured On viewSessionAll()');
                });
        }
        if (AppComponent.warehouseID != 0) {
            this.viewSession.viewSessionAll(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID, AppComponent.warehouseID).subscribe(data => this.data = data,
                err => {
                    console.log('Error occured On viewSessionAll()');
                });
        }
    }
}


