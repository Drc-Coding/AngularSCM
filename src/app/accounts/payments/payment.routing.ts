import {Routes} from '@angular/router';

import {savePaymentComponent} from './savePayment/savePayment.component';
import {editPaymentComponent} from './editPayment/editPayment.component';
import {viewPaymentComponent} from './viewPayment/viewPayment.component';

import {saveBulkPtComponent} from './saveBulkPt/saveBulkPt.component';



export const paymentRoutes: Routes = [



  {path: 'editPayment/:id', component: editPaymentComponent  ,    data: {
    breadcrumb: 'Payment'
  }},
  {
    path: '',


    children: [
     {
        path: 'Payment',

        component: savePaymentComponent,
        data: {
          breadcrumb: 'Payment'
        }

      }
      ,{
        path: 'editPayment',

        component: editPaymentComponent,

        data: {
          breadcrumb: 'Payment'
        }

      }
      ,{
        path: 'ViewPayment',

        component: viewPaymentComponent,

        data: {
          breadcrumb: 'Payment Maintenence'
        }

      }
      ,{
        path: 'BulkPayment',

        component: saveBulkPtComponent,

        data: {
          breadcrumb: 'Payment'
        }

      }


    ]
  }
];


