import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';






import { ledgerSaveComponent } from './ledgerSave/ledgerSave.component';

 import {SharedModule} from '../../shared/shared.module';
import { ledgerRoutes } from './ledger.routing';


import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';


@NgModule({
  imports: [
    CommonModule,DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule ,
    RouterModule.forChild(ledgerRoutes),
    SharedModule
   
  ],
  declarations: [ ledgerSaveComponent]
})

export class ledgerModule {}
