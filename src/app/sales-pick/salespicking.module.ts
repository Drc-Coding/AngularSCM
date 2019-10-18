import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SalesPickComponent } from './sales-pick.component';
import { SalesPickingRouting } from './SalesPicking.routing';
import { SavepickComponent } from './savepick/savepick.component';
import { ViewpickingComponent } from './viewpicking/viewpicking.component';
import { SharedModule } from 'app/shared/shared.module';
import { PickedcheckingComponent } from './pickedchecking/pickedchecking.component';
import { PickapprovalComponent } from './pickapproval/pickapproval.component';
import { CategoryPipe } from './viewpicking/viewpicking.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SalesPickingRouting), SharedModule

  ],
  declarations: [SalesPickComponent, SavepickComponent, ViewpickingComponent, PickedcheckingComponent, PickapprovalComponent, CategoryPipe],

})

export class salespickingModule {

}