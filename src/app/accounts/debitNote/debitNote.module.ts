import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { debitNoteRoutes } from './debitNote.routing';


import { saveDebitNoteComponent } from './saveDebitNote/saveDebitNote.component';



import { editDebitNoteComponent } from './editDebitNote/editDebitNote.component';



import { viewDebitNoteComponent } from './viewDebitNote/viewDebitNote.component';
    import { CategoryPipe } from   './viewDebitNote/viewDebitNote.pipe' ;

import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';





@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    
    
    RouterModule.forChild(debitNoteRoutes),
    SharedModule
  ],
  declarations: [ editDebitNoteComponent,viewDebitNoteComponent,saveDebitNoteComponent]
})

export class debitNoteModule {}
