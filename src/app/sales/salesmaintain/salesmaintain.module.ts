import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { salesmaintainRoutes } from './salesmaintain.routing';


import { slsMaintViewComponent } from './slsMaintView/slsMaintView.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(salesmaintainRoutes)  ,
    SharedModule
  ],
  declarations: [slsMaintViewComponent]
})

export class salesmaintainModule {}
