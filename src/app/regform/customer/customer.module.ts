import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import { SharedModule } from '../../shared/shared.module';
import { customerRoutes } from './customer.routing';



import { custSaveComponent } from './custSave/custSave.component'  ;

import { custEditComponent } from './custEdit/custEdit.component'  ;


import { custViewComponent } from './custView/custView.component' ;


    import { CategoryPipe } from   './custView/custView.pipe'; 


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes),
    SharedModule
  ],
  declarations: [custSaveComponent  , custEditComponent,  custViewComponent,CategoryPipe  ]
})

export class customerModule { }
