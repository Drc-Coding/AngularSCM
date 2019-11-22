import {Routes} from '@angular/router';






import { perinvSaveComponent } from './perinvSave/perinvSave.component' ;

import { perinvEditComponent } from './perinvEdit/perinvEdit.component'  ;


import { perinvViewComponent } from './perinvView/perinvView.component'  ;


export const perinvRoutes: Routes = [


 {path: 'perinvEdit/:id', component: perinvEditComponent ,
 data: {
  breadcrumb: 'Perfoma Invoice'
} },
  {
    path: '',


    children: [
         {
        path: 'perinvSave',

        component: perinvSaveComponent,
        data: {
          breadcrumb: 'Perfoma Invoice'
        }
      }   ,   {
        path: 'perinvEdit',

        component: perinvEditComponent,
        data: {
          breadcrumb: 'Perfoma Invoice'
        }
      }   ,   {
        path: 'perinvView',

        component: perinvViewComponent,
        data: {
          breadcrumb: 'Perfoma Invoice Maintenence'
        }
      }


    ]
  }
];


