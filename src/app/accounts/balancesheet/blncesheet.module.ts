import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';




import {SharedModule} from '../../shared/shared.module';
import { blncesheetRoutes } from './blncesheet.routing';



import { blncesheetEditComponent } from './blncesheetEdit/blncesheetEdit.component';

import { blncesheetSaveComponent } from './blncesheetSave/blncesheetSave.component';

import { blncesheetViewComponent } from './blncesheetView/blncesheetView.component';



import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule, DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule ,
    RouterModule.forChild(blncesheetRoutes ),
    SharedModule
  ],
  declarations: [blncesheetSaveComponent  ,  blncesheetEditComponent ,blncesheetViewComponent   ]
})

export class blncesheetModule {}
