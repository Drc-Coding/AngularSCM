import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { invoiceRoutes } from './purchaseInvoice.routing';
import { invoiceComponent } from './purchaseInvoice.component';
import { addinvoiceComponent } from './addPurchaseinvoice/addPurchaseinvoice.component';
import { viewinvoiceComponent } from './viewPurchaseinvoice/viewPurchaseinvoice.component';
import { editinvoiceComponent } from './editPurchaseinvoice/editPurchaseinvoice.component';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
//import { CategoryPipe } from './addPurchaseinvoice/addPurchaseinvoice.pipe';
/* Others  */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryPipe } from './viewPurchaseinvoice/viewPurchaseinvoice.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(invoiceRoutes),
    SharedModule,
    HttpClientModule,
    NgxPaginationModule,
    DxDataGridModule,
    DxButtonModule,

  ],
  declarations: [invoiceComponent, addinvoiceComponent, viewinvoiceComponent, editinvoiceComponent, CategoryPipe,]
})

export class invoiceModule { }