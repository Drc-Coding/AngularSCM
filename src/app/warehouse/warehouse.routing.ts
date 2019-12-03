import { Routes } from "@angular/router";
import { Addwarehousecomponent } from "./addwarehouse/addwarehouse.component";
import { ViewWarehouseComponent } from "./viewwarehouse/viewwarehouse.component";





export const warehouseRoutes: Routes = [{



    path: '',


    children: [{

        path: 'AddWarehouse',

        component: Addwarehousecomponent,

        data: {


            breadcrumb: 'AddWarehouse'
        }
    },


    {

    path: 'ViewWarehouse',

    component: ViewWarehouseComponent,

    data: {


        breadcrumb: 'ViewWarehouse'
    }
},




    ]





}];