import { AddtaxsettingsComponent } from './addtaxsettings/addtaxsettings.component';
import { Routes } from '@angular/router';
import { AddtaxtypeComponent } from './addtaxtype/addtaxtype.component';
export const TaxsettingsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'AddNewTax',
                component: AddtaxsettingsComponent,
                data: {
                    breadcrumb: 'Add Tax',
                }
            }, {
                path: 'TaxSettings',
                component: AddtaxtypeComponent,
                data: {
                    breadcrumb: 'Tax Type',
                }
            }
]
    }]