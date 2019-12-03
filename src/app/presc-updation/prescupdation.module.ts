import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AddprescUpdationComponent } from '../presc-updation/addpresc-updation/addpresc-updation.component';
import { PrescUpdationRouting } from './prescupdation.routing';
import { ViewprescriptionComponent } from '../presc-updation/viewprescription/viewprescription.component';


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(PrescUpdationRouting),
      SharedModule
    ],
    declarations: [AddprescUpdationComponent, ViewprescriptionComponent],
     
  })
export class  PrescriptionUpdationModule {

}