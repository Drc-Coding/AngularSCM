import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { challanRoutes } from './deliveryChallan.routing';
import { challanSaveComponent } from './chalanSave/challanSave.component'; 
import { challanEditComponent } from './challanEdit/challanEdit.component';
import { challanViewComponent } from './challanView/challanView.component';


import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,

    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    
    RouterModule.forChild(challanRoutes),
   SharedModule
  ],
  declarations: [ challanSaveComponent  , challanEditComponent   ,  challanViewComponent ],
  

  bootstrap: [challanSaveComponent]
})

export class deliveryChallanModule {}
