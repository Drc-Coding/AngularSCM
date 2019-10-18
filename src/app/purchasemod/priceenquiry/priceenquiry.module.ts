import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { priceenquiryRoutes } from './priceenquiry.routing';


import { prcenquirySaveComponent } from './prcenquirySave/prcenquirySave.component';

import { prcenquiryEditComponent } from './prcenquiryEdit/prcenquiryEdit.component'  ;

import { prcenquiryViewComponent } from './prcenquiryView/prcenquiryView.component';


import { priceUpdateComponent } from './priceUpdate/priceUpdate.component';
import { CategoryPipe } from './priceUpdate/priceUpdate.pipe';

import { prcenquiryViewPipe } from './prcenquiryView/prcenquiryView.pipe';



import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule, DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule,
    RouterModule.forChild(priceenquiryRoutes),
   SharedModule
  ],
  declarations: [   prcenquirySaveComponent ,  prcenquiryEditComponent,prcenquiryViewComponent  , priceUpdateComponent  , CategoryPipe]
})

export class priceenquiryModule {}
