import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { ViewwarehouseComponent } from './viewwarehouse/viewwarehouse.component';
import { Routes } from '@angular/router';
export const WarehouseRoutes: Routes = [
    {
 path: '',
        data: {
            breadcrumb: 'Add Warehouse',
            status: false
        },
        children: [
           {
                path: 'create-warehouse',
                component: CreateWarehouseComponent,
                data: {
                    breadcrumb: 'Warehouse',
                    status: true
                }                                                 // viewwarehouse
          },
          {
                path: 'viewwarehouse',
                component: ViewwarehouseComponent,
                data: {
                    breadcrumb: 'View Warehouse',
                    status: true
                }
          }
        ]
}]
