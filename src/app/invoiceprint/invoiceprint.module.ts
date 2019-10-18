import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { BasicComponent } from './basic/basic.component';

import { InvoiceprintComponent } from './invoiceprint.component';


import {InvoiceRoutes} from './invoiceprint.routing';
import {SharedModule} from "./../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InvoiceRoutes),
    SharedModule,
  
  
  ],
  declarations: [InvoiceprintComponent,BasicComponent]
})
export class InvoiceModule { }
