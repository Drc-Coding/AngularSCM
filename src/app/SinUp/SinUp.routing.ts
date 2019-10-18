import { Routes } from '@angular/router';
import { sinupComponent } from './SinUp.component';
import { AddsinupComponent } from './addSinUp/addSinUp.component';
export const sinUpRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'addsinup',
        component: AddsinupComponent,
        //loadChildren: './SinUp/SinUp.module#SinupModule',
        data: {
          breadcrumb: 'Sin Up'
        }
      }]
  }];
