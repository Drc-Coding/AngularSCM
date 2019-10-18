import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, UrlSerializer } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { purcsessionRoutes } from './purchaseApproval.routing';
import { purchaseApprovalComponent } from './purchaseApproval.component';
import { addpurchaseApprovalComponent } from './addpurchaseApproval/addpurchaseApproval.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(purcsessionRoutes),
    SharedModule,
  ],
  declarations: [purchaseApprovalComponent, addpurchaseApprovalComponent]
})

export class purchaseApprovalModule { }