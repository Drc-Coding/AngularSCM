import { Routes } from "@angular/router";

import { SavepackingComponent } from "./savepacking/savepacking.component";
import { ViewpackingComponent } from "./viewpacking/viewpacking.component";
import { CheckpackingComponent } from "./checkpacking/checkpacking.component";
import { PackingapprovalComponent } from "./packingapproval/packingapproval.component";

export const PackingRoutes: Routes = [


    {
        path: '',

        children: [
            {
                path: 'Addpacking',
                component: SavepackingComponent,
                data: {
                    breadcrumb: 'Save Packing'
                }

            },
            {
                path: 'Viewpacking',
                component: ViewpackingComponent,
                data: {
                    breadcrumb: 'View Packing'
                }

            },
            {
                path: 'Wrapping',
                component: CheckpackingComponent,
                data: {
                    breadcrumb: 'Packing Check'
                }

            },
            {
                path: 'Labelling',
                component: PackingapprovalComponent,
                data: {
                    breadcrumb: 'Packing Approval'
                }

            }
        ]

    }]