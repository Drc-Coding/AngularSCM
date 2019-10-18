import { Routes } from '@angular/router';
import { purchaseApprovalComponent } from './purchaseApproval.component';
import { addpurchaseApprovalComponent } from './addpurchaseApproval/addpurchaseApproval.component';
export const purcsessionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'PurchaseApproval',
        component: addpurchaseApprovalComponent,
        data: {
          breadcrumb: 'Purchase Approval'
        }
      }
    ]
  }];
