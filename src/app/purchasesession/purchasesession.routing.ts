import { Routes } from '@angular/router';
import { purcsessionComponent } from './purchasesession.component';
import { addInvocesessionComponent } from './addPurchasesession/addPurchasesession.component';
import { viewInvoicesessionComponent } from './viewPurchasesession/viewPurchasesession.component';
import { editInvoicesessionComponent } from './editPurchasesession/editPurchasesession.component';
import { viewSessionAll } from './viewSessionAll/viewSessionAll.component';
export const purcsessionRoutes: Routes = [
  {
    path: 'editPurchasesession/:id',
    component: editInvoicesessionComponent,
    data: {
      breadcrumb: 'Purchase Session'
    }
  },
  {
    path: 'viewPurcSession', component: viewInvoicesessionComponent
  },
  {
    path: '',
    children: [
      {
        path: 'PurchaseSession',
        component: addInvocesessionComponent,
        data: {
          breadcrumb: 'Purchase Session'
        }
      }, {
        path: 'viewPurchasesession',
        component: viewInvoicesessionComponent,
        data: {
          breadcrumb: 'View Session'
        }
      }, {
        path: 'ViewPurchaseSession',
        component: viewSessionAll,
        data: {
          breadcrumb: 'View Purchase Session '
        }
      }
    ]
  }];
