import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { prodmapRoutes } from './prodmap.routing';

import { prodmapSaveComponent } from './prodmapSave/prodmapSave.component';

import { prodmapEditComponent } from './prodmapEdit/prodmapEdit.component';


import { prodmapViewComponent } from './prodmapView/prodmapView.component';


import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule ,
    RouterModule.forChild(prodmapRoutes),
   SharedModule
  ],
  declarations: [prodmapSaveComponent  ,prodmapEditComponent, prodmapViewComponent]
})

export class prodmapModule {}
