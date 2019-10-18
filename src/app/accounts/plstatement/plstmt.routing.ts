import {Routes} from '@angular/router';



import { plstmtSaveComponent } from './plstmtSave/plstmtSave.component';


import { plstmtEditComponent } from './plstmtEdit/plstmtEdit.component';


import { plstmtViewComponent } from './plstmtView/plstmtView.component';


export const plstmtRoutes: Routes = [



  {
    path: '',


    children: [
      {
        path: 'ProfitLossStatement',

        component: plstmtSaveComponent,
        data: {
          breadcrumb: 'Profit & Loss Statement'
        }

      },  {
        path: 'plstmtEdit',

        component: plstmtEditComponent,

      },  {
        path: 'plstmtView',

        component: plstmtViewComponent,

      }


    ]
  }
];


