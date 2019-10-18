import {Routes} from '@angular/router';


import { saveDistProdComponent } from './saveDistProd/saveDistProd.component';
import { editDistProdComponent } from './editDistProd/editDistProd.component';
import { viewDistProdComponent } from './viewDistProd/viewDistProd.component';


import { viewDistWiseProdComponent } from './viewDistWiseProd/viewDistWiseProd.component';

export const distprodRoutes: Routes = [

{path: 'editDistProd/:id', component: editDistProdComponent   ,
data: {
  breadcrumb: 'DistributorWise Product'
}
 },

  {
    path: '',


    children: [
    {
        path: 'AddDistributorwiseProduct',

        component: saveDistProdComponent,
        data: {
          breadcrumb: 'Distributor Wise Product'
        }

      }, {
        path: 'editDistProd',

        component: editDistProdComponent,
        data: {
          breadcrumb: 'Distributor Wise Product'
        }

      },
      
      
  /*    {
        path: 'viewDistProd',

        component: viewDistProdComponent  ,
        data: {
          breadcrumb: 'DistributorWise Product Maintenance'
        }

      }   */
      
      
      
       {
        path: 'ViewDistributorwiseProduct',

        component: viewDistWiseProdComponent  ,
        data: {
          breadcrumb: 'Distributor Wise Product'
        }

      }  





      

    ]
  }
];


