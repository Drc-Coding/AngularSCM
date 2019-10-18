import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { SavepickComponent } from './savepick/savepick.component';
import { ViewpickingComponent } from './viewpicking/viewpicking.component';
import {PickedcheckingComponent} from './pickedchecking/pickedchecking.component';
import { PickapprovalComponent } from './pickapproval/pickapproval.component';

export const SalesPickingRouting: Routes = [{
    path: '',
    children:[
        {
        path:'AddPicking',
        component: SavepickComponent,
        data:{
            breadcrumb:'Save Picking'
        }
        }]
    },
    {
        path:'',
        children:[
            {
                path:'ViewPicking',
                component:ViewpickingComponent,
                data:{
                    breadcrumb:'View Picking'
                }
    
            }
        ]
    },
     
//PickedChecking
    {
        path:'',
        children:[
            {
                path:'Sorting',
                component:PickedcheckingComponent,
                data:{
                    breadcrumb:'Sorting'
                }
    
            }
        ]
    },

    {
        path:'',
        children:[
            {
                path:'PickingApproval',
                component:PickapprovalComponent,
                data:{
                    breadcrumb:'Picking Approval'
                }
    
            }
        ]
    }
     
];