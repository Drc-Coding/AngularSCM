import {Routes} from '@angular/router';





import { stkreceiveSaveComponent } from './stkreceiveSave/stkreceiveSave.component';


import { stkreceiveEditComponent } from   './stkreceiveEdit/stkreceiveEdit.component'  ;


import { stkreceiveViewComponent } from './stkreceiveView/stkreceiveView.component';


export const stockreceiveRoutes: Routes = [


  {path: 'stkreceiveEdit/:id', component: stkreceiveEditComponent  ,

  data: {
    breadcrumb: 'Goods Received Note'
  }},

  {
    path: '',


    children: [
    
      {
        path: 'GoodsReceivedNote',

        component: stkreceiveSaveComponent,
        data: {
          breadcrumb: 'Goods Received Note'
        }

      } ,   {
        path: 'stkreceiveEdit',

        component: stkreceiveEditComponent,
        data: {
          breadcrumb: 'Goods Received Note'
        }

      } ,   {
        path: 'ViewGoodsReceivedNote',

        component: stkreceiveViewComponent  ,
        data: {
          breadcrumb: 'Goods Received Note Maintenance'
        }

      }


    ]
  }
];


