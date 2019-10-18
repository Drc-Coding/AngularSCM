import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PatientAlertRoutes } from './PatientAlert.routing';
import { PatientAlertComponent } from './PatientAlert.component';
import { addPatientAlertComponent } from './addPatientAlert/addPatientAlert.component';
import { viewPatientAlertComponent } from './viewPatientAlert/viewPatientAlert.component';
import { CategoryPipe } from './viewPatientAlert/viewPatientAlert-list.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientAlertRoutes),
    SharedModule
  ],
  declarations: [PatientAlertComponent, addPatientAlertComponent, viewPatientAlertComponent, CategoryPipe]
})

export class PatientAlertmodule { }
