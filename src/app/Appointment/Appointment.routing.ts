import { Routes } from '@angular/router';
import { AppointmentComponent } from './Appointment.component';
import { addAppointmentComponent } from './addAppointment/addAppointment.component';
import { manageAppointmentComponent } from './manageAppointment/manageAppointment.component';
export const AppointmentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'AddAppointment',
        component: addAppointmentComponent,
        data: {
          breadcrumb: 'Add Appointment'
        }
      },
      {
        path: 'ManageAppointment',
        component: manageAppointmentComponent,
        data: {
          breadcrumb: 'Manage Appointment'
        }
      }
    ]
  }];
