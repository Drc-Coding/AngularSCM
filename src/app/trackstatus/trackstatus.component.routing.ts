import { Component } from '@angular/core';
import { Routes } from "@angular/router";
import { TrackstatusComponent } from './trackstatus.component';
import { TrackingComponent } from './tracking/tracking.component';

export const TrackstatusRouting: Routes = [{
    path: '',
        data: {
            breadcrumb: 'Tracking',
            Component: TrackstatusComponent,
            status: false
        },
        children: [
            {
                 path: 'Tracking/:id',
                 component: TrackingComponent,
                 data: {
                     breadcrumb: 'StatusTrack',
                     status: true
                 }
             }, 
        ]

}]