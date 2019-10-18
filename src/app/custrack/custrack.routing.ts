import { Routes } from '@angular/router';

import { CustrackingComponent } from './custracking/custracking.component';
import { LivetrackComponent } from './livetrack/livetrack.component';

export const CustrackRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'CustomerTracking',
                component: CustrackingComponent,
                data: {
                    breadcrumb: 'Customer Tracking',
                }
            },

        

            {
                path: 'LiveTracking/:id',
                component: LivetrackComponent,
                data: {
                    breadcrumb: 'Live Tracking',
                }
            }
]
    }]