import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { stockreturnRoutes } from './stockreturn.routing';


import { stkretSaveComponent } from   './stkretSave/stkretSave.component';


import { stkretEditComponent } from   './stkretEdit/stkretEdit.component'  ;
import { stkretViewComponent } from   './stkretView/stkretView.component';

    import { CategoryPipe } from   './stkretView/stkretView.pipe'; 

import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';


@NgModule({
  imports: [
    CommonModule,

    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,


    
    RouterModule.forChild(stockreturnRoutes),
   SharedModule
  ],
  declarations: [ stkretSaveComponent ,  stkretEditComponent, stkretViewComponent  ]
})

export class stockreturnModule {}
