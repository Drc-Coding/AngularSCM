import { Routes } from '@angular/router';

import { ViewusertaskComponent } from './viewusertask/viewusertask.component';
import { AddUsertaskComponent } from './addusertask/addusertask.component';
import { ViewmytasksComponent } from './viewmytasks/viewmytasks.component';
import { UsertaskdetailsComponent } from './usertaskdetails/usertaskdetails.component';
import { PendingtasksComponent } from './pendingtasks/pendingtasks.component';


export const UsertaskRoutes: Routes = [
    


    {
          

        path: 'Usertaskdetail/:id', component: UsertaskdetailsComponent,
        data: {
            breadcrumb: 'User Task Details',
        }
    },


    {

    path: '',



    children: [

        {

            path: 'UserTask',

            component: AddUsertaskComponent,

            data: {
                breadcrumb: 'UserTask'
            }

        }, 
        
        {
            path: 'ViewUserTask',
            component: ViewusertaskComponent,
            data: {
                breadcrumb: 'View User Task',
            }
        },
        
        {
            path: 'ViewMyTasks',
            component: ViewmytasksComponent,
            data: {
                breadcrumb: 'View My Tasks',
            }
        },


    
        
        {
            path: 'PendingTasks',
            component: PendingtasksComponent,
            data: {
                breadcrumb: 'Pendingtasks',
            }
        }

       


    


      ]




}];
