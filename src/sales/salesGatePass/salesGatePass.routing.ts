import {Routes} from '@angular/router';
import { salesGatePassSaveComponent } from './salesGatePassSave/salesGatePassSave.component'; 
import { salesGatePassEditComponent } from './salesGatePassEdit/salesGatePassEdit.component';
import { salesGatePassViewComponent } from './salesGatePassView/salesGatePassView.component';


export const salesGatePassRoutes: Routes = [


  {path: 'salesGatePassEdit/:id', component: salesGatePassEditComponent ,
  data: {
    breadcrumb: 'EDIT GATE PASS'
  }},

  {
    path: '',


    children: [
     
      {
        path: 'SalesGatePass',

        component: salesGatePassSaveComponent,
        data: {
          breadcrumb: 'SALES GATE PASS'
        }

      },
      
      
      // {
      //   path: 'SalesGatePassEdit',

      //   component: salesGatePassEditComponent,
      //   data: {
      //     breadcrumb: 'SALES GATE PASS'
      //   }

      // },   
      
      
      
      
      
      {
        path: 'ViewSalesGatePass',

        component: salesGatePassViewComponent,
        data: {
          breadcrumb: 'SALES GATE PASS'
        }

      }


    ]
  }
];


