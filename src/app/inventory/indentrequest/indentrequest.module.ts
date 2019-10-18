import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';



import { indentreqRoutes } from './indentrequest.routing';


import { indentreqSaveComponent } from './indentreqSave/indentreqSave.component'; 

import { indentreqEditComponent } from './indentreqEdit/indentreqEdit.component';

import { indentreqViewComponent } from './indentreqView/indentreqView.component';

    import { CategoryPipe } from   './indentreqView/indentreqView.pipe'; 

import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';



@NgModule({
  imports: [
    CommonModule,

    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    
    RouterModule.forChild(indentreqRoutes),
   SharedModule
  ],
  declarations: [ indentreqSaveComponent  , indentreqEditComponent   ,  indentreqViewComponent, CategoryPipe ],
  

  bootstrap: [indentreqSaveComponent]
})

export class indentreqModule {}
