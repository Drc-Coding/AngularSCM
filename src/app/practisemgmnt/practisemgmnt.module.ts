import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PractisemgmntComponent } from './practisemgmnt.component';
import { PractisemgmntRouting } from './practisemgmnt.routing';
import { PractiseComponent } from './practise/practise.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PrescriptionapprovalComponent } from './prescriptionapproval/prescriptionapproval.component';
import { PrescriptionapproverComponent } from './prescriptionapprover/prescriptionapprover.component';
import { ViewpresdigitalComponent } from './viewpresdigital/viewpresdigital.component';
import {CategoryPipe} from  './viewpresdigital/viewpresdigital.component.pipe';


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(PractisemgmntRouting),
      SharedModule
    ],
    declarations: [PractisemgmntComponent, PractiseComponent, PrescriptionComponent, CategoryPipe, PrescriptionapprovalComponent, PrescriptionapproverComponent, ViewpresdigitalComponent],
     
  })
export class PractiseassignModule {

}