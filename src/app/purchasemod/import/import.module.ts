import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { importRoutes } from './import.routing';



import { importSaveComponent } from './importSave/importSave.component'  ;

import { importEditComponent } from './importEdit/importEdit.component'  ;

import { importViewComponent } from './importView/importView.component'  ;



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(importRoutes),
   SharedModule
  ],
  declarations: [importSaveComponent,  importEditComponent  ,importViewComponent  ]
})

export class importModule {}
