import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { stockreceiveRoutes } from './stockreceive.routing';


import { stkreceiveSaveComponent } from './stkreceiveSave/stkreceiveSave.component';

import { stkreceiveEditComponent } from   './stkreceiveEdit/stkreceiveEdit.component'  ;
import { stkreceiveViewComponent } from './stkreceiveView/stkreceiveView.component';
    import { CategoryPipe } from   './stkreceiveView/stkreceiveView.pipe'; 

import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';



@NgModule({
  imports: [
    CommonModule,

    
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,
    RouterModule.forChild(stockreceiveRoutes),
   SharedModule
  ],
  declarations: [  stkreceiveSaveComponent , stkreceiveEditComponent, stkreceiveViewComponent, CategoryPipe ]
})

export class stockreceiveModule {}
