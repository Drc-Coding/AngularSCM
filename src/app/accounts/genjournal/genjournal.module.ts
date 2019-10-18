import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { genjournalEditComponent } from './genjournalEdit/genjournalEdit.component';
import { genjournalViewComponent } from './genjournalView/genjournalView.component';
import { genjournalSaveComponent } from './genjournalSave/genjournalSave.component';

import {SharedModule} from '../../shared/shared.module';
import { genjournalRoutes } from './genjournal.routing';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(genjournalRoutes),
   SharedModule
  ],
  declarations: [genjournalEditComponent,genjournalViewComponent , genjournalSaveComponent]
})

export class genjournalModule {}
