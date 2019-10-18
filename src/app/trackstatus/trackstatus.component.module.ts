import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TrackstatusComponent } from './trackstatus.component';
import { TrackstatusRouting } from './trackstatus.component.routing';
import { TrackingComponent } from './tracking/tracking.component';
@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(TrackstatusRouting),
      SharedModule
    ],
    declarations: [TrackstatusComponent, TrackingComponent],
     
  })
  
export class TrackstatusModule {

}