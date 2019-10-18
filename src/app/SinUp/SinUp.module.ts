import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { sinUpRoutes } from './SinUp.routing';
import { sinupComponent } from './SinUp.component';
import { AddsinupComponent } from './addSinUp/addSinUp.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(sinUpRoutes),
    SharedModule,
  ],
  declarations: [sinupComponent, AddsinupComponent]
})
  
export class SinupModule { }