import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { flowstmtRoutes } from './flowstmt.routing';


import { flowstmtSaveComponent } from './flowstmtSave/flowstmtSave.component';

import { flowstmtEditComponent } from './flowstmtEdit/flowstmtEdit.component';

import { flowstmtViewComponent } from './flowstmtView/flowstmtView.component';





import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule ,
    RouterModule.forChild(flowstmtRoutes),
    SharedModule
  ],
  declarations: [flowstmtSaveComponent   ,flowstmtEditComponent  ,flowstmtViewComponent ]
})

export class flowstmtModule {}
