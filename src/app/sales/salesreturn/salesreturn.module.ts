import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { salesreturnRoutes } from './salesreturn.routing';


import { slsRetSaveComponent } from './slsRetSave/slsRetSave.component'  ;

import { slsRetEditComponent } from './slsRetEdit/slsRetEdit.component'  ;

import { slsRetViewComponent } from './slsRetView/slsRetView.component'  ;

    import { CategoryPipe } from   './slsRetView/slsRetView.pipe'; 
import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule  ,
    RouterModule.forChild(salesreturnRoutes),
   SharedModule
  ],
  declarations: [slsRetSaveComponent,slsRetEditComponent,slsRetViewComponent ]
})

export class salesreturnModule {}
