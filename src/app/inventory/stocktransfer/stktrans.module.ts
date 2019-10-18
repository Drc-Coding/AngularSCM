import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { stktransRoutes } from './stktrans.routing';
import { stktransSaveComponent } from './stktransSave/stktransSave.component';
import { stktransEditComponent } from './stktransEdit/stktransEdit.component';
import { stktransViewComponent } from './stktransView/stktransView.component';
import { stktransMaintComponent } from './stktransMaint/stktransMaint.component';
import { CategoryPipe } from './stktransView/stktransView.pipe';
// import {
//   DxDataGridModule,
//   DxSparklineModule,
//   DxTemplateModule
// } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule, // DxDataGridModule,
    // DxSparklineModule,
    // DxTemplateModule,
    RouterModule.forChild(stktransRoutes),
    SharedModule
  ],
  declarations: [stktransSaveComponent, stktransEditComponent, stktransViewComponent, stktransMaintComponent, CategoryPipe]
})
export class stktransModule { }
