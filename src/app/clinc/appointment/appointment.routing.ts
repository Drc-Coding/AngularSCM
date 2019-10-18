import {Routes} from '@angular/router';




import { PatientEditComponent } from './companySave/patientEdit.component';



import { apptSaveComponent } from './apptSave/apptSave.component'  ;

import { apptEditComponent } from './apptEdit/apptEdit.component'   ;


import { apptViewComponent } from './apptView/apptView.component'  ;




export const appointmentRoutes: Routes = [



  {
    path: '',


    children: [
      {
        path: 'companysave',

        component: PatientEditComponent,

      }   ,    {
        path: 'apptSave',

        component: apptSaveComponent,

      }   ,     {
        path: 'apptEdit',

        component: apptEditComponent,

      }   ,     {
        path: 'apptView',

        component: apptViewComponent,

      }





    ]
  }
];


