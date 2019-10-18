import {Routes} from '@angular/router';



import { trialbalanceSaveComponent } from './trialbalanceSave/trialbalanceSave.component';


import { balanceAdjComponent } from './balanceAdj/balanceAdj.component';
import { balanceAdjViewComponent } from './balanceAdjView/balanceAdjView.component';

import { trialbalanceViewComponent } from './trialbalanceView/trialbalanceView.component';


export const trialbalanceRoutes: Routes = [



  {
    path: '',


    children: [
      {
        path: 'TrialBalance',

        component: trialbalanceSaveComponent ,
        data: {
          breadcrumb: 'TrialBalance'
        }

      }  , {
        path: 'AdjustBalance',

        component: balanceAdjComponent ,
        data: {
          breadcrumb: 'Adjust Balance '
        }

      }, {
        path: 'trialbalanceView',

        component: trialbalanceViewComponent ,

      }, {
        path: 'AdjustBalanceView',

        component: balanceAdjViewComponent ,

      }


    ]
  }
];


