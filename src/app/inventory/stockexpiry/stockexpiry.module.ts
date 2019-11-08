import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { stockexpiryRoutes } from './stockexpiry.routing';
import { stkexpSaveComponent } from './stkexpSave/stkexpSave.component';
import { stkexpEditComponent } from './stkexpEdit/stkexpEdit.component';
import { stkexpViewComponent } from './stkexpView/stkexpView.component';
import { CategoryPipe } from './stkexpView/stkexpView.pipe';
import { DxDataGridModule, DxSparklineModule, DxTemplateModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,

    
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,



    RouterModule.forChild(stockexpiryRoutes),
   SharedModule
  ],
  declarations: [   stkexpSaveComponent  , stkexpEditComponent,  CategoryPipe  ,stkexpViewComponent]
})

export class stockexpiryModule {}
