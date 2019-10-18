import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { purchaseReturnRoutes } from './purchaseReturn.routing';
import { savePRComponent } from './savepurchaseReturn/savePR.component';
import { editPRComponent } from './editPurchaseReturn/editPR.component';
import { viewPRComponent } from './viewPurchaseReturn/viewPR.component';
import { CategoryPipe } from './viewPurchaseReturn/viewPR.pipe';
import {
  DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule
} from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,
    RouterModule.forChild(purchaseReturnRoutes),
    SharedModule
  ],
  declarations: [savePRComponent, editPRComponent, viewPRComponent, CategoryPipe]
})
export class purchaseReturnModule { }
