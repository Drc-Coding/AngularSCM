import {Routes} from '@angular/router';
import { purcGatePassSaveComponent } from './purcGatePassSave/purcGatePassSave.component'; 
import { purcGatePassEditComponent } from './purcGatePassEdit/purcGatePassEdit.component';
import { purcGatePassViewComponent } from './purcGatePassView/purcGatePassView.component';


export const purcGatePassRoutes: Routes = [


  {path: 'purcGatePassEdit/:id', component: purcGatePassEditComponent ,
  data: {
    breadcrumb: 'GatePass'
  }},

  {
    path: '',


    children: [
     
      {
        path: 'PurchaseGatePass',

        component: purcGatePassSaveComponent,
        data: {
          breadcrumb: 'PURCHASE GATE PASS'
        }

      },
      {
        path: 'PurcGatePassEdit',

        component: purcGatePassSaveComponent,
        data: {
          breadcrumb: 'PURCHASE GATE PASS'
        }

      },   {
        path: 'ViewPurchaseGatePass',

        component: purcGatePassViewComponent,
        data: {
          breadcrumb: 'PURCHASE GATE PASS'
        }

      }


    ]
  }
];


