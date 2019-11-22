import { Routes } from "@angular/router";
import { SalesorderleadComponent } from "./salesorderlead.component";
import { SoleadrecordComponent } from "./soleadrecord/soleadrecord.component";
import { ConvertsalesComponent } from "./convertsales/convertsales.component";

export const SalesorderleadRoutes: Routes = [
    {
        path: 'salesorderlead',
        component: SalesorderleadComponent,
        data:
          {
            breadcrumb: 'Lead SalesOrder'
          }
      },
      {
        path: '',
        children:[{

          path:'soleadrecord/:id',
          component: SoleadrecordComponent,
          data: {
            breadcrumb: 'Lead SalesOrder Records'
          }
        }]

       },
       {
        path: '',
        children:[{

          path:'covertsalesorder/:id',
          component: ConvertsalesComponent,
          data: {
            breadcrumb: 'Convert SalesOrder'
          }
        }]

       } ]