import {Routes} from '@angular/router';

import { DistributorComponent } from './distributorSave/distributor.component';

import {DistributorEditComponent } from './distributorEdit/distributorEdit.component';

import {DistributorViewComponent }  from './distributorView/distributorView.component';



export const distributorRoutes: Routes = [

  {path: 'distributorEdit/:id', component: DistributorEditComponent ,
  data: {
    breadcrumb: 'Edit Distributor Details'
  }},

  {
    path: '',


    children: [
   {
        path: 'AddDistributor',

        component: DistributorComponent ,
        data: {
          breadcrumb: 'Add Distributor'
        }

      }, {
        path: 'distributorEdit',

        component: DistributorEditComponent,
        data: {
          breadcrumb: 'Edit Distributor Details'
        }

      }

      , {
        path: 'ViewDistributor',

        component: DistributorViewComponent,
        data: {
          breadcrumb: 'Distributor Maintenance'
        }

      }


    ]
  }
];


