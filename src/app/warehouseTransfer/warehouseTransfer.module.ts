
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WarehTransferRoutes } from './warehouseTransfer.routing';
import { ViewwarehTransferComponent } from './viewwarehTransfer/viewwarehTransfer.component';
import { WarehouseDetTransferComponent } from './warehouse-detTransfer/warehouse-detTransfer.component';
import { CreateWarehTransferComponent } from './create-WarehTransfer/create-warehTransfer.component';
import { DatawarehTransfer } from './warehouseTransfer.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WarehTransferRoutes),
    SharedModule
  ],
  declarations: [CreateWarehTransferComponent, ViewwarehTransferComponent, WarehouseDetTransferComponent ],
  providers: [DatawarehTransfer]
})
export class WarehTransferModules { }
