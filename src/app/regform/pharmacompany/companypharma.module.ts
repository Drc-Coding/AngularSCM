import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';


import { companypharmaRoutes } from './companypharma.routing';
import { PhcompanyEditComponent } from './pharmacompanyEdit/phcompanyEdit.component';
import { PharmacompanyComponent } from './pharmacompanySave/pharmacompany.component';
import { PharmacompanyViewComponent } from './pharmacompanyView/pharmacompanyView.component';

    import { CategoryPipe } from   './pharmacompanyView/pharmacompanyView.pipe'; 



@NgModule({
  imports: [
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    CommonModule,
    RouterModule.forChild(companypharmaRoutes),
   SharedModule
  ],
  declarations: [  PharmacompanyViewComponent, PharmacompanyComponent, PhcompanyEditComponent, CategoryPipe]
})

export class CompanypharmaModule {}
