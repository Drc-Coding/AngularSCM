import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { stockadjustmentRoutes } from './stockadjustment.routing';


import { stkadjSaveComponent } from './stkadjSave/stkadjSave.component';

import { stkadjEditComponent } from './stkadjEdit/stkadjEdit.component';



import { stkadjViewComponent } from './stkadjView/stkadjView.component'  ;

    import { CategoryPipe } from   './stkadjView/stkadjView.pipe'; 
import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';




@NgModule({
  imports: [
    CommonModule,

        
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,


    RouterModule.forChild(stockadjustmentRoutes),
   SharedModule
  ],
  declarations: [   stkadjSaveComponent  ,  stkadjEditComponent ,stkadjViewComponent]
})

export class stockadjustmentModule {}
