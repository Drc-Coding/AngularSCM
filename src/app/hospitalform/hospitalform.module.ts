import { SharedModule } from '../shared/shared.module';
import { CreateHospitalComponent } from './create-hospital/create-hospital.component';
import { DataHospitalform } from './data.service';
import { editHospitalComponent } from './edit-hospital/edit-hospital.component';
import { HospitalformRoutes } from './hospitalform.routing';
import { viewHospitalComponent } from './viewHospital/viewHospital.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'; 
import { RouterModule } from '@angular/router';
import { CategoryPipe } from './viewHospital/viewCompany.view.pipe';
@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(HospitalformRoutes),
    SharedModule
  ],
  declarations: [CreateHospitalComponent, editHospitalComponent, viewHospitalComponent,CategoryPipe],
   providers: [DataHospitalform]
})
export class HospitalformModule { }
