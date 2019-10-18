import {Routes} from '@angular/router';


import { slsInvSaveComponent } from './slsInvSave/slsInvSave.component'  ;


import { slsInvEditComponent } from './slsInvEdit/slsInvEdit.component'  ;

import { slsInvViewComponent } from './slsInvView/slsInvView.component'  ;



export const salesinvoiceRoutes: Routes = [


  {path: 'slsInvEdit/:id', component: slsInvEditComponent  ,
  data: {
    breadcrumb: 'Edit Sales Invoice'
  }},

  {
    path: '',


    children: [
      {
        path: 'SalesInvoice',

        component: slsInvSaveComponent,
        data: {
          breadcrumb: 'Sales Invoice'
        }

      }  ,  {
        path: 'slsInvEdit',

        component: slsInvEditComponent,
        data: {
          breadcrumb: 'Edit Sales Invoice'
        }

      } ,  {
        path: 'SalesMaintenance',

        component: slsInvViewComponent,
        data: {
          breadcrumb: 'Sales Invoice Maintenance'
        }

      }


    ]
  }
];


