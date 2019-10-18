import {Routes} from '@angular/router';



import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'HRMSReports',

        component: reportComponent,
        data: {
          breadcrumb: 'HRMS Reports'
        } 

      } 



    ]
  }
];


