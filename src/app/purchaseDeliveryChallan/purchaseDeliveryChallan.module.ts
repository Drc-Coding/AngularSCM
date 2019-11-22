import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { purchaseChallanRoutes } from './purchaseDeliveryChallan.routing';
import { purchaseChallanSaveComponent } from './purchaseChallanSave/purchaseChallanSave.component'; 
import { purchaseChallanEditcomponent } from './purchaseChallanEdit/purchaseChallanEdit.component';
import { purchaseChallanViewComponent } from './purchaseChallanView/purchaseChallanView.component';
import {CategoryPipe}from './purchaseChallanView/purchaseChallanview.pipe';
import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,

    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    
    RouterModule.forChild(purchaseChallanRoutes),
   SharedModule
  ],
  declarations: [ purchaseChallanSaveComponent  , purchaseChallanEditcomponent  , CategoryPipe,   purchaseChallanViewComponent ],
  
  bootstrap: [purchaseChallanSaveComponent]
})

export class purchaseDeliveryChallanModule {}
