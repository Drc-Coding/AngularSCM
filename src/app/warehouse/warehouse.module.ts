import { SharedModule } from '../shared/shared.module';

import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseRoutes } from './warehouse.routing';
import { Datawarehouse } from './warehouse.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewwarehouseComponent } from './viewwarehouse/viewwarehouse.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WarehouseRoutes),
    SharedModule
  ],
  declarations: [WarehouseComponent, CreateWarehouseComponent, ViewwarehouseComponent, WarehouseDetailsComponent],
  providers: [Datawarehouse]
})
export class WarehouseModules { }
