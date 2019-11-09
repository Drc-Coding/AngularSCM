import { Component } from '@angular/core';
import { Routes } from "@angular/router";
import { DepartmentComponent } from './department.component';
import { SavedeptComponent } from './savedept/savedept.component';
import {ViewdeptComponent } from  './viewdept/viewdept.component';


export const DepartmentRouting: Routes = [{
    
    path: '',
        data: {
            breadcrumb: 'Department',
            Component: DepartmentComponent,
            status: false
        },
        children: [
            {
                 path: 'savedepartment',
                 component: SavedeptComponent,
                 data: {
                     breadcrumb: 'SaveDepartment',
                     status: true
                 }
             }, 
             {
                path: 'viewdepartment',
                component: ViewdeptComponent,
                data: {
                    breadcrumb: 'ViewDepartment',
                    status: true
                }
            }, 
        ]

}]