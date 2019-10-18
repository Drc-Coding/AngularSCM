import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {indentStatusRoutes} from './indentStatus.routing';
import {indentStatusComponent} from './indentStatus.component';
import {indentStatusViewComponent} from'./indentView/indentStatus.component';
import {CategoryPipe}from '../indentStatus/indentView/indentStatus-list.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(indentStatusRoutes),
    SharedModule
  ],
  declarations: [indentStatusComponent,CategoryPipe,indentStatusViewComponent]
})

export class indentStatus {}
