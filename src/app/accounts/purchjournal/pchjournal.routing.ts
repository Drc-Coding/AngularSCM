import {Routes} from '@angular/router';





import { purjrnlSaveComponent } from './purjrnlSave/purjrnlSave.component';


import { purjrnlEditComponent } from './purjrnlEdit/purjrnlEdit.component';


import { purjrnlViewComponent } from './purjrnlView/purjrnlView.component';


export const pchjournalRoutes: Routes = [

  {path: 'PurchaseJournalEdit/:id', component: purjrnlEditComponent  ,

  data: {
    breadcrumb: 'PurchaseJournal'
  }},

  {
    path: '',


    children: [
      {
        path: 'PurchaseJournalSave',

        component: purjrnlSaveComponent,
        data: {
          breadcrumb: 'PurchaseJournal'
        }

      }  , {
        path: 'PurchaseJournalEdit',

        component: purjrnlEditComponent,
        data: {
          breadcrumb: 'PurchaseJournal'
        }

      }  , {
        path: 'ViewPurchaseJournal',

        component: purjrnlViewComponent,
        data: {
          breadcrumb: 'PurchaseJournal Maintenence'
        }

      }




    ]
  }
];


