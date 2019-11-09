import { Routes } from '@angular/router';
import { UsertaskComponent } from './usertask.component';


export const UsertaskRoutes: Routes = [{



    path: '',



    children: [

        {

            path: 'Usertask',

            component: UsertaskComponent,

            data: {
                breadcrumb: 'UserTask'
            }

        },

       





    ]




}];

