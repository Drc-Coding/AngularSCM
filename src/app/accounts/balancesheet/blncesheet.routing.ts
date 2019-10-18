import {Routes} from '@angular/router';





import { blncesheetEditComponent } from './blncesheetEdit/blncesheetEdit.component';

import { blncesheetSaveComponent } from './blncesheetSave/blncesheetSave.component';

import { blncesheetViewComponent } from './blncesheetView/blncesheetView.component';

export const blncesheetRoutes: Routes = [



  {
    path: '',


    children: [
      {
        path: 'BalanceSheet',

        component: blncesheetSaveComponent,
        data: {
          breadcrumb: 'Balance Sheet'
        }

      } , {
        path: 'blncesheetEdit',

        component: blncesheetEditComponent,

      }, {
        path: 'blncesheetView',

        component: blncesheetViewComponent,

      }


    ]
  }
];


