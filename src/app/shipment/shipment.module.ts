import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { shipmentRoutes } from "./shipment.routing";
import { SharedModule } from "app/shared/shared.module";
import { addShipment } from "./addShipment/addShipment.component";
import { ViewShipmentComponent } from "./viewShipment/viewShipment.component";
import {CategoryPipe} from  "./viewShipment/viewShipment.component.pipe";



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(shipmentRoutes),
        SharedModule,
    ],


    declarations: [addShipment,ViewShipmentComponent,CategoryPipe ]
})


export class ShipmentModule {



}