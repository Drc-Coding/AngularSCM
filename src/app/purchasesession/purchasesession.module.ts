import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { purcsessionRoutes } from './purchasesession.routing';
import { purcsessionComponent } from './purchasesession.component';
import { addInvocesessionComponent } from './addPurchasesession/addPurchasesession.component';
import { viewInvoicesessionComponent } from './viewPurchasesession/viewPurchasesession.component';
import { editInvoicesessionComponent } from './editPurchasesession/editPurchasesession.component';
import { viewSessionAll } from './viewSessionAll/viewSessionAll.component';
import { SessionPipe } from './viewSessionAll/viewSessionAll.pipe';
/* Others  */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryPipe } from './viewPurchasesession/viewPurchasesession.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(purcsessionRoutes),
    SharedModule,
    HttpClientModule,
    NgxPaginationModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule
  ],
  declarations: [purcsessionComponent, addInvocesessionComponent, viewInvoicesessionComponent, editInvoicesessionComponent, CategoryPipe, viewSessionAll, SessionPipe]
})

export class invoicesessionModule { }