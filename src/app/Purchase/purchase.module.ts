import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {purchaseRoutes} from './purchase.routing';
import {PurchaseTableComponent} from './purchase.component';
import {purchaseOrderComponent} from './purchaseOrder/purchaseOrder.component';
import {purchaseOrderEditComponent} from './purchaseOrderEdit/purchaseOrderEdit.component';
import {purchaseOrderViewComponent} from './purchaseOrderView/purchaseOrderView.component';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {CategoryPipe} from './purchaseOrderView/purchaseOrderView-list.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(purchaseRoutes),
    SharedModule, 
    DxDataGridModule,
    DxButtonModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule
  ],
  declarations: [purchaseOrderComponent,purchaseOrderEditComponent,purchaseOrderViewComponent,CategoryPipe]
})

export class PurchaseModule {}