import {Routes} from '@angular/router';



import { accountsSaveComponent } from './accountsSave/accountsSave.component' ;

import { accountsEditComponent } from './accountsEdit/accountsEdit.component'  ;


import { accountsViewComponent } from './accountsView/accountsView.component'  ;

export const accountsRoutes: Routes = [



  {
    path: '',


    children: [
      {
        path: 'companysave',

        component: accountsViewComponent,

      }  ,    {
        path: 'Accounts',

        component: accountsSaveComponent,
        data: {
          breadcrumb: 'Charts Of Accounts'
        }

      },    {
        path: 'accountsEdit',

        component: accountsEditComponent,

      },    {
        path: 'accountsView',

        component: accountsViewComponent,

      }


    ]
  }
];


