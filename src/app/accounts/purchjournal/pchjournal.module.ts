import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { pchjournalRoutes } from './pchjournal.routing';

import { purjrnlSaveComponent } from './purjrnlSave/purjrnlSave.component';


import { purjrnlEditComponent } from './purjrnlEdit/purjrnlEdit.component';


import { purjrnlViewComponent } from './purjrnlView/purjrnlView.component';


    import { CategoryPipe } from   './purjrnlView/purjrnlView.pipe'; 
import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';


@NgModule({
  imports: [
    CommonModule,

            
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    RouterModule.forChild(pchjournalRoutes),
    SharedModule
  ],
  declarations: [     purjrnlSaveComponent , purjrnlEditComponent ,  purjrnlViewComponent  ]
})

export class pchjournalModule {}
