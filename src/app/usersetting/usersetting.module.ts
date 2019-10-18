 import { SharedModule } from '../shared/shared.module';
import { AddmodulesComponent } from './addmodules/addmodules.component';
import { DataModules } from './modules.service';
import { UsersettingComponent } from './usersetting.component';
import { AddmodulesRoutes } from './usersetting.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleviewComponent } from './moduleview/moduleview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AddmodulesRoutes),
    SharedModule
  ],
  declarations: [AddmodulesComponent, UsersettingComponent, ModuleviewComponent],
  providers: [DataModules]
})
export class AddModules { }
