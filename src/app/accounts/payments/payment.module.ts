import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



import {savePaymentComponent} from './savePayment/savePayment.component';
import {editPaymentComponent} from './editPayment/editPayment.component';
import {viewPaymentComponent} from './viewPayment/viewPayment.component';


import {saveBulkPtComponent} from './saveBulkPt/saveBulkPt.component';

import {SharedModule} from '../../shared/shared.module';
import { paymentRoutes } from  './payment.routing';

import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

    import { CategoryPipe } from   './viewPayment/viewPayment.pipe'
@NgModule({
  imports: [
    CommonModule,

    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    
    RouterModule.forChild(paymentRoutes),
    SharedModule
   
  ],
  declarations: [ savePaymentComponent, editPaymentComponent,viewPaymentComponent  ,saveBulkPtComponent ]
})

export class paymentModule {}
