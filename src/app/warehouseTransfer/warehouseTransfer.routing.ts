
import { Routes } from '@angular/router';
import { CreateWarehTransferComponent } from './create-WarehTransfer/create-warehTransfer.component';
import { ViewwarehTransferComponent } from './viewwarehTransfer/viewwarehTransfer.component';
export const WarehTransferRoutes: Routes = [
    {
 path: '',
        data: {
            breadcrumb: 'Add Warehouse Transfer',
            status: false
        },
        children: [
           {
                path: 'create-WarehTransfer',
                component: CreateWarehTransferComponent,
                data: {
                    breadcrumb: 'Warehouse Transfer',
                    status: true
                }
          },
          {
                path: 'viewwarehTransfer',
                component: ViewwarehTransferComponent,
                data: {
                    breadcrumb: 'View Warehouse Transfer',
                    status: true
                }
          }
        ]
}]
