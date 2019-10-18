import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {theraRoutes} from './thera.routing';
import {TheraComponent} from './thera.component';
import {addTherapeuticComponent} from './addTherapeutic/addTherapeutic.component';
import {editTherapeuticComponent} from'./editTherapeutic/editTherapeutic.component';
import {viewTherapeuticComponent} from'./viewTherapeutic/viewTherapeutic.component';
import {CategoryPipe} from'./viewTherapeutic/Therapeutics-list.pipe';
@NgModule({
  imports: [ 
    CommonModule,
    RouterModule.forChild(theraRoutes),
    SharedModule    
  ],
  declarations: [TheraComponent,addTherapeuticComponent,editTherapeuticComponent,viewTherapeuticComponent]
})

export class theraModules {} 
