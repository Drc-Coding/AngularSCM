import { SharedModule } from '../shared/shared.module';
import { DoctorComponent } from './doctor.component';
import { DoctorRoutes } from './doctor.routing';
import { DoctorService } from './doctor.service';
import { editDoctorComponent } from './editDoctor/editDoctor.component';
import { DoctorlistComponent } from './viewDoctor/viewDoctor.component';
import { DoctorregistrationComponent } from './addDoctor/addDoctor.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CategoryPipe} from './viewDoctor/viewDoctor.pipe'
@NgModule({
  imports: [  
    CommonModule, 
    RouterModule.forChild(DoctorRoutes),
    SharedModule
  ],
  declarations: [DoctorComponent, DoctorregistrationComponent, DoctorlistComponent, editDoctorComponent,CategoryPipe],
  providers: [DoctorService]
})
export class DoctorModule { }