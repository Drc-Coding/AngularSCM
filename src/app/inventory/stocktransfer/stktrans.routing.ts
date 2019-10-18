import {Routes} from '@angular/router';





import { stktransSaveComponent } from './stktransSave/stktransSave.component'   ;


import { stktransEditComponent } from './stktransEdit/stktransEdit.component'  ;

import { stktransViewComponent } from './stktransView/stktransView.component'   ;


import { stktransMaintComponent } from './stktransMaint/stktransMaint.component'   ;



export const stktransRoutes: Routes = [


  {path: 'stktransEdit/:id', component: stktransEditComponent  ,
  data: {
    breadcrumb: 'Stock Transfer'
  }},  {path: 'StockTransfer/:id/:id2/:id3', component: stktransSaveComponent  ,
  data: {
    breadcrumb: 'Edit Stock Transfer'
  }},

  {
    path: '',


    children: [
    
      {
        path: 'StockTransfer',

        component: stktransSaveComponent,
        data: {
          breadcrumb: 'Stock Transfer'
        }

      },{
        path: 'stktransEdit',

        component: stktransEditComponent,
        data: {
          breadcrumb: 'Edit Stock Transfer'
        } 

      },

      {
        path: 'ViewStockTransfer',

        component: stktransViewComponent,
        data: {
          breadcrumb: 'Stock Transfer Maintenance'
        }

      }  ,
    /*   {
        path: 'stktransMaint',

        component: stktransMaintComponent,
        data: {
          breadcrumb: 'StockTransfer Maintenence' 
        }

      }  */


    ]
  }
];


