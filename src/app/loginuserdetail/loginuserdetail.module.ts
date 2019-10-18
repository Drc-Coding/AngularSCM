import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../shared/shared.module';



import { LoginuserdetailComponent } from './loginuserdetail.component';
import { LoginuserdetailRoutes } from './loginuserdetail.routing';
import { UserdetailComponent } from './userdetail/userdetail.component';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(LoginuserdetailRoutes),
      SharedModule
  ],
  declarations: [LoginuserdetailComponent, UserdetailComponent],
  
})

export class LoginuserdetailModule {}
