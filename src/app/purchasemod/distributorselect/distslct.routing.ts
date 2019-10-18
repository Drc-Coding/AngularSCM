import {Routes} from '@angular/router';




import { distslctSaveComponent } from './distslctSave/distslctSave.component'  ;

import { distslctEditComponent } from './distslctEdit/distslctEdit.component'  ;

import { distslctViewComponent } from './distslctView/distslctView.component'  ;


import { distslctStatusComponent } from './distslctStatus/distslctStatus.component'  ;


export const distslctRoutes: Routes = [

{path: 'distslctEdit/:id', component:distslctEditComponent  ,
data: {
  breadcrumb: 'Distributor Select'
}},

  {
    path: '',


    children: [
       {
        path: 'DistributorSelection',

        component: distslctSaveComponent,
        data: {
          breadcrumb: 'Distributor Selection'
        }

      } ,  {
        path: 'distslctEdit',

        component: distslctEditComponent,
        data: {
          breadcrumb: 'Distributor Select'
        }

      } ,  {
        path: 'ViewDistributorSelect',

        component: distslctViewComponent ,
        data: {
          breadcrumb: 'Distributor Select '
        }

      },  {
        path: 'distslctStatus',

        component: distslctStatusComponent ,
        data: {
          breadcrumb: 'Distributor Select Status'
        }

      }



    ]
  }
];


