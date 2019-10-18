import { Routes } from '@angular/router';
import { TheraComponent } from './thera.component';
import { addTherapeuticComponent } from './addTherapeutic/addTherapeutic.component';
import { editTherapeuticComponent } from './editTherapeutic/editTherapeutic.component';
import { viewTherapeuticComponent } from './viewTherapeutic/viewTherapeutic.component';
export const theraRoutes: Routes = [
    { path: 'editTherapeutic/:id', component: editTherapeuticComponent},
    {
        path: '',
        children: [
            {
                path: 'addtherapeutic',
                component: addTherapeuticComponent,
                data: {
                    breadcrumb: 'Add Therapeutic'
                }
            }, {
                path: 'viewtherapeutic',
                component: viewTherapeuticComponent,
                data: {
                    breadcrumb: 'View Therapeutic'
                }
            }
        ]
    }];
