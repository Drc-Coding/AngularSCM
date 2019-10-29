import {Routes} from '@angular/router';
import { GenerateqrcodeComponent } from './generateqrcode.component';
import { AddqrcodeComponent } from './addqrcode/addqrcode.component'; 

export const QrcodeRouting: Routes = [{

    path: '',
   
   
    children: [
        {
             path: 'AddQRcode',
             component: AddqrcodeComponent,
             data: {
                 breadcrumb: 'QR Code',
                
             }
         }, 
    ]

}]