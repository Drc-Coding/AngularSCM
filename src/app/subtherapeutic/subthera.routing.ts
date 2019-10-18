import { Routes } from '@angular/router';
import { SubTherapeuticComponent } from './subthera.component';
import { addSubTherapeuticComponent } from './addSubTherapeutic/addSubTherapeutic.component';
import { editSubTherapeuticComponent } from './editSubTherapeutic/editSubTherapeutic.component';
import { ViewSubTherapeuticComponent } from './viewSubTherapeutic/viewSubTherapeutic.component';
export const subTheraRoutes: Routes = [
    {  path: 'editSubTherapeutic/:id', component: editSubTherapeuticComponent},
    {
        path: '',
        children: [
            {
                path: 'addsubtherapeutic',
                component: addSubTherapeuticComponent,
                data: {
                    breadcrumb: 'ADD SUB THERAPEUTIC'
                }
            }, {
                path: 'viewsubtherapeutic',
                component: ViewSubTherapeuticComponent,
                data: {
                    breadcrumb: 'VIEW SUB THERAPEUTIC'
                }
            }
        ]
    }];
