import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { warehouseRoutes } from "./warehouse.routing";
import { SharedModule } from "app/shared/shared.module";
import { Addwarehousecomponent } from "./addwarehouse/addwarehouse.component";
import { ViewWarehouseComponent } from "./viewwarehouse/viewwarehouse.component";
import { Editwarehousecomponent } from "./editwarehouse/editwarehouse.component";





@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(warehouseRoutes),
        SharedModule,
    ],


    declarations: [Addwarehousecomponent, ViewWarehouseComponent, Editwarehousecomponent ]

})


export class WarehouseModule {


}