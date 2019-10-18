import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



import {SharedModule} from '../../shared/shared.module';
import { daybookRoutes } from './daybook.routing';



import { daybookSaveComponent } from './daybookSave/daybookSave.component'  ;

import { daybookeditComponent } from './daybookedit/daybookedit.component'  ;

import { daybookViewComponent } from './daybookView/daybookView.component'  ;

import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule, 
    RouterModule.forChild(daybookRoutes),
    SharedModule
  ],
  declarations: [daybookSaveComponent ,daybookeditComponent,daybookViewComponent,]
})

export class daybookModule {}
