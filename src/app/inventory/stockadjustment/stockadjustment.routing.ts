import {Routes} from '@angular/router';






import { stkadjSaveComponent } from './stkadjSave/stkadjSave.component';


import { stkadjEditComponent } from './stkadjEdit/stkadjEdit.component';


import { stkadjViewComponent } from './stkadjView/stkadjView.component'  ;


export const stockadjustmentRoutes: Routes = [



  {path: 'stkadjEdit/:id', component: stkadjEditComponent  ,
  data: {
    breadcrumb: 'StockAdjustment'
  }},

  {
    path: '',


    children: [
    

        {
        path: 'StockAdjustment',

        component: stkadjSaveComponent,
        data: {
          breadcrumb: 'StockAdjustment'
        }

      }  ,
      {
      path: 'stkadjEdit',

      component: stkadjEditComponent,
      data: {
        breadcrumb: 'StockAdjustment'
      }

    } ,  {
      path: 'ViewStockAdjustment',

      component: stkadjViewComponent,
      data: {
        breadcrumb: 'StockAdjustment Maintenence'
      }

    }



    ]
  }
];


