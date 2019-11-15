import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BarcodeRoutes } from "./barcode.routing";
import { SharedModule } from "app/shared/shared.module";

import { AddBarcodeComponent } from "./addBarcode/addbarcode.component";
import { BarcodeService } from "./barcode.service";
import { ViewListBarcode } from "./viewBarcode/barcodelist.component";
import { CategoryPipe } from "./viewBarcode/barcode-list.pipe";
//  import { BrowserModule } from "@angular/platform-browser"; 
import {NgxBarcodeModule} from 'ngx-barcode';   
import { from } from "rxjs/observable/from";

@NgModule({
    imports: [
      CommonModule, 
      RouterModule.forChild(BarcodeRoutes),
      SharedModule,
      NgxBarcodeModule
               
    ],
    declarations: [ AddBarcodeComponent, ViewListBarcode,CategoryPipe],
    
    providers: [BarcodeService]
  })
  export class BarcodeModule { } 