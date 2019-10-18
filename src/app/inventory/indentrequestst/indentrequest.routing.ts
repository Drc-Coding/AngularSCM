import {Routes} from '@angular/router';







import { indentreqSaveComponent } from './indentreqSave/indentreqSave.component'; 

import { indentreqEditComponent } from './indentreqEdit/indentreqEdit.component';

import { indentreqViewComponent } from './indentreqView/indentreqView.component';


export const indentreqRoutes: Routes = [


  {path: 'indentreqEdit/:id', component: indentreqEditComponent ,
  data: {
    breadcrumb: 'Requisition Request'
  }},

  {
    path: '',


    children: [
     
      {
        path: 'RequisitionRequest',

        component: indentreqSaveComponent,
        data: {
          breadcrumb: 'Requisition Request'
        }

      },
      {
        path: 'indentreqEdit',

        component: indentreqEditComponent,
        data: {
          breadcrumb: 'Requisition Request'
        }

      },   {
        path: 'ViewRequisitionRequest',

        component: indentreqViewComponent,
        data: {
          breadcrumb: 'Requisition Request Maintenance'
        }

      }


    ]
  }
];


