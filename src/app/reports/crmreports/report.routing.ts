import {Routes} from '@angular/router';
import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [

  {
    path: '',

    children: [
     {
        path: 'CRMReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Customer Reports'
        } 

      } 



    ]
  }
];


