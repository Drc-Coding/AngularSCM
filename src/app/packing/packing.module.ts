import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { SavepackingComponent } from "./savepacking/savepacking.component";
import { PackingRoutes } from "./packing.routing";
import { PackingComponent } from "./packing.component";
import { ViewpackingComponent } from "./viewpacking/viewpacking.component";
import { CheckpackingComponent } from './checkpacking/checkpacking.component';
import { PackingapprovalComponent } from './packingapproval/packingapproval.component';
import {CategoryPipe}from './viewpacking/viewPacking.pipe';

@NgModule({
    imports: [
      CommonModule, 
      RouterModule.forChild(PackingRoutes),
      SharedModule
       
    ],
    declarations: [ SavepackingComponent, PackingComponent, ViewpackingComponent, CategoryPipe, CheckpackingComponent, PackingapprovalComponent],
    providers: []
  })
  export class PackingModule { } 