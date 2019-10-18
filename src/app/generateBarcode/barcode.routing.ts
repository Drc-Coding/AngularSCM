import { Routes } from "@angular/router";
import { AddBarcodeComponent } from "./addBarcode/addbarcode.component";
import { ViewListBarcode } from "./viewBarcode/barcodelist.component";

export const BarcodeRoutes: Routes = [
       
    
    {
        path: '',
       
        children: [
            {               
                path: 'AddBarcode',
                component: AddBarcodeComponent,
                data: {
                    breadcrumb: 'Add Barcode'                    
                }
               
                },
               {
                 path: 'ViewBarcode',
                 component: ViewListBarcode,
                 data: {
                    breadcrumb: 'View Barcode'                    
                }

             }
        
        
        ]}]