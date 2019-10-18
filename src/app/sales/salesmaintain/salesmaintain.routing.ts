import {Routes} from '@angular/router';

import { slsMaintViewComponent } from './slsMaintView/slsMaintView.component';


export const salesmaintainRoutes: Routes = [



  {
    path: '',


    children: [
      {
        path: 'slsMaintView',

        component: slsMaintViewComponent,
        data: {
          breadcrumb: 'SlsMaint View '
        }
      }


    ]
  }
];


