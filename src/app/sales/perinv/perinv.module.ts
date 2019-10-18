import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';







import {SharedModule} from '../../shared/shared.module';
import { perinvRoutes } from './perinv.routing';


import { perinvSaveComponent } from './perinvSave/perinvSave.component' ;

import { perinvEditComponent } from './perinvEdit/perinvEdit.component'  ;


import { perinvViewComponent } from './perinvView/perinvView.component'  ;


import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';



@NgModule({
  imports: [
    CommonModule,

    
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    
    RouterModule.forChild(perinvRoutes),
   SharedModule
  ],
  declarations: [ perinvSaveComponent  ,  perinvEditComponent , perinvViewComponent]
})

export class perinvModule {}
