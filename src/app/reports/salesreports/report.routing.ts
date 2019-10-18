import {Routes} from '@angular/router';








import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'SalesReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Sales Reports'
        } 

      } 



    ]
  }
];


