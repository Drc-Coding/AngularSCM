import { DemosampleComponent } from './demosample/demosample.component';
import { Routes } from '@angular/router';
export const DemoRoutes: Routes = [
    {
        path: '',
       
        children: [
            {
                path: 'demosample',
                component: DemosampleComponent,
                
                }
       
        
        
        ]}]