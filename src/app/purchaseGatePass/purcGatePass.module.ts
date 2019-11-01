import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { purcGatePassRoutes } from './purcGatePass.routing';
import { purcGatePassSaveComponent } from './purcGatePassSave/purcGatePassSave.component'; 
import { purcGatePassEditComponent } from './purcGatePassEdit/purcGatePassEdit.component';
import { purcGatePassViewComponent } from './purcGatePassView/purcGatePassView.component';
import {CategoryPipe}from './purcGatePassView/purchaseGataPassView.pipe';
import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,

    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    
    RouterModule.forChild(purcGatePassRoutes),
   SharedModule
  ],
  declarations: [ purcGatePassSaveComponent  , purcGatePassEditComponent   , CategoryPipe ,  purcGatePassViewComponent ],
  

  bootstrap: [purcGatePassSaveComponent]
})

export class purcGatePassModule {}
