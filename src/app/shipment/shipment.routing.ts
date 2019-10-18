import { Routes } from "@angular/router";
import { addShipment } from "./addShipment/addShipment.component";
import { ViewShipmentComponent } from "./viewShipment/viewShipment.component";








export const shipmentRoutes: Routes = [{



    path: '',



    children: [

        {

            path: 'AddShipment',

            component: addShipment,

            data: {
                breadcrumb: 'Add Shipment'
            }

        },

        {
            path: 'ViewShipment',

            component: ViewShipmentComponent,

            data: {
                breadcrumb: 'View Shipment'
            }

        },






    ]





















}];