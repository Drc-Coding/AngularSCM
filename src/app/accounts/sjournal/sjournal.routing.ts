import {Routes} from '@angular/router';





import { sjournalEditComponent } from './sjournalEdit/sjournalEdit.component';

import { sjournalSaveComponent } from './sjournalSave/sjournalSave.component';

import { sjournalViewComponent } from './sjournalView/sjournalView.component';


export const sjournalRoutes: Routes = [


  {path: 'SalesJournalEdit/:id', component: sjournalEditComponent  ,

  data: {
    breadcrumb: 'SalesJournal'
  }},
  {
    path: '',


    children: [
        {
        path: 'SalesJournalsave',

        component: sjournalSaveComponent,
        data: {
          breadcrumb: 'SalesJournal'
        }

      }  ,  {
        path: 'SalesJournalEdit',

        component: sjournalEditComponent,
        data: {
          breadcrumb: 'SalesJournal'
        }

      }  ,    {
        path: 'ViewSalesJournal',

        component: sjournalViewComponent,
        data: {
          breadcrumb: 'SalesJournal'
        }

      }




    ]
  }
];


