import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {subTheraRoutes} from './subthera.routing';
import {SubTherapeuticComponent} from './subthera.component';
import {addSubTherapeuticComponent} from './addSubTherapeutic/addSubTherapeutic.component';
import {editSubTherapeuticComponent} from'./editSubTherapeutic/editSubTherapeutic.component';
import {ViewSubTherapeuticComponent} from'./viewSubTherapeutic/viewSubTherapeutic.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(subTheraRoutes),
    SharedModule
   
  ],
  declarations: [SubTherapeuticComponent,addSubTherapeuticComponent,editSubTherapeuticComponent,ViewSubTherapeuticComponent]
})

export class subtheraModule {}
