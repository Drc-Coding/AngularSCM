import {Routes} from '@angular/router';




import { daybookSaveComponent } from './daybookSave/daybookSave.component'  ;

import { daybookeditComponent } from './daybookedit/daybookedit.component'  ;

import { daybookViewComponent } from './daybookView/daybookView.component'  ;


export const daybookRoutes: Routes = [



  {
    path: '',


    children: [
      {
        path: 'DayBook',

        component: daybookSaveComponent,
        data: {
          breadcrumb: 'DayBook '
        }
      } , {
        path: 'daybookedit',

        component: daybookeditComponent,

      }, {
        path: 'daybookView',

        component: daybookViewComponent,

      }


    ]
  }
];


