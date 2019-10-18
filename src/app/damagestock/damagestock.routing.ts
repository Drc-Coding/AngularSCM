import { AdddamagestockComponent } from './adddamagestock/adddamagestock.component';
import { viewDamageComponent } from './viewdamagestock/viewdamagestock.component';
import { EditdamagestockComponent } from './editdamagestock/editdamagestock.component';
import { ViewdamagestockhqComponent } from './viewdamagestockhq/viewdamagestockhq.component';
import { ViewhqComponent } from './viewhq/viewhq.component';
import { Routes } from '@angular/router';
export const DamagestockRoutes: Routes = [
    {
        path: 'editdamagestock/:id',
        component: EditdamagestockComponent,
        data: {
            breadcrumb: 'Edit Damage Stock'
        }
    },{
        path: 'viewdamagestockhq/:id',
        component: ViewdamagestockhqComponent,
        data: {
            breadcrumb: 'View Damage_Stock From Other Location'
        }
    },{
        path: 'viewhq',
        component: ViewhqComponent,
        data: {
            breadcrumb: 'View Damage_Stock From Other Location'
        }
    },
    {
        path: '',
        children: [
            {
                path: 'DamageStock',
                component: AdddamagestockComponent,
                data: {
                    breadcrumb: 'Add Damaged Stock',
                }
            }, {
                path: 'ViewDamageStock',
                component: viewDamageComponent,
                data: {
                    breadcrumb: 'View Damaged Stock',
                }
            }
        ]
    }]

