import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { NotificationsComponent } from '../notifications/notifications.component';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { UsertaskRoutes } from './usertask.routing';
import { UsertaskComponent } from './usertask.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsertaskRoutes),
    SharedModule,
    DxDataGridModule,
    DxButtonModule,
    NgxPaginationModule
  ],
  declarations: [UsertaskComponent]
})

export class UsertaskModule { }