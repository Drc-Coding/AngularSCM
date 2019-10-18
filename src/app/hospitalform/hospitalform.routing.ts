import { CreateHospitalComponent } from './create-hospital/create-hospital.component';
import { editHospitalComponent } from './edit-hospital/edit-hospital.component';
import { viewHospitalComponent } from './viewHospital/viewHospital.component';
import { Routes } from '@angular/router';
export const HospitalformRoutes: Routes = [
    {
        path: 'editHospitaldetails/:id',
        component: editHospitalComponent,
        data: {
            breadcrumb: 'Edit Hospital Information',                   
        }
    }, 
    {       
        path: '',
        data: { 
            breadcrumb: 'hospital Information',
            status: false
        },
        children: [
            {
                path: 'HospitalRegistration',
                component: CreateHospitalComponent,
                data: {
                    breadcrumb: 'Hospital Registration',                   
                }
            }, {
                path: 'ViewHospitalRegistration',
                component: viewHospitalComponent,
                data: {
                    breadcrumb: 'View Hospital Information',                
                }
            },             
        ]
  } 
  ]
