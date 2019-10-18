import {Routes} from '@angular/router';




import { prodmapSaveComponent } from './prodmapSave/prodmapSave.component';

import { prodmapEditComponent } from './prodmapEdit/prodmapEdit.component';


import { prodmapViewComponent } from './prodmapView/prodmapView.component';


export const prodmapRoutes: Routes = [

  {path: 'prodmapEdit/:id', component: prodmapEditComponent},

  {
    path: '',


    children: [
      {
        path: 'prodmapSave',

        component: prodmapSaveComponent,

      } ,    {
        path: 'prodmapEdit',

        component: prodmapEditComponent,

      },    {
        path: 'prodmapView',

        component: prodmapViewComponent,

      }


    ]
  }
];


