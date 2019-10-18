import {Routes} from '@angular/router';

import { stkretSaveComponent } from   './stkretSave/stkretSave.component';

import { stkretEditComponent } from   './stkretEdit/stkretEdit.component'  ;

import { stkretViewComponent } from   './stkretView/stkretView.component';

export const stockreturnRoutes: Routes = [


  {path: 'stkretEdit/:id', component: stkretEditComponent  ,
  data: {
    breadcrumb: 'StockReturn'
  }},

  {
    path: '',

    children: [
    
      {
        path: 'StockReturn',

        component: stkretSaveComponent,
        data: {
          breadcrumb: 'Stock Return'
        }

      }  ,     {
        path: 'stkretEdit',

        component: stkretEditComponent,
        data: {
          breadcrumb: 'Edit Stock Return'
        }

      }  ,      {
        path: 'ViewStockReturn',

        component: stkretViewComponent,
        data: {
          breadcrumb: 'Stock Return Maintenance'
        }

      }


    ]
  }
];


