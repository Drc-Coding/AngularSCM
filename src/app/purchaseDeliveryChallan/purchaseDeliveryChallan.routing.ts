import {Routes} from '@angular/router';
import { purchaseChallanSaveComponent } from './purchaseChallanSave/purchaseChallanSave.component'; 
import { purchaseChallanEditcomponent } from './purchaseChallanEdit/purchaseChallanEdit.component';
import { purchaseChallanViewComponent } from './purchaseChallanView/purchaseChallanView.component';


export const purchaseChallanRoutes: Routes = [


  {
    path: 'purchaseChallanEdit/:id',
   component: purchaseChallanEditcomponent ,
  data: {
    breadcrumb: 'PURCHASE DELIVERY CHALLAN'
  }},

  {
    path: '',


    children: [
     
      {
        path: 'PurchaseDeliveryReceipt',

        component: purchaseChallanSaveComponent,
        data: {
          breadcrumb: 'Purchase Delivery Challan'
        }

      },
      {
        path: 'PurchaseChallanEdit',

        component: purchaseChallanEditcomponent,
        data: {
          breadcrumb: 'Purchasee Delivery Challan'
        }

      },   {
        path: 'ViewPurchaseDeliveryReceipt',

        component: purchaseChallanViewComponent,
        data: {
          breadcrumb: 'Purchase Challan View'
        }

      }


    ]
  }
];


