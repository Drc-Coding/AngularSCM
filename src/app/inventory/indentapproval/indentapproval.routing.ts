

import {Routes} from '@angular/router';


import { saveIndapprComponent } from './saveIndappr/saveIndappr.component';

import { viewIndapprComponent } from './viewIndappr/viewIndappr.component';


import { IndapprMaintComponent } from './IndapprMaint/IndapprMaint.component';


import { editIndapprComponent } from  './editIndappr/editIndappr.component';



export const indentapprovalRoutes: Routes = [


  {path: 'saveIndappr/:id/:id2/:id3', component: saveIndapprComponent ,
  data: {
    breadcrumb: 'Requisition Approval'
                            }}, 
   {path: 'EditIndentApproval/:id', component: editIndapprComponent ,
                            data: {
                              breadcrumb: 'Requisition Approval'
                                                      }},
  {
    path: '',


    children: [
    
       {
        path: 'RequisitionReceiving',

        component: saveIndapprComponent,

        data: {
          breadcrumb: 'Requisition Receiving'
        }

      },  {
        path: 'ViewRequisitionReceiving',

        component: viewIndapprComponent,
        data: {
          breadcrumb: 'Requisition Receiving Maintenance'
        }

      } /*,  {
        path: 'IndapprMaint',

        component: IndapprMaintComponent,
        data: {
          breadcrumb: 'IndentApproval Maintenance'
        }

      }, */, {
        path: 'EditIndentApproval',

        component: editIndapprComponent,
        data: {
          breadcrumb: 'Edit Requisition Receiving'
        }

      }


    ]
  }
];


