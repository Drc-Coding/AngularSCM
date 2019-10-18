import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AppointmentRoutes } from './Appointment.routing';
import { AppointmentComponent } from './Appointment.component';
import { addAppointmentComponent } from './addAppointment/addAppointment.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { AppointmentService } from './Appointment.services';
import { manageAppointmentComponent } from './manageAppointment/manageAppointment.component';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AppointmentRoutes),
    SharedModule,
    DxDataGridModule,
    DxButtonModule
  ],
  declarations: [AppointmentComponent, addAppointmentComponent, manageAppointmentComponent],
  providers: [AppointmentService, NotificationsComponent]
})

export class AppointmentModule { }