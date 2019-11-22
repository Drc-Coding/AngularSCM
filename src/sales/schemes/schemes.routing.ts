import {Routes} from '@angular/router';



import { schemesSaveComponent } from './schemesSave/schemesSave.component';

import { schemesEditComponent } from './schemesEdit/schemesEdit.component';

import { schemesViewComponent } from './schemesView/schemesView.component';


export const schemesRoutes: Routes = [

  {path: 'schemesEdit/:id', component: schemesEditComponent  },
  {
    path: '',


    children: [
      {
        path: 'schemesSave',

        component: schemesSaveComponent,

      } ,   {
        path: 'schemesEdit',

        component: schemesEditComponent,

      } ,   {
        path: 'schemesView',

        component: schemesViewComponent,

      } 


    ]
  }
];


