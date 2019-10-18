import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { appointmentRoutes } from './appointment.routing';
import { PatientEditComponent } from './companySave/patientEdit.component';


import { apptSaveComponent } from './apptSave/apptSave.component'  ;

import { apptEditComponent } from './apptEdit/apptEdit.component'   ;


import { apptViewComponent } from './apptView/apptView.component'  ;




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appointmentRoutes),
   SharedModule
  ],
  declarations: [PatientEditComponent  ,apptSaveComponent  ,  apptEditComponent  ,  apptViewComponent]
})

export class appointmentModule {}
