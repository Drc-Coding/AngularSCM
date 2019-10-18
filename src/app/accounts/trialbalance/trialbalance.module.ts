import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';




import {SharedModule} from '../../shared/shared.module';
import { trialbalanceRoutes } from './trialbalance.routing';



import { trialbalanceSaveComponent } from './trialbalanceSave/trialbalanceSave.component';

import { balanceAdjViewComponent } from './balanceAdjView/balanceAdjView.component';
import { balanceAdjComponent } from './balanceAdj/balanceAdj.component';

import { trialbalanceViewComponent } from './trialbalanceView/trialbalanceView.component';




import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule ,
    RouterModule.forChild(trialbalanceRoutes),
    SharedModule
  ],
  declarations: [trialbalanceSaveComponent, balanceAdjViewComponent ,balanceAdjComponent ,trialbalanceViewComponent]
})

export class trialbalanceModule {}
