import {Routes} from '@angular/router';
import { challanSaveComponent } from './chalanSave/challanSave.component'; 
import { challanEditComponent } from './challanEdit/challanEdit.component';
import { challanViewComponent } from './challanView/challanView.component';


export const challanRoutes: Routes = [


  {path: 'challanEdit/:id', component: challanEditComponent ,
  data: {
    breadcrumb: 'Delivery Challan'
  }},

  {
    path: '',


    children: [
     
      {
        path: 'DeliveryReceipt',

        component: challanSaveComponent,
        data: {
          breadcrumb: 'Delivery Receipt'
        }

      },
      {
        path: 'challanEdit',

        component: challanEditComponent,
        data: {
          breadcrumb: 'Delivery Challan'
        }

      },   {
        path: 'ViewDeliveryReceipt',

        component: challanViewComponent,
        data: {
          breadcrumb: 'Delivery Challan'
        }

      }


    ]
  }
];


