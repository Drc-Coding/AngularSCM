import {Routes} from '@angular/router';




import { ledgerSaveComponent } from './ledgerSave/ledgerSave.component';


export const ledgerRoutes: Routes = [



  {
    path: '',


    children: [
       {
        path: 'Ledger',

        component: ledgerSaveComponent,
        data: {
          breadcrumb: 'Ledger'
        }

      }


    ]
  }
];


