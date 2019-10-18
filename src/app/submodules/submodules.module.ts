import { SharedModule } from '../shared/shared.module';
import { AddsubmodulesComponent } from './addsubmodules/addsubmodules.component';
import { AddsubmodulesRoutes } from './submodules.routing';
import { DataSubmodules } from './submodules.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewsubmoduleComponent } from './viewsubmodule/viewsubmodule.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AddsubmodulesRoutes),
    SharedModule
  ],
  declarations: [AddsubmodulesComponent, ViewsubmoduleComponent],
   providers: [DataSubmodules]
})
export class Submodulesserv { }
