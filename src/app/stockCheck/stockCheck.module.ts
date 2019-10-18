import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {stockCheckRouting} from './stockCheck.routing';
import {stockCheckComponent} from './stockCheck.component';
import {stockViewComponent} from'./stockView/stockView.component';
import {CategoryPipe}from './stockView/stockView-list.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(stockCheckRouting),
    SharedModule
  ],
  declarations: [stockCheckComponent,CategoryPipe,stockViewComponent]
})

export class stockCheck{}
