import {Routes} from '@angular/router';
import { gatePassSaveComponent } from './gatePassSave/gatePassSave.component'; 
import { gatePassEditComponent } from './gatePassEdit/gatePassEdit.component';
import { gatePassViewComponent } from './gatePassView/gatePassView.component';


export const gatePassRoutes: Routes = [


  {path: 'gatePassEdit/:id', component: gatePassEditComponent ,
  data: {
    breadcrumb: 'GatePass'
  }},

  {
    path: '',


    children: [
     
      {
        path: 'GatePass',

        component: gatePassSaveComponent,
        data: {
          breadcrumb: 'GATE PASS'
        }

      },
      {
        path: 'GatePassEdit',

        component: gatePassEditComponent,
        data: {
          breadcrumb: 'GATE PASS'
        }

      },   {
        path: 'ViewGatePass',

        component: gatePassViewComponent,
        data: {
          breadcrumb: 'GATE PASS'
        }

      }


    ]
  }
];


