import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BarcodeRoutes } from "./barcode.routing";
import { SharedModule } from "app/shared/shared.module";

import { AddBarcodeComponent } from "./addBarcode/addbarcode.component";
import { BarcodeService } from "./barcode.service";
import { ViewListBarcode } from "./viewBarcode/barcodelist.component";
import { CategoryPipe } from "./viewBarcode/barcode-list.pipe";
@NgModule({
    imports: [
      CommonModule, 
      RouterModule.forChild(BarcodeRoutes),
      SharedModule
       
    ],
    declarations: [ AddBarcodeComponent, ViewListBarcode,CategoryPipe],
    providers: [BarcodeService]
  })
  export class BarcodeModule { } 