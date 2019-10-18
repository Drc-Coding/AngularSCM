import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { salesGatePassRoutes } from './salesGatePass.routing';
import { salesGatePassSaveComponent } from './salesGatePassSave/salesGatePassSave.component'; 
import { salesGatePassEditComponent } from './salesGatePassEdit/salesGatePassEdit.component';
import { salesGatePassViewComponent } from './salesGatePassView/salesGatePassView.component';
import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';
import { SharedModule } from 'app/shared/shared.module';
import {CategoryPipe}from './salesGatePassView/salesGatePassView.pipe';

@NgModule({
  imports: [
    CommonModule,

    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    
    RouterModule.forChild(salesGatePassRoutes),
   SharedModule
  ],
  declarations: [ salesGatePassSaveComponent  , salesGatePassEditComponent   ,CategoryPipe,  salesGatePassViewComponent ],
  

  bootstrap: [salesGatePassSaveComponent]
})

export class salesGatePassModule {}
