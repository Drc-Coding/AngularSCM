import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { distslctRoutes } from './distslct.routing';




import { distslctSaveComponent } from './distslctSave/distslctSave.component'  ;

import { distslctEditComponent } from './distslctEdit/distslctEdit.component'  ;

import { distslctViewComponent } from './distslctView/distslctView.component'  ;


 import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryPipe } from './distslctView/distslctView.pipe'  ;

import { distslctStatusPipe } from './distslctStatus/distslctStatus.pipe'  ;



import { distslctStatusComponent } from './distslctStatus/distslctStatus.component'  ;

import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';


@NgModule({
  imports: [
    CommonModule,   
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,
    NgxPaginationModule   ,

    RouterModule.forChild(distslctRoutes),
   SharedModule
  ],
  declarations: [ distslctSaveComponent , distslctEditComponent  ,distslctStatusComponent                             ,      distslctViewComponent   , CategoryPipe ]
})

export class   distslctModule {}
