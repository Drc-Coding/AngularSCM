import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



import {SharedModule} from '../../shared/shared.module';
import { plstmtRoutes } from './plstmt.routing';


import { plstmtSaveComponent } from './plstmtSave/plstmtSave.component';


import { plstmtEditComponent } from './plstmtEdit/plstmtEdit.component';


import { plstmtViewComponent } from './plstmtView/plstmtView.component';




import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';


@NgModule({
  imports: [
    CommonModule, DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule ,
    RouterModule.forChild(plstmtRoutes),
    SharedModule
  ],
  declarations: [plstmtSaveComponent ,plstmtEditComponent ,plstmtViewComponent  ]
})

export class plstmtModule {}
