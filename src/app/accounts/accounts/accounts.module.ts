import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



import { accountsSaveComponent } from './accountsSave/accountsSave.component' ;

import { accountsEditComponent } from './accountsEdit/accountsEdit.component'  ;


import { accountsViewComponent } from './accountsView/accountsView.component'  ;


import {SharedModule} from '../../shared/shared.module';
import { accountsRoutes } from './accounts.routing';



import { DxDataGridModule,
  DxSparklineModule,  
  DxTemplateModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,  DxDataGridModule,
    DxSparklineModule,
    DxTemplateModule ,
    RouterModule.forChild(accountsRoutes),
    SharedModule
  ],
  declarations: [  accountsSaveComponent,accountsEditComponent, accountsViewComponent]
})

export class accountsModule {}
