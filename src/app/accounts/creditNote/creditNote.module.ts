import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';






import {SharedModule} from '../../shared/shared.module';
import { creditNoteRoutes } from './creditNote.routing';


import { saveCreditComponent }  from './saveCreditNote/saveCredit.component';

import { editCreditNoteComponent } from  './editCreditNote/editCreditNote.component';

import { viewCreditNoteComponent } from   './viewCreditNote/viewCreditNote.component'

import { CategoryPipe } from   './viewCreditNote/viewCreditNote.pipe'

import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';


@NgModule({
  imports: [
    CommonModule,

    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,


    RouterModule.forChild(creditNoteRoutes),
    SharedModule
  ],
  declarations: [  saveCreditComponent,editCreditNoteComponent,viewCreditNoteComponent , CategoryPipe]
})

export class creditNoteModule {}
