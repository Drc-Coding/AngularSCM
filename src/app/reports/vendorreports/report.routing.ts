import {Routes} from '@angular/router';








import { reportComponent } from './report.component'  ;


export const reportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'VendorReports',

        component: reportComponent,
        data: {
          breadcrumb: 'Vendor Reports'
        } 
        

      } 



    ]
  }
];


