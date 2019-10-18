import {Routes} from '@angular/router';








import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'PurchaseReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Purchase Reports'
        } 

      } 



    ]
  }
];


