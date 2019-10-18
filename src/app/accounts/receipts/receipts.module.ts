import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';






import { receiptSaveComponent } from './receiptSave/receiptSave.component';

import { receiptEditComponent } from './receiptEdit/receiptEdit.component' ;

import { receiptViewComponent } from './receiptView/receiptView.component'  ;


import { saveBulkRtComponent } from './saveBulkRt/saveBulkRt.component'  ;

import {SharedModule} from '../../shared/shared.module';
import { receiptsRoutes } from './receipts.routing';


    import { CategoryPipe } from   './receiptView/receiptView.pipe'; 



import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';





@NgModule({
  imports: [
    CommonModule,

    
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,


    
    RouterModule.forChild(receiptsRoutes),
    SharedModule
  ],
  declarations: [   receiptSaveComponent  ,  receiptEditComponent  ,  receiptViewComponent , saveBulkRtComponent]
})

export class receiptsModule {}
