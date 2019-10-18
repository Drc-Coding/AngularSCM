import {Routes} from '@angular/router';




import { importSaveComponent } from './importSave/importSave.component'  ;

import { importEditComponent } from './importEdit/importEdit.component'  ;

import { importViewComponent } from './importView/importView.component'  ;


export const importRoutes: Routes = [



  {
    path: '',


    children: [
      {
        path: 'importSave',

        component: importSaveComponent,

      }  ,
      {
        path: 'importEdit',

        component: importEditComponent,

      } ,  {
        path: 'importView',

        component: importViewComponent,

      }


    ]
  }
];


