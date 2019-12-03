import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { UsertaskRoutes } from './usertask.routing';

import { ViewusertaskComponent } from './viewusertask/viewusertask.component';
import { AddUsertaskComponent } from './addusertask/addusertask.component';
import { ViewmytasksComponent } from './viewmytasks/viewmytasks.component';
import { UsertaskdetailsComponent } from './usertaskdetails/usertaskdetails.component';
import { PendingtasksComponent } from './pendingtasks/pendingtasks.component';





@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsertaskRoutes),
    SharedModule,
    DxDataGridModule,
    DxButtonModule,
    NgxPaginationModule
  ],
  declarations: [AddUsertaskComponent,ViewusertaskComponent, ViewmytasksComponent,UsertaskdetailsComponent, PendingtasksComponent ]
})

export class UsertaskModule { }