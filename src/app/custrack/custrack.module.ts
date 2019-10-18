import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustrackComponent } from './custrack.component';
import { CustrackRoutes } from './custrack.routing';
import { CustrackingComponent } from './custracking/custracking.component';
import { LivetrackComponent } from './livetrack/livetrack.component';

@NgModule({
    imports: [  
      CommonModule, 
      RouterModule.forChild(CustrackRoutes),
      SharedModule
    ],
    declarations: [CustrackComponent,CustrackingComponent, LivetrackComponent],
  
  })
  
  export class CustrackModule { }