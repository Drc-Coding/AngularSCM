import {Routes} from '@angular/router';
import {indentStatusComponent} from './indentStatus.component';
import {indentStatusViewComponent} from './indentView/indentStatus.component';
export const indentStatusRoutes: Routes = [

 {
  path: '',  
   
  component: indentStatusComponent,
        data: {
            breadcrumb: 'INDENT',
            status: false
        },
        children: [
          {
                path: 'ViewRequisitionStatus',
                component: indentStatusViewComponent,
                data: {
                    breadcrumb: 'Requisition Status View'                   
                }
            }
          ]
}];
