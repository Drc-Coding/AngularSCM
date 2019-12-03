import { Component } from '@angular/core';
import { Routes } from "@angular/router";
import { ModulerankingComponent } from './moduleranking.component';
import { FolderrankingComponent } from './folderranking/folderranking.component';

export const FoldderrankRouting: Routes = [{
    path: '',
        data: {
            breadcrumb: 'Ranking',
            Component: ModulerankingComponent,
            status: false
        },
        children: [
            {
                 path: 'folderrank',
                 component: FolderrankingComponent,
                 data: {
                     breadcrumb: 'Folder Ranking',
                     status: true
                 }
             }, 
        ]

}]