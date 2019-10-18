import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { priscmgmtRoutes } from './priscmgmt.routing';


import { prescSaveComponent } from './prescSave/prescSave.component' ;


import { prescEditComponent } from './prescEdit/prescEdit.component'   ;



import { prescViewComponent } from './prescView/prescView.component'   ;




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(priscmgmtRoutes),
   SharedModule
  ],
  declarations: [prescSaveComponent  , prescEditComponent  ,  prescViewComponent]
})

export class priscmgmtModule {}
