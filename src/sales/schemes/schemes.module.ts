import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { schemesSaveComponent } from './schemesSave/schemesSave.component';

import { schemesEditComponent } from './schemesEdit/schemesEdit.component';

import { schemesViewComponent } from './schemesView/schemesView.component';



import {SharedModule} from '../../shared/shared.module';
import { schemesRoutes } from './schemes.routing';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(schemesRoutes),
   SharedModule
  ],
  declarations: [schemesSaveComponent  ,    schemesEditComponent  ,schemesViewComponent  ]
})

export class schemesModule {}
