import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { salesOrderRoutes } from './salesordernew.routing';
import { salesOrderComponentnew } from './salesordernew.component';
import { addsalesOrderComponentnew } from './addsalesordernew/addsalesordernew.component';
import { salesOrderServicenew } from './salesordernew.services';
import { NotificationsComponent } from '../notifications/notifications.component';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { CategoryPipe } from './viewsalesordernew/viewsalesordernew.pipe';
import { viewSalesOrderComponentnew } from './viewsalesordernew/viewsalesordernew.component';
import { viewSalesOrderRecordComponentnew } from './viewsalesorderrecordnew/viewsalesorderrecordnew.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {editsalesOrderComponentnew} from './editsalesordernew/editsalesordernew.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(salesOrderRoutes),
    SharedModule,
    DxDataGridModule,
    DxButtonModule,
    NgxPaginationModule
  ],
  declarations: [salesOrderComponentnew, addsalesOrderComponentnew, CategoryPipe, viewSalesOrderComponentnew,viewSalesOrderRecordComponentnew,editsalesOrderComponentnew],
  providers: [salesOrderServicenew, NotificationsComponent]
})

export class salesOrderModulenew { }