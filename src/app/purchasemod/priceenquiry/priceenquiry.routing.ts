import {Routes} from '@angular/router';

import { prcenquirySaveComponent } from './prcenquirySave/prcenquirySave.component';

import { prcenquiryEditComponent } from './prcenquiryEdit/prcenquiryEdit.component'  ;

import { prcenquiryViewComponent } from './prcenquiryView/prcenquiryView.component';



import { priceUpdateComponent } from './priceUpdate/priceUpdate.component';


export const priceenquiryRoutes: Routes = [

  {path: 'prcenquiryEdit/:id', component:prcenquiryEditComponent  , 
  data: {
    breadcrumb: 'Price Enquiry'
  }},

  {
    path: '',


    children: [
   
           {
        path: 'PriceEnquiry',

        component: prcenquirySaveComponent,
        data: {
          breadcrumb: 'Price Enquiry'
        }

      },       {
        path: 'prcenquiryEdit',

        component: prcenquiryEditComponent,
        data: {
          breadcrumb: 'Price Enquiry'
        }

      },      {
        path: 'ViewPriceEnquiry',

        component: prcenquiryViewComponent,
        data: {
          breadcrumb: 'Price Enquiry Maintenance'
        }

      },      {
        path: 'PriceUpdateStatus',

        component: priceUpdateComponent,
        data: {
          breadcrumb: 'Price Update Status '
        }

      }




    ]
  }
];


