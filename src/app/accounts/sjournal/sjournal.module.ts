import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';




import {SharedModule} from '../../shared/shared.module';
import { sjournalRoutes } from './sjournal.routing';



import { sjournalEditComponent } from './sjournalEdit/sjournalEdit.component';

import { sjournalSaveComponent } from './sjournalSave/sjournalSave.component';

import { sjournalViewComponent } from './sjournalView/sjournalView.component';

    import { CategoryPipe } from   './sjournalView/sjournalView.pipe'; 


import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';


  

@NgModule({
  imports: [
    CommonModule,

            
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    RouterModule.forChild(sjournalRoutes),
    SharedModule
  ],
  declarations: [   sjournalSaveComponent  , sjournalEditComponent ,  sjournalViewComponent]
})




export class sjournalModule {}
