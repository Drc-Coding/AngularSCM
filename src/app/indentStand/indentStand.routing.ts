import {Routes} from '@angular/router';
import {indentStandComponent} from './indentStand.component';
import {indentStandViewComponent} from './indentStand/indentStandView.component';
export const indentStandRouting: Routes = [

 {
  path: '',  
   
  component: indentStandComponent,
        data: {
            breadcrumb: 'STANDLONE',
            status: false
        },
        children: [
          {
                path: 'ViewRequisition',
                component: indentStandViewComponent,
                data: {
                    breadcrumb: 'STANDLONE'                   
                }
            }
          ]
}];
