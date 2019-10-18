import {Routes} from '@angular/router';




import { prescSaveComponent } from './prescSave/prescSave.component' ;


import { prescEditComponent } from './prescEdit/prescEdit.component'   ;



import { prescViewComponent } from './prescView/prescView.component'   ;

export const priscmgmtRoutes: Routes = [

{path: 'prescEdit/:id', component: prescEditComponent},

  {
    path: '',


    children: [
      {
        path: 'prescSave',

        component: prescSaveComponent,

      }  ,     {
        path: 'prescEdit',

        component: prescEditComponent,

      },     {
        path: 'prescView',

        component: prescViewComponent,

      }


    ]
  }
];


