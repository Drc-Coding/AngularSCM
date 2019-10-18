import {Routes} from '@angular/router';



import { distupdationSaveComponent } from './distupdationSave/distupdationSave.component';



export const distupdationRoutes: Routes = [

{path: 'PriceUpdation/:id', component: distupdationSaveComponent ,   data: {
  breadcrumb: 'Price Updation'
}},

  {
    path: '',


    children: [
      {
        path: 'PriceUpdation',

        component: distupdationSaveComponent,

        data: {
          breadcrumb: 'Price Updation'
        }



      }


    ]
  }
];


