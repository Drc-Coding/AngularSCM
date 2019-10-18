import {Routes} from "@angular/router";
import {BasicComponent} from "./basic/basic.component";
import { InvoiceprintComponent } from "./invoiceprint.component";



export const InvoiceRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Invoice',       
        },
        children: [
            {
                path: 'basic/:id',
                component: BasicComponent,
                data: {
                    breadcrumb: 'Invoice',                    
                }
            }
            
        ]
    }
]

