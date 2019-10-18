import {Routes} from '@angular/router';








import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'StockReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Reports'
        } 

      } 



    ]
  }
];


