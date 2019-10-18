import {Routes} from '@angular/router';







import { indentreqSaveComponent } from './indentreqSave/indentreqSave.component'; 

import { indentreqEditComponent } from './indentreqEdit/indentreqEdit.component';

import { indentreqViewComponent } from './indentreqView/indentreqView.component';


export const indentreqRoutes: Routes = [


  {path: 'indentreqEdit/:id', component: indentreqEditComponent ,
  data: {
    breadcrumb: 'Requisition Form'
  }},

  {
    path: '',


    children: [
     
      {
        path: 'RequisitionForm',

        component: indentreqSaveComponent,
        data: {
          breadcrumb: 'Requisition Form'
        }

      },
      {
        path: 'indentreqEdit',

        component: indentreqEditComponent,
        data: {
          breadcrumb: 'Requisition Form'
        }

      },   {
        path: 'ViewRequisitionForm',

        component: indentreqViewComponent,
        data: {
          breadcrumb: 'Requisition  Maintenance'
        }

      }


    ]
  }
];


