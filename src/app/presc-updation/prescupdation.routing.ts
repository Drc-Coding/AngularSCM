import { Routes } from "@angular/router";
import { PrescUpdationComponent } from "./presc-updation.component";
import { AddprescUpdationComponent } from "./addpresc-updation/addpresc-updation.component";
import { ViewprescriptionComponent } from "./viewprescription/viewprescription.component";
export const PrescUpdationRouting: Routes = [{
    path: '',
       children: [
            {
                path: 'AddPrescriptionUpdation',
                component: AddprescUpdationComponent,
                data:{
                    breadcrumb: 'Prescription Updation',
                
                }
            },
        ]
    },
    
    {
        path:'',
        children: [
            {
            path:'ViewUpdatePrescription',
            component:ViewprescriptionComponent,
            data:{
                breadcrumb:'View Pricscription',
            }
        },

        ]
}
];
