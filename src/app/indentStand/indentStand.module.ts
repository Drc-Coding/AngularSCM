import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {indentStandRouting} from './indentStand.routing';
import {indentStandComponent} from './indentStand.component';
import {indentStandViewComponent} from'./indentStand/indentStandView.component';
import {CategoryPipe}from '../indentStand/indentStand/indentStandView-list.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(indentStandRouting),
    SharedModule
  ],
  declarations: [indentStandComponent,CategoryPipe,indentStandViewComponent]
})

export class standlone{}
