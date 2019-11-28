import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { gatePassRoutes } from './gatePass.routing';
import { gatePassSaveComponent } from './gatePassSave/gatePassSave.component'; 
import { gatePassEditComponent } from './gatePassEdit/gatePassEdit.component';
import { gatePassViewComponent } from './gatePassView/gatePassView.component';
import {CategoryPipe}from './gatePassView/gatePassView.pipe';
import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,

    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    
    RouterModule.forChild(gatePassRoutes),
   SharedModule
  ],
  declarations: [ gatePassSaveComponent  , gatePassEditComponent   ,  CategoryPipe  ,  gatePassViewComponent ],
  

  bootstrap: [gatePassSaveComponent]
})

export class gatePassModule {}
