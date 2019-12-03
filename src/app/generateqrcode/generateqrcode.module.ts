import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { GenerateqrcodeComponent } from './generateqrcode.component';
import { AddqrcodeComponent } from './addqrcode/addqrcode.component';
import { QrcodeRouting } from './generateqrcode.routing';
import { QRCodeModule } from 'angularx-qrcode';
     
// import { QRcodeService } from './generateqrcode.service';QRcodeService

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(QrcodeRouting),
      SharedModule,
      QRCodeModule 
    ],
    declarations: [GenerateqrcodeComponent,AddqrcodeComponent],
    providers:[],

     
  })
  
export class QrcodeModule {

}