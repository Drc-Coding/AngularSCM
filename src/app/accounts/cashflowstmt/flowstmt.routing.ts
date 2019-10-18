import {Routes} from '@angular/router';


import { flowstmtSaveComponent } from './flowstmtSave/flowstmtSave.component';

import { flowstmtEditComponent } from './flowstmtEdit/flowstmtEdit.component';

import { flowstmtViewComponent } from './flowstmtView/flowstmtView.component';


export const flowstmtRoutes: Routes = [



  {
    path: '',


    children: [
      {
        path: 'CashflowStatement',

        component: flowstmtSaveComponent,
        data: {
          breadcrumb: 'Cashflow Statement'
        }


      } , {
        path: 'flowstmtEdit',

        component: flowstmtEditComponent,

      }, {
        path: 'flowstmtView',

        component: flowstmtViewComponent,

      }


    ]
  }
];


